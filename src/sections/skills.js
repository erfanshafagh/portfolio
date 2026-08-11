import { html, raw } from "../lib/dom.js";

export function render(data) {
  return html`
    <ul class="skill-bands">
      ${data.skills.map(
        ({ category, hue, items }) => raw(html`
          <li class="skill-band" style="--cat-hue:${Number(hue) || 0}">
            <h3 class="skill-band-name">${category}</h3>
            <ul class="skill-chips">
              ${(items ?? []).map((s) => raw(html`<li class="skill-chip">${s}</li>`))}
            </ul>
          </li>
        `)
      )}
    </ul>
  `;
}
