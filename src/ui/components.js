/**
 * Shared UI pieces.
 *
 * Education, Experience and Publications previously each emitted their own
 * near-identical timeline card, and the link pill was hand-written at five
 * separate call sites. Both live here once now, so a visual change lands in
 * one place instead of three-to-five.
 */

import { html, raw, safeUrl } from "../lib/dom.js";
import { icon } from "../lib/icons.js";

/**
 * Semantic icon name -> glyph. Keeps presentation out of data.js: content
 * says "this link is a github link", not "draw ph-github-logo".
 */
const ICONS = {
  email: "envelope",
  linkedin: "linkedin-logo",
  github: "github-logo",
  website: "globe",
  twitter: "twitter-logo",
  instagram: "instagram-logo",
  cv: "file-text",
  pdf: "file-pdf",
  doi: "link",
  location: "map-pin",
  external: "arrow-square-out",
  citations: "quotes",
  default: "link",
};

/** Resolve a semantic icon name to inline SVG markup. */
export function glyph(name, opts) {
  return icon(ICONS[name] || ICONS.default, opts);
}

/**
 * A pill-shaped link button. One implementation for project links, publication
 * links and contact socials.
 *
 * @param {{href: string, label: string, icon?: string, className?: string}} opts
 * @returns {string} markup, or "" when the href is missing or unsafe
 */
export function linkPill({ href, label, icon: iconName, className = "" }) {
  const url = safeUrl(href);
  if (!url) return "";
  return html`<a
    href="${raw(url)}"
    target="_blank"
    rel="noopener noreferrer"
    class="pill ${className}"
    >${raw(glyph(iconName))}<span>${label}</span></a
  >`;
}

/** A non-interactive pill, for facts that look like links but aren't. */
export function staticPill({ label, icon: iconName, className = "" }) {
  return html`<span class="pill pill--static ${className}"
    >${raw(glyph(iconName))}<span>${label}</span></span
  >`;
}

/**
 * Optionally-linked text. Used for school and company names, which may or may
 * not have a website in the data.
 */
export function maybeLink(text, href, className = "") {
  const url = safeUrl(href);
  return url
    ? html`<a href="${raw(url)}" target="_blank" rel="noopener noreferrer" class="${className}">${text}</a>`
    : html`<span class="${className}">${text}</span>`;
}

/**
 * A collapsible region plus the button that controls it.
 *
 * Collapsed content is hidden with `visibility`, not just clipped to zero
 * height, so screen readers do not read out content that sighted users cannot
 * see. The animation uses `grid-template-rows` rather than a hardcoded
 * `max-height` ceiling, so long content can never be cut off mid-word.
 *
 * @param {{id: string, labelClosed: string, labelOpen: string, content: string}} opts
 */
export function collapsible({ id, labelClosed, labelOpen, content }) {
  return html`
    <button
      class="collapse-toggle"
      type="button"
      aria-expanded="false"
      aria-controls="${id}"
      data-label-closed="${labelClosed}"
      data-label-open="${labelOpen}"
    >
      <span class="collapse-toggle-text">${labelClosed}</span>${raw(icon("caret-down"))}
    </button>
    <div class="collapse-region" id="${id}">
      <div class="collapse-region-inner">${raw(content)}</div>
    </div>
  `;
}

/**
 * Wire every {@link collapsible} inside `root`. Delegated and idempotent, so it
 * is safe to call once at startup and never again.
 *
 * @param {Element} root
 */
export function wireCollapsibles(root) {
  root.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".collapse-toggle");
    if (!btn || !root.contains(btn)) return;

    const region = document.getElementById(btn.getAttribute("aria-controls"));
    if (!region) return;

    const open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open));
    region.classList.toggle("open", open);
    btn.classList.toggle("open", open);

    const text = btn.querySelector(".collapse-toggle-text");
    if (text) {
      text.textContent = open ? btn.dataset.labelOpen : btn.dataset.labelClosed;
    }
  });
}

/** Section heading block shared by every panel. */
export function sectionHeader({ eyebrow, heading, id }) {
  return html`
    <p class="section-eyebrow">${eyebrow}</p>
    <h2 class="section-heading" id="${id}">${heading}</h2>
  `;
}

/**
 * A timeline card: dot, title, trailing meta pill, subtitle row, body.
 * Backs Education, Experience and Publications.
 *
 * @param {{title: string, meta?: string, entity?: string, extras?: string, body?: string, footer?: string}} opts
 */
export function timelineCard({ title, meta = "", entity = "", extras = "", body = "", footer = "" }) {
  return html`
    <li class="timeline-item">
      <span class="timeline-dot" aria-hidden="true"></span>
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">${raw(title)}</h3>
          ${meta ? raw(html`<span class="card-meta">${meta}</span>`) : ""}
        </div>
        ${entity || extras
          ? raw(html`<div class="card-entity-row">${raw(entity)}${raw(extras)}</div>`)
          : ""}
        ${raw(body)}${raw(footer)}
      </div>
    </li>
  `;
}
