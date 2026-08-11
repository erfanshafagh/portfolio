import { html, raw } from "../lib/dom.js";
import { collapsible, glyph, maybeLink, timelineCard } from "../ui/components.js";

export function render(data) {
  const items = data.experience.map(({ title, company, website, period, location, highlights }, i) => {
    const list = (highlights ?? []).length
      ? html`<ul class="highlight-list">${(highlights ?? []).map((h) => raw(html`<li>${h}</li>`))}</ul>`
      : "";

    return timelineCard({
      title: html`${title}`,
      meta: period,
      entity: maybeLink(company, website, "card-entity"),
      extras: html`
        ${location
          ? raw(html`<span class="card-location">${raw(glyph("location"))}${location}</span>`)
          : ""}
        ${list
          ? raw(
              collapsible({
                id: `exp-highlights-${i}`,
                labelClosed: "Show more",
                labelOpen: "Show less",
                content: list,
              })
            )
          : ""}
      `,
    });
  });

  return html`<ol class="timeline">${items.map(raw)}</ol>`;
}
