import { html, raw } from "../lib/dom.js";

/**
 * Whole years from `YYYY-MM` until now, rounded down.
 *
 * Counts elapsed months rather than subtracting years, so it does not tick
 * over early: Jan 2023 reads "3" for the whole of 2026 up to January 2027.
 */
function yearsSince(iso, now = new Date()) {
  const [y, m] = String(iso).split("-").map(Number);
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - (m || 1));
  return Math.max(0, Math.floor(months / 12));
}

/** GPA of the most recent education entry that records one. */
function latestGpa(education = []) {
  return education.find((e) => e.gpa)?.gpa ?? "—";
}

/**
 * Resolve a stat to its displayed value.
 *
 * Nothing here is a literal: counts come from the collections themselves and
 * the GPA from the education list, so the headline numbers cannot contradict
 * what the rest of the page shows.
 */
function statValue(stat, data) {
  if (stat.count) {
    const list = data[stat.count];
    return String(Array.isArray(list) ? list.length : 0);
  }
  if (stat.yearsSince) return `${yearsSince(stat.yearsSince)}+`;
  if (stat.latestGpa) return latestGpa(data.education);
  return stat.value ?? "";
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
