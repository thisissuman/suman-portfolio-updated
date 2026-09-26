# Suman Maharana · Portfolio

A personal frontend/software engineering portfolio with selected projects, career history, skills, a resume and a private email contact form. Built around static rendering, semantic HTML, restrained CSS motion and an accessible dark/light theme toggle.

## Stack

Next.js 16.3.6 App Router, React 19.3, TypeScript 6.0, Tailwind CSS 4.3, next-themes and Resend. Manrope is bundled locally through next/font. ESLint 10 uses the official Next.js plugin, TypeScript rules and React Hooks rules directly. Browser coverage uses Playwright and axe; unit tests use Node's built-in test runner.

TypeScript 7 is deliberately not installed: the selected TypeScript ESLint parser supports `<6.1`. The umbrella eslint-config-next package pulls React/import/a11y plugins that do not support ESLint 10; the direct plugin configuration retains official Next.js core-web-vitals rules without forcing unsupported peers.

## Getting started

Use Node 22.14+ (22 LTS line) or Node 24 LTS and npm. The `.nvmrc` selects Node 22.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

`npm ci` installs the exact locked dependencies. Open http://localhost:3000. No email credentials are needed to develop or build. An unconfigured form preserves the visitor's message and points them to the public email link.

## Commands

| Command                           | Purpose                                                            |
| --------------------------------- | ------------------------------------------------------------------ |
| `npm run dev`                     | Start local development                                            |
| `npm run typecheck`               | Generate Next route types and check TypeScript                     |
| `npm run lint`                    | Run ESLint with zero warnings allowed                              |
| `npm test`                        | Test validation, throttling, delivery outcomes and metadata safety |
| `npm run build`                   | Build the production site                                          |
| `npm run start`                   | Serve the production build                                         |
| `npx playwright install chromium` | Install the browser used by smoke tests                            |
| `npm run test:e2e`                | Test the running production server at 127.0.0.1:3000               |
| `npm run format:check`            | Verify consistent formatting                                       |
| `npm run format`                  | Apply formatting                                                   |
| `npm audit`                       | Check the locked dependency tree for known advisories              |

Run browser tests against a build **without email credentials**. The suite verifies the safe unconfigured state and must not send real email. Start the production server in another terminal first. Browser tests cover nine widths (320–1920px), dark/light theme persistence, reduced motion, keyboard navigation, form failure recovery, images, metadata routes and axe checks in both themes.

## Environment

| Variable         | Use                                                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`       | Actual public HTTPS origin, e.g. your owned domain. No path, query or credentials. Set at build time. Without it the site uses noindex and robots disallow; no canonical is fabricated. |
| `RESEND_API_KEY` | Server-only Resend API key for sending email                                                                                                                                            |
| `CONTACT_FROM`   | Verified sender mailbox on a domain configured in Resend; optional display name accepted                                                                                                |
| `CONTACT_TO`     | Destination mailbox for portfolio messages                                                                                                                                              |

Never commit `.env.local` or credentials. None of these variables needs a `NEXT_PUBLIC_` prefix. Set all three mail variables to enable delivery. The visitor's validated address is used only as `replyTo`; neither sender nor destination is visitor-controlled. Plain-text delivery avoids HTML injection and unnecessary React Email dependencies. Test delivery manually with a verified sender in your deployment; automated tests mock delivery and never send messages.

## Architecture

```text
app/                   Page, layout, CSS, error states and metadata routes
components/sections/   Server-rendered hero, projects, about, career, skills, contact
components/            Navigation, theme, form leaves and server footer
content/portfolio.ts   Typed personal content, links, skills, projects and experience
lib/                   Validation, contact service, bounded throttling, metadata helpers
actions/sendEmail.ts   Server Action and Resend adapter
tests/                 Unit and production-browser smoke tests
public/                Original portrait, project artwork, resume and preserved assets
docs/                  Audit, content review and measured verification
```

Navigation, theme, form handling and the requested star field use isolated client components. The rotating star sphere uses Canvas 2D with a static reduced-motion view and automatic pausing in hidden tabs. There is no custom cursor, WebGL runtime, tracking or scroll listener. Native IntersectionObserver updates navigation. CSS motion is optional and content never depends on animation. Tailwind 4 supplies the CSS pipeline and utilities; shared CSS variables own the visual system. Modern browser floor: Safari 16.4+, Chrome 111+, Firefox 128+.

## Editing content

Update `content/portfolio.ts`. Keep professional claims grounded in supplied facts. See [content review](docs/CONTENT_REVIEW.md) before changing dates, current employment, availability, project stacks or the resume. Set a project's `demoAvailable` to false when its deployment is unavailable; the card will retain source access without sending visitors to a broken demo. Do not add skill ratings or performance/impact metrics without evidence.

All public assets are preserved for owner review. Only the portrait and selected project images are loaded by the page; unused public files do not enter the browser bundle. Replace outdated promotional project covers with real product screenshots when available. Images use next/image with explicit responsive sizes, and only the hero portrait is eagerly loaded with high fetch priority.

## Design decisions

See [DESIGN.md](DESIGN.md). Navy and soft white surfaces with a yellow accent, locally bundled type, an oversized personal wordmark, a circular LinkedIn portrait, alternating project features, official company logos and open toolkit groups. A single-icon Light/Dark theme toggle floats at the lower right and the star field works across mobile and desktop. Dark theme is the default; saved preference is applied before paint. The native cursor and visible focus states remain intact. No external font request is needed during build or browsing.

## Deployment

Deploy as a Next.js Node/serverless application (for example Vercel), not a static export: the contact Server Action needs a server. Install build-time dependencies, configure `SITE_URL` before building and set mail variables in the server environment. Run `npm run build`, then `npm run start` for a Node deployment. Set the platform's Node runtime to match the supported engine. Preview deployments should leave `SITE_URL` unset.

Contact protection includes normalization, length/email validation, a honeypot, three attempts per sender per 15 minutes and 20 total attempts per hour per process. Sender keys are hashed and memory is bounded. **These limits reset on restart and are not shared across serverless instances.** Before exposing the form publicly, add an edge/WAF rate-limit rule for POST requests to the site; use provider abuse controls or a shared limiter if traffic warrants it. Do not trust arbitrary forwarded-IP headers. Next's same-origin Server Action protection remains enabled.

Security headers disable framing, MIME sniffing and unnecessary device permissions. Structured data escapes `<`. The site adds no analytics or third-party scripts. Messages are processed by the configured Resend account.

## Verification and status

See [verification](docs/VERIFICATION.md) for actual results and limitations, and [modernization audit](docs/MODERNIZATION.md) for dependency and architecture decisions. The supplied workspace originally had no `.git` directory. Git metadata has since been restored; no commits or PR were created by this task. A session backup of the original source is at `/private/tmp/suman-portfolio-before-modernization.tar.gz`; move it to durable storage if needed.

The bundled Manrope font retains its license in `public/licenses/manrope.txt`.

No software license was supplied. This modernization does not grant a new license to the portfolio, photographs or other assets.
