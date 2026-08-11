/**
 * Tab strip implementing the WAI-ARIA tabs pattern, with the URL hash as the
 * source of truth for which tab is open.
 *
 * The previous version declared role="tablist"/"tab"/"tabpanel" but shipped
 * none of the contract behind them -- no aria-selected, no aria-controls, no
 * roving tabindex, no arrow keys -- so screen readers announced seven
 * indistinguishable tabs with no selected state. It also kept the active tab
 * only in sessionStorage, which meant one URL for the whole site: no deep
 * links, and Back exited the page instead of returning to the previous tab.
 */

const STORE_KEY = "activeTab";

/**
 * @param {object} opts
 * @param {HTMLElement} opts.tablist  container that owns role="tablist"
 * @param {Array<{id: string, label: string}>} opts.sections
 * @param {(id: string) => void} opts.onChange
 * @param {(id: string) => void} [opts.onTitle]
 */
export function initTabs({ tablist, sections, onChange, onTitle }) {
  const ids = sections.map((s) => s.id);
  let current = null;

  const buttons = sections.map((section) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tab";
    btn.id = `tab-${section.id}`;
    btn.dataset.tab = section.id;
    btn.textContent = section.label;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-controls", `panel-${section.id}`);
    btn.setAttribute("aria-selected", "false");
    btn.tabIndex = -1;
    tablist.appendChild(btn);
    return btn;
  });

  function activate(id, { focus = false, push = true } = {}) {
    if (!ids.includes(id)) id = ids[0];
    if (id === current) {
      if (focus) buttons[ids.indexOf(id)].focus();
      return;
    }
    current = id;

    buttons.forEach((btn, i) => {
      const on = ids[i] === id;
      btn.setAttribute("aria-selected", String(on));
      btn.tabIndex = on ? 0 : -1;
      btn.classList.toggle("active", on);
      if (on && focus) btn.focus();
    });

    onChange(id);
    onTitle?.(id);

    try {
      sessionStorage.setItem(STORE_KEY, id);
    } catch {
      /* ignore */
    }
    if (push && location.hash.slice(1) !== id) {
      history.pushState(null, "", `#${id}`);
    }
  }

  tablist.addEventListener("click", (ev) => {
    const btn = ev.target.closest('[role="tab"]');
    if (btn && tablist.contains(btn)) activate(btn.dataset.tab);
  });

  tablist.addEventListener("keydown", (ev) => {
    const i = buttons.indexOf(document.activeElement);
    if (i < 0) return;
    const last = buttons.length - 1;
    let next = null;

    switch (ev.key) {
      case "ArrowRight": next = i === last ? 0 : i + 1; break;
      case "ArrowLeft":  next = i === 0 ? last : i - 1; break;
      case "Home":       next = 0; break;
      case "End":        next = last; break;
      default: return;
    }
    ev.preventDefault();
    activate(ids[next], { focus: true });
  });

  // Back/forward and pasted deep links both flow through the hash.
  window.addEventListener("popstate", () => {
    activate(location.hash.slice(1) || storedTab(ids), { push: false });
  });

  activate(location.hash.slice(1) || storedTab(ids), { push: false });

  return { activate };
}

function storedTab(ids) {
  try {
    const saved = sessionStorage.getItem(STORE_KEY);
    if (saved && ids.includes(saved)) return saved;
  } catch {
    /* ignore */
  }
  return ids[0];
}
