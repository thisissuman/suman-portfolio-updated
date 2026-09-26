import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('responsive layout, themes, reduced motion and accessibility', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto('/');
  for (const width of [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  for (const theme of ['dark', 'light']) {
    if ((await page.locator('html').getAttribute('data-theme')) !== theme) {
      await page.getByRole('button', { name: `Switch to ${theme} theme`, exact: true }).click();
    }
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
    await expect(
      page.getByRole('button', {
        name: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        exact: true,
      }),
    ).toBeVisible();
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  }
  await page.getByRole('button', { name: 'Switch to dark theme', exact: true }).click();
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  );
  expect(
    await page.locator('.hero-copy').evaluate((element) => getComputedStyle(element).animationName),
  ).toBe('none');
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.sky-control')).toBeVisible();
  expect(errors).toEqual([]);
});
test('navigation, keyboard, assets, links and safe unconfigured contact form', async ({
  page,
  request,
}) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  for (const [name, id] of [
    ['Work', 'projects'],
    ['About', 'about'],
    ['Experience', 'experience'],
    ['Skills', 'skills'],
    ['Contact', 'contact'],
  ]) {
    await page.getByRole('navigation').getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(
      page.getByRole('navigation').getByRole('link', { name, exact: true }),
    ).toHaveAttribute('aria-current', 'location');
  }
  await page.getByRole('link', { name: 'Let’s talk' }).click();
  await expect(page).toHaveURL(/#contact$/);
  await page.getByLabel('Your email').fill('test@example.com');
  await page.getByLabel('What’s on your mind?').fill('Browser test only. No email should be sent.');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('status')).toContainText('temporarily unavailable');
  await expect(page.getByLabel('Your email')).toHaveValue('test@example.com');
  await expect(page.getByLabel('What’s on your mind?')).toHaveValue(
    'Browser test only. No email should be sent.',
  );
  expect((await request.get('/Suman_Resume.pdf')).status()).toBe(200);
  for (const asset of [
    '/opengraph-image',
    '/twitter-image',
    '/icon',
    '/apple-icon',
    '/robots.txt',
    '/sitemap.xml',
  ])
    expect((await request.get(asset)).status()).toBe(200);
  const external = page.locator('a[target="_blank"]');
  for (const link of await external.all()) {
    expect(await link.getAttribute('href')).toMatch(/^https:\/\//);
    expect(await link.getAttribute('rel')).toContain('noopener');
  }
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
});
test('resume downloads and external links open their intended destinations', async ({ page }) => {
  await page.goto('/');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Resume (PDF download)' }).click();
  expect((await downloadEvent).suggestedFilename()).toBe('Suman_Resume.pdf');
  for (const name of [
    'GitHub (opens in a new tab)',
    'LinkedIn (opens in a new tab)',
    'Live demo: Kira Movie (opens in a new tab)',
    'Live demo: Vivaha Studio (opens in a new tab)',
    'Source code: Kira Movie (opens in a new tab)',
    'Source code: Mangalya (opens in a new tab)',
    'Source code: Vivaha Studio (opens in a new tab)',
  ]) {
    const link = page.getByRole('link', { name, exact: true }).first();
    const href = await link.getAttribute('href');
    const popupEvent = page.waitForEvent('popup');
    await link.click();
    const popup = await popupEvent;
    await popup.waitForURL((url) => url.href.replace(/\/$/, '') === href?.replace(/\/$/, ''), {
      waitUntil: 'commit',
    });
    await popup.close();
  }
  await expect(page.getByText('No public demo')).toBeVisible();
});
test('portfolio content and anchors remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await page.getByRole('navigation').getByRole('link', { name: 'Work', exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.getByRole('heading', { name: 'Kira Movie', exact: true })).toBeVisible();
  await context.close();
});
