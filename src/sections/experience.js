import { html, raw } from "../lib/dom.js";
import { collapseRegion, collapseToggle, glyph, maybeLink, timelineCard } from "../ui/components.js";

export function render(data) {
  const items = data.experience.map(({ title, company, website, period, location, highlights }, i) => {
    const id = `exp-highlights-${i}`;
    const has = (highlights ?? []).length > 0;
    const list = has
      ? html`<ul class="highlight-list">${highlights.map((h) => raw(html`<li>${h}</li>`))}</ul>`
      : "";

    return timelineCard({
      title: html`${title}`,
      meta: period,
      entity: maybeLink(company, website, "card-entity"),
      // The toggle is pushed to the end of the entity row so it lines up
      // across cards instead of drifting with the company/location width.
      extras: html`
        ${location
          ? raw(html`<span class="card-location">${raw(glyph("location"))}${location}</span>`)
          : ""}
        ${has
          ? raw(
              collapseToggle({
                id,
                labelClosed: "Show more",
                labelOpen: "Show less",
                className: "collapse-toggle--end",
              })
            )
          : ""}
      `,
      body: has ? collapseRegion({ id, content: list }) : "",
    });
  });

  return html`<ol class="timeline">${items.map(raw)}</ol>`;
}
