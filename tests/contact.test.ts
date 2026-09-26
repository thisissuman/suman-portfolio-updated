import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateContact } from '../lib/contact';
import { submitContact } from '../lib/contact-service';
import { createRateLimiter } from '../lib/rate-limit';
import { getSiteUrl, serializeJsonLd } from '../lib/site';
const form = (
  email: unknown = ' hello@example.com ',
  message: unknown = ' A useful message about a project. ',
) => {
  const data = new FormData();
  data.set('senderEmail', email as string);
  data.set('message', message as string);
  return data;
};
test('normalizes valid input and preserves email local-part', () => {
  assert.deepEqual(validateContact(form()), {
    ok: true,
    fields: { senderEmail: 'hello@example.com', message: 'A useful message about a project.' },
  });
});
test('rejects malformed addresses, CRLF and length violations', () => {
  for (const email of [
    'invalid',
    'a@b',
    'a@b..com',
    'a@b.com\r\nBcc:x@y.com',
    'x'.repeat(255) + '@example.com',
  ])
    assert.equal(validateContact(form(email)).ok, false);
  for (const message of ['   ', 'short', 'x'.repeat(5001)])
    assert.equal(validateContact(form('a@b.com', message)).ok, false);
  const data = form();
  data.set('senderEmail', new Blob(['a@b.com']));
  assert.equal(validateContact(data).ok, false);
});
test('honeypot and invalid input never invoke delivery', async () => {
  let calls = 0;
  const deps = {
    configured: true,
    deliver: async () => {
      calls++;
      return true;
    },
  };
  const bot = form();
  bot.set('website', 'spam');
  assert.equal((await submitContact(bot, deps)).status, 'error');
  assert.equal((await submitContact(form('bad'), deps)).status, 'error');
  assert.equal(calls, 0);
});
test('missing configuration and rate limits fail safely without delivery', async () => {
  let calls = 0;
  const deliver = async () => {
    calls++;
    return true;
  };
  assert.equal((await submitContact(form(), { configured: false, deliver })).status, 'error');
  assert.match(
    (await submitContact(form(), { configured: true, deliver, allowSender: () => false })).message,
    /Too many/,
  );
  assert.equal(calls, 0);
});
test('delivery success, provider rejection and exceptions produce distinct safe results', async () => {
  const deps = { configured: true, allowSender: () => true, allowTotal: () => true };
  assert.equal(
    (await submitContact(form(), { ...deps, deliver: async () => true })).status,
    'success',
  );
  const failed = await submitContact(form(), { ...deps, deliver: async () => false });
  assert.equal(failed.status, 'error');
  assert.equal(failed.values?.senderEmail, 'hello@example.com');
  const thrown = await submitContact(form(), {
    ...deps,
    deliver: async () => {
      throw new Error('secret API details');
    },
  });
  assert.equal(thrown.status, 'error');
  assert.doesNotMatch(thrown.message, /secret/);
});
test('rate limiter blocks at limit, expires and bounds memory', () => {
  const allow = createRateLimiter(2, 100, 1);
  assert.equal(allow('one', 0), true);
  assert.equal(allow('one', 1), true);
  assert.equal(allow('one', 2), false);
  assert.equal(allow('two', 3), false);
  assert.equal(allow('two', 100), true);
});
test('metadata configuration rejects unsafe origins and JSON-LD escapes HTML', () => {
  assert.equal(getSiteUrl('https://example.com')?.href, 'https://example.com/');
  for (const value of [
    'http://example.com',
    'https://u:p@example.com',
    'https://example.com/path',
    'https://example.com/?x=1',
  ])
    assert.throws(() => getSiteUrl(value));
  assert.equal(serializeJsonLd({ name: '</script>' }).includes('<'), false);
});
