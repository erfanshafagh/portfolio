import { html, raw } from "../lib/dom.js";
import { maybeLink, timelineCard } from "../ui/components.js";

export function render(data) {
  const items = data.education.map(({ degree, school, website, year, description, gpa }) =>
    timelineCard({
      title: html`${degree}`,
      meta: year,
      entity: maybeLink(school, website, "card-entity"),
      body: html`
        ${description ? raw(html`<p class="card-body">${description}</p>`) : ""}
        ${gpa ? raw(html`<p class="card-note">GPA: ${gpa}</p>`) : ""}
      `,
    })
  );
  return html`<ol class="timeline">${items.map(raw)}</ol>`;
}
