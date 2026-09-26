# Modernization audit and execution plan

## Baseline (2026-09-25)

The supplied directory is a source export without `.git`, AGENTS.md, installed dependencies, lint configuration, tests, or deployment configuration. All source files and the npm v3 lockfile were reviewed. Public assets total 8.9 MB, primarily PNG logos, three project screenshots, a portrait and a resume. Original source and all assets are preserved in `/private/tmp/suman-portfolio-before-modernization.tar.gz` during this session; keep a durable backup before discarding this export.

## Findings

| Severity | Finding                                                                                                                        | Resolution                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| High     | Contact action validates length only, exposes exceptions, initializes provider at module scope; client ignores returned errors | Typed validation and action result, lazy provider, safe error messages, form status, honeypot and bounded rate limit |
| High     | Hidden native cursor, mouse-only nested project controls, unlabeled fields/social buttons, paragraphs as headings              | Native cursor, independent anchors, labels, semantic headings, focus rings                                           |
| High     | Continuous WebGL, invalid `$fff` and `dethWrite`, undeclared maath, `any`/ts-ignore                                            | Remove decorative 3D entirely                                                                                        |
| High     | Old framework/security surface                                                                                                 | Stable patched Next 16 and compatible React 19; npm audit after install                                              |
| Medium   | All main content client-rendered for animation/context                                                                         | Static server sections; small interactive leaves                                                                     |
| Medium   | Theme flash, unsafe localStorage assumptions, no system selection                                                              | next-themes prepaint initialization and accessible selector                                                          |
| Medium   | No sharing images, canonical, robots, sitemap or structured data                                                               | Metadata routes and verified-content JSON-LD; canonical requires configured production URL                           |
| Medium   | Contradictory experience totals, stale present/current claims, project stack conflicts                                         | Remove totals, preserve historical facts, explicit content review record                                             |
| Medium   | Invalid v3 utilities w-95/w-15/z-9; hover shifts and poor light contrast                                                       | CSS tokens, responsive layout, v4 stylesheet                                                                         |
| Low      | Generic README, missing env example, dead skills array, old copyright year                                                     | Project documentation and typed content                                                                              |

## Dependency decisions

| Package                                   | Baseline             | Target/action                         | Reason                                                              |
| ----------------------------------------- | -------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| next / @next/eslint-plugin-next           | 14.0.4               | matched stable 16.3.6                 | App Router security and supported toolchain                         |
| react / react-dom                         | 18.2                 | matched stable 19.3.0                 | Next compatibility and useActionState                               |
| typescript                                | 5.3.3                | 6.0.3; supported by typescript-eslint | strict modern tooling                                               |
| tailwindcss / postcss                     | 3.4.1 / 8.4.33       | v4 + @tailwindcss/postcss             | CSS-first configuration; modern browsers                            |
| eslint                                    | 8.56                 | stable 10.11                          | flat config with direct official Next, Hooks and TypeScript plugins |
| resend                                    | 2.1                  | current stable                        | replyTo API; text emails                                            |
| @types/node/react/react-dom               | runtime dependencies | current compatible devDependencies    | build-time only                                                     |
| @react-three/fiber, @react-three/drei     | 8 / 9                | remove                                | decorative GPU and JS cost                                          |
| math-random                               | 2                    | remove                                | unused; does not provide imported maath                             |
| framer-motion                             | 10                   | remove; no Motion replacement needed  | CSS transitions suffice                                             |
| react-parallax-tilt                       | 1                    | remove                                | no functional benefit                                               |
| react-vertical-timeline-component + types | 3                    | remove                                | semantic ordered list                                               |
| react-intersection-observer               | 9                    | remove                                | native observer in navigation only                                  |
| react-hot-toast                           | 2                    | remove                                | inline live status is clearer                                       |
| react-icons / clsx                        | 5 / 2                | remove                                | text links and native controls suffice                              |
| react-email / @react-email/components     | 1 / 0                | remove                                | text email avoids template/render dependency tree                   |
| autoprefixer                              | 10                   | remove                                | handled by Tailwind v4 pipeline                                     |
| next-themes                               | absent               | add                                   | persistence, system change handling, prepaint theme                 |
| @fontsource-variable/manrope              | absent               | add                                   | reproducible self-hosted font with next/font/local                  |

## Architecture and design

Server-first App Router with typed `content/portfolio.ts`, `components/sections`, isolated header/theme/contact leaves, `lib` for pure validation/rate limiting, and a Server Action. No client animation library, WebGL, global active-section context, tracking, or experimental React features. Graphite and white surfaces, portrait-derived yellow accent, Manrope typography, asymmetrical hero, full project screenshots, semantic career history. Desktop and compact navigation remain visible without a modal menu.

## Execution

1. Preserve source; verify migration docs and package peers.
2. Upgrade configurations and dependency foundation. Old animation/3D components are coupled to React 18; replace their boundaries in the same migration rather than force incompatible peers.
3. Centralize factual content, implement server sections and isolated interactions.
4. Implement contact validation, abuse controls, metadata and social assets.
5. Run clean install, unit tests, typecheck, lint, build, security audit, production browser checks and responsive measurements.
6. Document measured results, deployment requirements and unresolved content facts.

## Risks and decisions

- Tailwind 4 targets Safari 16.4+, Chrome 111+, Firefox 128+. No legacy-browser requirement was supplied.
- Never infer ongoing employment from an old `present` value; flag it and avoid a current-status badge.
- Do not fabricate a production domain. `SITE_URL` controls canonical indexing; unconfigured previews must not be indexed.
- Local process rate limiting is defense in depth, not distributed abuse prevention. Enforce limits at the hosting edge for a public deployment.
- No actual emails will be sent during verification. Live credentials, verified sender and delivery remain deployment checks.

## Official references

- https://nextjs.org/docs/app/guides/upgrading/version-16
- https://nextjs.org/docs/app/api-reference/config/eslint
- https://tailwindcss.com/docs/upgrade-guide
- https://react.dev/reference/react/useActionState
- https://resend.com/docs/send-with-nextjs

## Final tooling adjustment

ESLint 9 was found to be deprecated during installation. eslint-config-next accepts ESLint 10 at its top level but its nested React/import/a11y plugins do not. Verified this via their peer ranges and an actual lint failure. Replaced the umbrella config with official @next/eslint-plugin-next recommended/core-web-vitals, typescript-eslint and React Hooks rules, all compatible with ESLint 10. Browser axe checks cover both themes. Nonbreaking audit fixes and a clean lockfile install removed all reported advisories.

Prettier 3 is the sole formatter, added for consistent readable TSX/CSS/configuration. `npm run format:check` verifies formatting. The original optional React Email peer tree persisted through normal updates; regenerating the lockfile from the reduced manifest removed it completely, including the deprecated glob transitive package.
