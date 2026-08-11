/**
 * Theme handling.
 *
 * The initial theme is applied by a tiny inline script in index.html, before
 * first paint, so a light-theme visitor never sees a flash of dark. This module
 * only handles the toggle and keeps the choice in sync.
 */

import { icon } from "./icons.js";

const KEY = "theme";

/** Read a stored preference, falling back to the OS setting. */
export function preferredTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* private mode or storage disabled */
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

export function applyTheme(theme, button) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* ignore */
  }
  if (button) {
    const next = theme === "dark" ? "light" : "dark";
    button.innerHTML = icon(theme === "dark" ? "sun" : "moon");
    button.setAttribute("aria-label", `Switch to ${next} theme`);
  }
}

/** Wire the toggle button and keep it in sync with the OS preference. */
export function initTheme(button) {
  applyTheme(preferredTheme(), button);

  button?.addEventListener("click", () => {
    const now = document.documentElement.getAttribute("data-theme");
    applyTheme(now === "dark" ? "light" : "dark", button);
  });

  // Follow the OS only while the visitor has not made an explicit choice.
  window.matchMedia?.("(prefers-color-scheme: light)").addEventListener?.("change", (ev) => {
    let explicit = null;
    try {
      explicit = localStorage.getItem(KEY);
    } catch {
      /* ignore */
    }
    if (!explicit) applyTheme(ev.matches ? "light" : "dark", button);
  });
}
