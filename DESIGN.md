---
name: Suman Maharana Portfolio
description: A personal frontend studio with open project spreads, an orbital portrait and a restrained star sky.
colors:
  background: '#e7ebe6'
  surface: '#f8f7f2'
  surface-alt: '#d8e2dc'
  foreground: '#182129'
  muted: '#4f5e67'
  border: '#bdcac3'
  accent: '#d9ad3d'
  accent-ink: '#1c1a11'
  focus: '#8a641b'
  error: '#a42929'
  success: '#226339'
  wash-gold: '#eee0b7'
  wash-blue: '#d5e2e6'
  wash-sage: '#d9e5d8'
  wash-lilac: '#e3ddeb'
  wash-coral: '#efd8c9'
  career-current: '#d97732'
  career-past: '#c9a63d'
  project-plate: '#5d86b3'
  dark-background: '#0d131b'
  dark-surface: '#151e28'
  dark-surface-alt: '#1c2733'
  dark-foreground: '#f4f2ea'
  dark-muted: '#aeb7c0'
  dark-border: '#2c3948'
  dark-accent: '#f2cc60'
  dark-focus: '#f2cc60'
  dark-error: '#ffaaaa'
  dark-success: '#9fdbb0'
  star: '#647a8d'
  dark-star: '#b7cadf'
  tool-blue: '#315e8e'
  tool-green: '#32664e'
  tool-purple: '#795699'
  dark-tool-blue: '#9cbfed'
  dark-tool-green: '#9bcbb2'
  dark-tool-purple: '#c3abdf'
  dark-career-current: '#f0a35f'
  dark-career-past: '#ead37a'
  dark-project-plate: '#315e8e'
typography:
  display:
    fontFamily: 'Manrope, Arial, sans-serif'
    fontSize: 'clamp(90px, 11vw, 152px)'
    fontWeight: 750
    lineHeight: 0.95
    letterSpacing: '-.04em'
  headline:
    fontFamily: 'Manrope, Arial, sans-serif'
    fontSize: 'clamp(31px, 4vw, 48px)'
    fontWeight: 650
    lineHeight: 1.25
    letterSpacing: '-.035em'
  title:
    fontFamily: 'Manrope, Arial, sans-serif'
    fontSize: '22px'
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: '-.025em'
  body:
    fontFamily: 'Manrope, Arial, sans-serif'
    fontSize: '15px'
    lineHeight: 1.7
  label:
    fontFamily: 'Manrope, Arial, sans-serif'
    fontSize: '12px'
    fontWeight: 650
rounded:
  image: '16px'
  control: '12px'
  tag: '8px'
spacing:
  section: 'clamp(4.5rem, 8vw, 7rem)'
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.accent-ink}'
    rounded: '{rounded.control}'
    padding: '11px 23px'
  button-secondary:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
    rounded: '{rounded.control}'
    padding: '11px 23px'
  input:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.control}'
    padding: '13px 15px'
  project-spread:
    backgroundColor: 'transparent'
    textColor: '{colors.foreground}'
  theme-switch:
    backgroundColor: '{colors.foreground}'
    textColor: '{colors.dark-accent}'
    rounded: '16px'
    size: '52px'
  tag:
    textColor: '{colors.muted}'
    rounded: '{rounded.tag}'
    padding: '4px 10px'
---

# Design System: Suman Maharana Portfolio

## Overview

**Creative North Star: "A personal frontend studio under an open sky"**

The portfolio feels like a personal frontend studio: a large name, a real portrait and composed project showcases establish authorship before decoration. Navy is the default view, with a parchment-and-sage alternate theme retaining the same hierarchy. Yellow is reserved for actions, focus and small identity details, while muted color washes separate related content inside projects and toolkit groups.

The orbit around the portrait and the projected star sphere share a celestial motif. The sky is a user-requested continuous effect; it never carries information and becomes static for reduced motion. Project imagery, employer identities and readable descriptions remain the evidence. The implemented source is `app/globals.css` and the section components; this document records the final cascade rather than superseded card styles.

**Key Characteristics:**

- Oversized personal identity and circular portrait
- Alternating open project spreads
- Ruled career and toolkit sections
- Native controls and visible navigation
- Theme-aware Canvas 2D stars

## Colors

### Primary

Yellow marks primary actions, the name dot, orbit marker and focused interaction. Accent ink keeps text readable on filled buttons. The focus token adapts the accent for contrast in each theme.

### Secondary

Muted gold, blue, sage and lilac distinguish project details and toolkit categories. Stronger blue, green and purple remain on icons, short rules and chip dots so wayfinding still works within each wash.

### Neutral

Parchment-sage and navy page backgrounds support readable surfaces, foreground text, muted metadata and thin dividers. Theme-specific star colors remain subdued behind the content. Employer logos retain their source colors on a white backing. Error and success colors accompany written form feedback.

**The Accent Has a Job Rule.** Use accent for action, focus or identity; category color belongs to toolkit wayfinding.

## Typography

Manrope is bundled locally through `next/font`, with Arial and sans-serif fallbacks. A heavy, tightly tracked first name anchors the hero. Its smaller two-line statement, medium-heavy section titles and open body copy create the hierarchy. The frontmatter records the desktop display and recurring text roles; project titles scale separately from body copy.

Display type has explicit responsive overrides: compact desktop uses 100px, and mobile uses a fluid 78–110px range. The hero statement scales from 23–35px on desktop and uses 26px on mobile. Descriptions remain at readable body scale; career descriptions are limited to 65 characters in width and project descriptions to 48. Phosphor icons replace the earlier decorative code punctuation.

