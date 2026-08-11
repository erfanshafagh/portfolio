/**
 * Projects: a master list plus a detail pane, filtered by tag.
 *
 * Two bugs shaped this rewrite:
 *
 * 1. The old code re-ran its wiring on every nav click and stacked a fresh
 *    click+keydown pair on the (never replaced) list element each time. Since
 *    the keydown handler synthesised a click, one Enter press fanned out to
 *    N*N detail rebuilds. Everything here is wired exactly once, from mount().
 *
 * 2. The filter <select> was cloned to reset its listener, which silently reset
 *    its *value* to "All" while the list stayed filtered -- and picking "All"
 *    to recover fired no change event, so the site looked like it had two
 *    projects. Filter state now lives in this module and the element is never
 *    replaced.
 */

import { html, raw, safeUrl } from "../lib/dom.js";
import { linkPill } from "../ui/components.js";

const ALL = "All";

export function render(data) {
  const projects = data.projects ?? [];
  const tags = [ALL, ...new Set(projects.flatMap((p) => p.tags ?? []))];

  return html`
    <div class="master-detail">
      <div class="md-list-wrap">
        <label class="visually-hidden" for="projectFilter">Filter projects by tag</label>
        <select class="md-filter" id="projectFilter">
          ${tags.map((t) => raw(html`<option value="${t}">${t}</option>`))}
        </select>
        <ul class="md-list" id="projectList">
          ${projects.map(
            (p, i) => raw(html`
              <li>
                <button
                  type="button"
                  class="md-item${i === 0 ? " selected" : ""}"
                  data-index="${i}"
                  data-tags="${(p.tags ?? []).join("|")}"
                  aria-current="${i === 0 ? "true" : "false"}"
                >
                  <span class="md-item-name">${p.name}</span>
                  <span class="md-item-tagline">${p.tagline}</span>
                </button>
              </li>
            `)
          )}
        </ul>
        <p class="md-empty" id="projectEmpty" hidden>No projects match that tag.</p>
      </div>
      <div class="md-detail" id="projectDetail" aria-live="polite">
        ${raw(projects.length ? detail(projects[0]) : "")}
      </div>
    </div>
  `;
}

/** Markup for a single project's detail pane. */
function detail({ name, tagline, description, tags = [], links = {}, image, imageCredit }) {
  const pills = [
    linkPill({ href: links.live, label: "Live Demo", icon: "external" }),
    linkPill({ href: links.github, label: "Source Code", icon: "github" }),
  ].filter(Boolean);

  const img = safeUrl(image);
  const creditHref = imageCredit?.href ? safeUrl(imageCredit.href) : "";

  return html`
    <div class="md-detail-header">
      <div>
        <h3 class="md-detail-name">${name}</h3>
        <p class="md-detail-tagline">${tagline}</p>
      </div>
      ${img
        ? raw(html`<figure class="md-detail-figure">
            <img
              class="md-detail-img"
              src="${raw(img)}"
              alt=""
              width="260"
              height="164"
              loading="lazy"
              decoding="async"
            />
            ${imageCredit
              ? raw(html`<figcaption class="md-detail-credit">
                  ${creditHref
                    ? raw(html`<a href="${raw(creditHref)}" target="_blank" rel="noopener noreferrer">${imageCredit.text}</a>`)
                    : imageCredit.text}
                </figcaption>`)
              : ""}
          </figure>`)
        : ""}
    </div>
    <p class="md-detail-desc">${description}</p>
    <ul class="tag-row">${tags.map((t) => raw(html`<li class="tag">${t}</li>`))}</ul>
    ${pills.length ? raw(html`<div class="pill-row">${pills.map(raw)}</div>`) : ""}
  `;
}

/** Wire the list and filter. Called once per page load. */
export function mount(panel, data) {
  const projects = data.projects ?? [];
  const list = panel.querySelector("#projectList");
  const pane = panel.querySelector("#projectDetail");
  const filter = panel.querySelector("#projectFilter");
  const empty = panel.querySelector("#projectEmpty");
  if (!list || !pane || !filter) return;

  const select = (btn) => {
    if (!btn) return;
    for (const b of list.querySelectorAll(".md-item")) {
      const on = b === btn;
      b.classList.toggle("selected", on);
      b.setAttribute("aria-current", String(on));
    }
    pane.innerHTML = detail(projects[Number(btn.dataset.index)]);
    pane.classList.remove("entering");
    void pane.offsetWidth; // restart the entrance animation
    pane.classList.add("entering");
  };

  list.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".md-item");
    if (btn && list.contains(btn)) select(btn);
  });

  filter.addEventListener("change", () => {
    const tag = filter.value;
    let firstVisible = null;
    let anySelectedVisible = false;

    for (const btn of list.querySelectorAll(".md-item")) {
      const tags = (btn.dataset.tags || "").split("|");
      const show = tag === ALL || tags.includes(tag);
      btn.closest("li").hidden = !show;
      if (!show) continue;
      firstVisible ??= btn;
      if (btn.classList.contains("selected")) anySelectedVisible = true;
    }

    // Only move the selection when the current one was filtered out, so
    // changing tags does not yank the pane away from what you were reading.
    if (!anySelectedVisible) select(firstVisible);

    const none = !firstVisible;
    if (empty) empty.hidden = !none;
    pane.hidden = none;
  });
}
