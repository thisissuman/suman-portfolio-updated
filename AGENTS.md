# Project operating instructions

Read README.md, docs/MODERNIZATION.md, docs/CONTENT_REVIEW.md and DESIGN.md before changing the portfolio.

- Keep portfolio facts in content/portfolio.ts. Do not infer current employment, availability or years of experience from stale text.
- Keep sections server-rendered. Client code belongs in small interaction leaves: navigation, theme, contact form and the user-requested star background.
- Use native anchors, labeled inputs, visible keyboard focus and reduced-motion-safe CSS. No custom cursor or decorative WebGL. The user-requested star sphere uses Canvas 2D, pauses in hidden tabs and stays static for reduced motion. The floating lower-right control is the theme switch.
- Use Node 22.14+ (or Node 24 LTS), npm ci, npm run typecheck, npm run lint, npm run format:check, npm test and npm run build. Browser smoke checks run with npm run test:e2e against npm run start. When .env.local contains live email settings, start the test server with RESEND_API_KEY= CONTACT_FROM= CONTACT_TO= so browser tests cannot send real emails; restart normally afterward.
- Runtime secrets belong in .env.local or deployment environment, never source. Public contact deployment needs an edge rate limit; in-process throttling cannot protect across serverless instances.
- Update this file or linked canonical docs when a verified workflow changes. Record verification limits honestly.