## Layout

The centered content container is capped at 1120px with 40px side margins. Fluid section spacing provides the page rhythm. The desktop hero pairs flexible text with a 380px portrait column. The full-width stack of project showcases alternates image and description columns inside one shared frame, with a 72px vertical gap; inset image stages crop covers to a 4:3 aspect ratio. About and contact remain open two-column compositions. Career dates sit beside ruled role entries, and toolkit categories form two columns.

At 1023px and below, the portrait column becomes 300px and gaps tighten. At 767px and below, margins become 20px; the header keeps navigation visible on a second row; the hero, projects, career, toolkit, about and contact stack. Each project image precedes its description on mobile regardless of desktop alternation. The portrait block becomes 264px. Below 360px, margins become 16px and action spacing tightens. The fixed theme control remains reachable at the lower right, with extra footer clearance.

## Elevation & Depth

Depth comes primarily from typography, open space, project imagery and the quiet star sphere. Each project uses one shared rounded frame so its cover and description read as a single composition. The inset cover sits above a blue backing plate that separates it from the text and becomes visible during hover tilt. The portrait and project showcases carry a broad, low-contrast shadow. The primary action and floating theme control use a tighter control shadow. About and Contact remain integrated with the page rather than enclosed panels; toolkit groups use color washes that fade into the page. The current role uses an orange wash and earlier roles use pale yellow, while all share the same ruled timeline structure. The sticky header uses a restrained translucent blur so content remains legible while scrolling.

**The Open Evidence Rule.** Give projects and career content room before adding a container around them.

## Shapes

A circular portrait and elliptical orbit establish the signature geometry. Each project showcase uses one 16px outer radius; its image and details meet without individual rounded edges. Buttons and fields use 12px corners, and small tags use 8px corners. The floating theme control uses a 16px squircle rather than a pill. Employer logos sit on white rounded backings without recoloring the image. Square marks use 56px stages; the Clari5 wordmark uses a wider 96px by 56px stage to preserve readable identity.

## Components

- **Buttons:** accent-filled primary or outlined secondary, with 48px minimum height and text paired with directional icons. A small upward hover movement runs only without reduced-motion preference. Disabled submit controls show waiting feedback.
- **Project showcases:** each inset, cropped cover and tinted details area share one outer frame. Columns alternate on desktop and become image-first on mobile. On hover-capable devices, the cover tilts slightly above a blue backing plate without crossing into the text column. Status, project title, description and technology tags lead to separate live-demo and source-code links. Unavailable demos remain honest text.
- **About:** an open editorial split with a small identity marker, accent rule, three concise professional-focus signals, spacious highlighted prose and a standalone education mark. It has no enclosing card border or background block.
- **Career:** a connected timeline of dated entries, official company logos, role headings and factual summaries. The current entry uses a restrained orange wash and earlier entries use pale yellow, while their rails and spacing stay aligned. Dates use compact accent badges for recruiter scanning. Hover deepens the fade without adding a rectangular shadow. On mobile, dates move above each entry. Logo assets are local and general UI icons never substitute for company branding.
- **Toolkit:** two columns of categories whose color washes fade toward the page, one column on mobile. Category icons and small colored details support scanning. Panels lift on pointer hover; chips only change color so they remain clearly descriptive rather than interactive filters. The frontend category retains its Core focus label.
- **Theme switch:** one fixed lower-right icon button that toggles between Light and Dark. It shows the current theme—a gold sun on a dark control in Light mode and a dark moon on a gold control in Dark mode—while its accessible label names the destination. The control is 52px on desktop, 48px on mobile, and keeps a tight theme-aware shadow plus visible keyboard focus. Dark is the default before the visitor chooses another preference.
- **Inputs:** visible labels, surface-colored fills, outlined edges and 16px entry text. Hover strengthens the edge and focus adds a theme-colored halo. Invalid fields have an error border and associated text. The textarea resizes vertically; submission feedback uses an inline live status region.
- **Contact:** an open two-column section with a soft radial color atmosphere instead of a solid full-width panel. Contact details and the form remain part of the page flow.
- **Navigation and icons:** native section anchors stay visible at every width, with a selected surface and active underline. Phosphor provides consistent directional, social, location, document and toolkit icons. Informative links retain text; decorative icons are hidden from assistive technology.
- **Star sphere:** fixed, pointer-transparent Canvas 2D behind the page, using deterministic projected points, slightly enlarged stars and staggered, slow twinkles. Sparse four-point glints breathe with individual stars; no synchronized flashing. The renderer reduces density on narrow screens, caps pixel ratio and draws at approximately 30 frames per second. It pauses in hidden tabs, and reduced-motion preference produces a static sky. Theme changes update star color. This explicit user request supersedes earlier guidance against all continuous decoration; the prohibition on decorative WebGL remains.
- **Focus and motion:** two-pixel focus outlines with five-pixel offset remain visible. Smooth scrolling, hero arrival, link/icon movement, panel lifts and timeline shifts require no reduced-motion preference. Touch devices do not receive hover-only movement, and static content is present without waiting for animation.

## Do's and Don'ts

- Do reuse semantic CSS variables for coherent light and dark themes.
- Do use the locally stored LinkedIn portrait and official employer assets without recoloring their brands.
- Do preserve visible keyboard focus, native links and labeled form controls.
- Do keep motion optional and all information accessible without it.
- Don't add decorative WebGL, custom cursors or scroll-jacking.
- Don't turn every project, career entry and toolkit category back into an enclosed card.
- Don't invent skill ratings, experience totals or impact metrics.
- Don't describe project cover artwork as a product screenshot.
