# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Portfolio website for Frida Ramírez Salas (UI/UX Designer & Motion Specialist). Plain HTML + CSS + vanilla JavaScript — no build tools, no framework, no package manager. Deploys to Vercel by dragging the folder.

## Running the site

Open `index.html` directly in a browser (double-click). No server or install step is needed.

For a local server (required only if you add fetch calls or ES modules):
```bash
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

Single page (`index.html`) — no routing. Three files do all the work:

| File | Role |
|---|---|
| `index.html` | Structure and content |
| `style.css` | All layout, tokens, and visual design |
| `script.js` | Splash timer, About popup, scroll reveal, Rive wiring |

**Design system lives in `style.css` `:root`** — change colors, fonts, or spacing there, never inline.

### OS-window design language (from Figma)
Every visible section is styled as a retro operating-system window using the shared `.os-window` + `.os-titlebar` + `.os-close` pattern. Do not break this pattern when adding new sections. Key tokens:

```
--color-window:   #ecf0f9   window body
--color-titlebar: #c1d1f2   title bar background
--color-close:    #d75d5d   red X button
--color-text:     #185b89   all primary text
--border-width:   5px       all borders are 5px solid black
--size-radius:    10px      all border-radius
```

Fonts loaded via Google Fonts CDN: **Raleway** (body/headings) and **Permanent Marker** (X buttons and display accents).

### Animations

**GIFs** — placed in `assets/animations/`, used as plain `<img>` tags. Auto-loop with no JS.

**Rive** — loaded via CDN (`@rive-app/canvas@2.21.5`). Three canvases exist:
- `#rive-hero` → `assets/animations/hero.riv` — hero section, wired to `hover` (boolean) + `click` (trigger) + optional `scrollProgress` (number) inputs
- `#rive-contact` → `assets/animations/contact.riv` — contact section, wired to `hover`
- `#rive-about` → decorative canvas inside the About popup

Each Rive instance has an `onLoadError` fallback: hero falls back to `hero-fallback.gif`; others hide the canvas. State machine name must be `"State Machine 1"` in Rive editor, or update the constants at the top of `script.js`.

### About popup

`#about-window` is a `position: fixed` overlay hidden with `.hidden`. It is **not** a `<section>` — it lives inside `.desktop` but floats over everything at `z-index: 200`. Open/close is controlled by `data-opens="about-window"` / `data-closes="about-window"` attributes; the overlay div is created dynamically on open and removed on close. Escape key also closes it.

### Scroll reveal

Any element with `.reveal-item` starts invisible (`opacity: 0; transform: translateY(32px)`) and gains `.visible` when it enters the viewport via `IntersectionObserver`. Add `.reveal-item` to new sections to opt in.

## Adding a project card

Copy one `<article class="os-window card reveal-item">` block inside the `.work-grid`, update the title, description, tag, and GIF filename. No JS changes needed.

## Assets

```
assets/
  animations/   .gif files (auto-play loops) + .riv files (Rive interactive)
  images/       static images exported from Figma
```

Expected GIF names referenced in HTML: `intro.gif`, `hero-fallback.gif`, `project-1.gif`, `project-2.gif`, `project-3.gif`.  
Expected Rive names referenced in JS: `hero.riv`, `contact.riv`.

## Deployment

Push to GitHub and connect the repo in Vercel, or drag-drop the folder at vercel.com/new. No `vercel.json` needed — Vercel serves `index.html` as the root automatically.

## Figma source

Design file: `E6Pyla9jwNOaASJa0qyqEF` (Frida Ramírez_Website). The About popup was extracted from node `95:206`. Use the Figma MCP (`get_design_context`) to extract additional sections when implementing new parts of the design.
