/**
 * Mobile bottom navigation.
 *
 * On a phone the top pill bar sat below the full-height profile card, so
 * reaching any section meant scrolling past the entire sidebar first, and
 * seven tabs wrapped into a three-row block. This puts navigation in a fixed
 * bar within thumb reach instead.
 *
 * Sections flagged `primary` in data.js get their own slot; the rest live
 * behind a "More" sheet, together with a theme toggle -- the top bar that
 * normally holds one is hidden at this width.
 *
 * Only one navigation is exposed to assistive tech at a time -- the top bar is
 * `display: none` below the breakpoint, and {@link syncPanelRoles} swaps the
 * panels between the tabs pattern and plain regions to match.
 */

import { icon } from "./icons.js";
import { esc } from "./dom.js";

/**
 * Phones only. Tablets keep the top pill bar, which has room for a clean
 * four-column grid; a fixed bottom bar is a phone convention and would just
 * eat vertical space at tablet sizes. Must match styles/responsive.css.
 */
const MOBILE = "(max-width: 600px)";
const MORE = "__more__";

/**
 * @param {object} opts
 * @param {Array} opts.sections   active sections, in nav order
 * @param {(id: string) => void} opts.onSelect
 */
export function initBottomNav({ sections, onSelect }) {
  const primary = sections.filter((s) => s.primary);
  const overflow = sections.filter((s) => !s.primary);

  // With nothing in overflow there is no reason to spend a slot on "More".
  const slots = overflow.length ? [...primary, { id: MORE, short: "More", icon: "dots-three-outline" }] : primary;

  const nav = document.createElement("nav");
  nav.className = "bottom-nav";
  nav.setAttribute("aria-label", "Sections");
  nav.innerHTML = slots.map(slotButton).join("");

  const sheet = document.createElement("div");
  sheet.className = "more-sheet";
  sheet.id = "moreSheet";
  sheet.hidden = true;
  sheet.innerHTML = `
    <div class="more-scrim" data-close></div>
    <div class="more-panel" role="dialog" aria-modal="true" aria-label="More sections">
      <span class="more-grab" aria-hidden="true"></span>
      <ul class="more-list">
        ${overflow
          .map(
            (s) => `<li><button type="button" class="more-item" data-tab="${esc(s.id)}">
              ${icon(s.icon)}<span>${esc(s.label)}</span></button></li>`
          )
          .join("")}
      </ul>
      <div class="more-footer">
        <button class="theme-toggle theme-toggle--wide" type="button" data-label="Switch theme"></button>
      </div>
    </div>`;

  document.body.append(nav, sheet);

  const moreBtn = nav.querySelector(`[data-tab="${MORE}"]`);
  let lastFocus = null;

  const openSheet = () => {
    lastFocus = document.activeElement;
    sheet.hidden = false;
    moreBtn?.setAttribute("aria-expanded", "true");
    document.body.classList.add("sheet-open");
    sheet.querySelector(".more-item, .theme-toggle")?.focus();
  };

  const closeSheet = ({ restoreFocus = true } = {}) => {
    if (sheet.hidden) return;
    sheet.hidden = true;
    moreBtn?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("sheet-open");
    if (!restoreFocus) return;
    // <body> is the activeElement when the sheet was opened by a click that
    // did not move focus (Safari does this), so it is not a valid target.
    const valid =
      lastFocus instanceof HTMLElement && lastFocus !== document.body && lastFocus.isConnected;
    (valid ? lastFocus : moreBtn)?.focus();
  };

  nav.addEventListener("click", (ev) => {
    const btn = ev.target.closest("[data-tab]");
    if (!btn) return;
    if (btn.dataset.tab === MORE) {
      sheet.hidden ? openSheet() : closeSheet();
      return;
    }
    closeSheet({ restoreFocus: false });
    onSelect(btn.dataset.tab);
  });

  sheet.addEventListener("click", (ev) => {
    if (ev.target.closest("[data-close]")) return closeSheet();
    const btn = ev.target.closest(".more-item");
    if (!btn) return;
    closeSheet({ restoreFocus: false });
    onSelect(btn.dataset.tab);
  });

  sheet.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      ev.stopPropagation();
      closeSheet();
      return;
    }
    if (ev.key !== "Tab") return;
    // Keep focus inside the sheet while it is modal.
    const focusable = [...sheet.querySelectorAll("button:not([disabled])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  });

  const mq = window.matchMedia(MOBILE);
  const onChange = () => {
    if (!mq.matches) closeSheet({ restoreFocus: false });
  };
  mq.addEventListener?.("change", onChange);

  return {
    /** Reflect the active section in the bar and the sheet. */
    setActive(id) {
      const inOverflow = overflow.some((s) => s.id === id);
      for (const btn of nav.querySelectorAll("[data-tab]")) {
        const on = btn.dataset.tab === id || (btn.dataset.tab === MORE && inOverflow);
        btn.classList.toggle("active", on);
        // Not a tablist: "current page within a set of links" is the honest
        // mapping here, and it is what screen readers announce usefully.
        if (on) btn.setAttribute("aria-current", "true");
        else btn.removeAttribute("aria-current");
      }
      for (const btn of sheet.querySelectorAll(".more-item")) {
        const on = btn.dataset.tab === id;
        btn.classList.toggle("active", on);
        if (on) btn.setAttribute("aria-current", "true");
        else btn.removeAttribute("aria-current");
      }
    },
    closeSheet,
    isMobile: () => mq.matches,
    /** The sheet's own theme toggle, so it can be wired alongside the top bar's. */
    themeToggle: sheet.querySelector(".theme-toggle"),
  };
}

function slotButton(s) {
  return `<button type="button" class="bottom-nav-item" data-tab="${esc(s.id)}"${
    s.id === MORE ? ' aria-expanded="false" aria-controls="moreSheet"' : ""
  }>
    <span class="bottom-nav-icon">${icon(s.icon)}</span>
    <span class="bottom-nav-label">${esc(s.short || s.label)}</span>
  </button>`;
}

/**
 * Keep the panels' roles honest for whichever navigation is visible.
 *
 * `role="tabpanel"` only makes sense while the tablist exists; below the
 * mobile breakpoint the top bar is hidden and the bottom bar is plain
 * navigation, so the panels become labelled regions instead.
 *
 * @param {Array} sections
 */
export function syncPanelRoles(sections) {
  const mq = window.matchMedia(MOBILE);
  const apply = () => {
    for (const s of sections) {
      const panel = document.getElementById(`panel-${s.id}`);
      if (!panel) continue;
      panel.setAttribute("role", mq.matches ? "region" : "tabpanel");
    }
    document.getElementById("tabList")?.setAttribute("aria-hidden", String(mq.matches));
  };
  apply();
  mq.addEventListener?.("change", apply);
}
