/**
 * Entry point: build the sidebar and one panel per section, then wire
 * everything exactly once.
 *
 * Panels are rendered up front and swapped with a class, which keeps tab
 * switching instant. Because nothing is ever rebuilt, every listener can be
 * attached a single time -- the previous version re-ran its wiring on each nav
 * click and accumulated duplicate handlers for the life of the page.
 */

import { portfolioData } from "./data.js";
import { byId, html, raw, safeUrl } from "./lib/dom.js";
import { initTabs } from "./lib/tabs.js";
import { initTheme } from "./lib/theme.js";
import { glyph, sectionHeader, wireCollapsibles } from "./ui/components.js";
import { SECTIONS, activeSections } from "./sections/index.js";

function renderSidebar(data) {
  const { profile } = data;

  byId("profileName").textContent = profile.name;
  byId("profileRole").textContent = profile.role;

  const avatar = byId("avatarImg");
  avatar.src = profile.avatar;
  avatar.alt = `${profile.name}, ${profile.role}`;

  const links = (profile.links ?? [])
    .map(({ label, href, icon }) => {
      const url = safeUrl(href);
      if (!url) return "";
      const external = /^https?:/i.test(url);
      return html`<a
        class="profile-link"
        href="${raw(url)}"
        ${raw(external ? 'target="_blank" rel="noopener noreferrer"' : "")}
        >${raw(glyph(icon))}<span>${label}</span></a
      >`;
    })
    .filter(Boolean);

  const location = profile.location
    ? html`<p class="profile-link profile-link--static">${raw(glyph("location"))}<span>${profile.location}</span></p>`
    : "";

  byId("profileLinks").innerHTML = links.join("") + location;
}

function renderPanels(data, sections) {
  const container = byId("panelContainer");
  container.innerHTML = sections
    .map(
      (s) => html`
        <section
          class="panel${s.scroll ? " panel--scroll" : ""}"
          id="panel-${s.id}"
          role="tabpanel"
          aria-labelledby="tab-${s.id}"
          tabindex="0"
          hidden
        >
          ${raw(sectionHeader({ eyebrow: s.eyebrow, heading: s.heading, id: `heading-${s.id}` }))}
          ${raw(SECTIONS[s.id].render(data))}
        </section>
      `
    )
    .join("");

  // One-time wiring per section, now that the markup exists.
  for (const s of sections) {
    SECTIONS[s.id].mount?.(byId(`panel-${s.id}`), data);
  }
  wireCollapsibles(container);
}

function showPanel(id, sections) {
  for (const s of sections) {
    const panel = document.getElementById(`panel-${s.id}`);
    if (!panel) continue;
    const on = s.id === id;
    panel.hidden = !on;
    if (on) {
      panel.classList.remove("entering");
      void panel.offsetWidth; // restart the entrance animation
      panel.classList.add("entering");
    }
  }
}

function init() {
  const data = portfolioData;
  const sections = activeSections(data);
  if (!sections.length) throw new Error("no renderable sections in data.js");

  renderSidebar(data);
  renderPanels(data, sections);
  initTheme(byId("themeToggle"));

  const baseTitle = `${data.profile.name} — ${data.profile.role}`;
  document.title = baseTitle;

  initTabs({
    tablist: byId("tabList"),
    sections,
    onChange: (id) => showPanel(id, sections),
    onTitle: (id) => {
      const s = sections.find((x) => x.id === id);
      document.title = s ? `${s.label} · ${baseTitle}` : baseTitle;
    },
  });

  document.body.classList.add("ready");
}

try {
  init();
} catch (err) {
  // A malformed data.js used to blank the page silently. Keep the pre-rendered
  // fallback markup visible and surface the reason in the console instead.
  console.error("[portfolio] failed to initialise:", err);
  document.body.classList.add("init-failed");
}
