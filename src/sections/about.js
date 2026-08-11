import { html, raw } from "../lib/dom.js";

/**
 * Resolve a stat's displayed value. `from` counts entries in a data collection
 * so the headline numbers can never contradict what the site actually lists.
 */
function statValue(stat, data) {
  if (stat.value != null) return stat.value;
  const n = Array.isArray(data[stat.from]) ? data[stat.from].length : 0;
  return `${n}${stat.suffix ?? ""}`;
}

export function render(data) {
  const { about } = data;
  return html`
    <div class="panel-scroll">
      <div class="prose">${about.bio.map((p) => raw(html`<p>${p}</p>`))}</div>
      <ul class="stats-row">
        ${about.stats.map(
          (s) => raw(html`
            <li class="stat-card">
              <span class="stat-value">${statValue(s, data)}</span>
              <span class="stat-label">${s.label}</span>
            </li>
          `)
        )}
      </ul>
    </div>
  `;
}
