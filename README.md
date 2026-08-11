# erfanshafagh.github.io

Personal portfolio. Static site, no framework and no bundler — GitHub Pages
serves these files as-is.

Live at **https://erfanshafagh.github.io/**

## Editing content

Everything the site displays comes from [`src/data.js`](src/data.js). Adding a
project, changing a job description, reordering the nav, or hiding a whole
section is a one-file edit.

After changing content, run:

```bash
node build.js
```

That refreshes the pre-rendered block inside `index.html`. The site renders from
`data.js` at runtime either way — the snapshot exists because LinkedIn, X, Slack
and the AI crawlers don't execute JavaScript, so without it they'd fetch a page
with no text in it. Skipping the build only makes that snapshot stale; it never
shows a visitor the wrong thing.

## Layout

```
index.html            shell + meta tags + pre-rendered crawler snapshot
build.js              regenerates that snapshot from src/data.js
src/
  data.js             ← all content lives here
  main.js             entry point: renders the sidebar and panels, wires once
  lib/
    dom.js            escaping, safe URLs, the html`` template tag
    icons.js          inline SVG icon set (Phosphor, MIT)
    tabs.js           ARIA tabs + hash routing
    theme.js          dark/light with OS preference
  ui/
    components.js     shared card, timeline, pill, collapsible
  sections/
    index.js          section registry
    about.js  education.js  experience.js  projects.js
    skills.js  publications.js  contact.js
styles/
  tokens.css          colours, spacing, timing (both themes)
  base.css            reset, focus rings, reduced-motion
  layout.css          page grid, sidebar, tab bar, panels
  components.css      shared component styles
  sections.css        per-section styles
  responsive.css      all breakpoints
assets/
  img/                optimised WebP + favicons
  resume.pdf  cv.pdf
```

## Adding a section

1. Add an entry to `sections` in `src/data.js` (`id`, `label`, `eyebrow`,
   `heading`, and `scroll: true` if it should scroll on desktop).
2. Add the content under that same `id` key.
3. Create `src/sections/<id>.js` exporting `render(data)`, and optionally
   `mount(panel, data)` for event wiring.
4. Register it in `src/sections/index.js`.

No changes to `index.html` or any stylesheet are needed — the tab, panel,
routing, and scroll behaviour all follow from the registry.

## Running locally

ES modules need a real HTTP server; opening `index.html` from the filesystem
will fail on CORS.

```bash
python -m http.server 8000
```

Then open http://localhost:8000/.

## Conventions

- **Escape everything.** Section renderers build HTML strings. Use the
  `` html`` `` tag from `src/lib/dom.js`, which escapes interpolated values, and
  `safeUrl()` for anything that becomes an `href`.
- **Wire once.** Panels are built once and never rebuilt, so listeners are
  attached a single time from `mount()`. Don't re-run wiring on tab change.
- **Tokens, not literals.** Colours, radii and timings come from
  `styles/tokens.css` so both themes stay in sync.
