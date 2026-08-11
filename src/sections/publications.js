import { html, raw } from "../lib/dom.js";
import { collapseRegion, collapseToggle, linkPill, maybeLink, staticPill, timelineCard } from "../ui/components.js";

export function render(data) {
  const items = data.publications.map(
    ({ title, venue, venueLink, authors, highlightAuthor, abstract, links = {}, citations, tags = [] }, i) => {
      const authorLine = (authors ?? []).length
        ? html`<p class="pub-authors">
            ${(authors ?? []).map((a, j) => raw(html`${j ? ", " : ""}${
              a === highlightAuthor ? raw(html`<b class="pub-author-self">${a}</b>`) : a
            }`))}
          </p>`
        : "";

      const pills = [
        linkPill({ href: links.pdf, label: "PDF", icon: "pdf" }),
        linkPill({ href: links.doi, label: "DOI", icon: "doi" }),
        citations != null ? staticPill({ label: `${citations} citations`, icon: "citations" }) : "",
      ].filter(Boolean);

      return timelineCard({
        title: html`${title}`,
        body: html`
          ${raw(authorLine)}
          ${venue ? raw(html`<p class="pub-venue">${raw(maybeLink(venue, venueLink, "pub-venue-link"))}</p>`) : ""}
        `,
        footer: html`
          <div class="card-footer">
            <div class="pill-row">
              ${pills.map(raw)}
              ${abstract
                ? raw(
                    collapseToggle({
                      id: `pub-abstract-${i}`,
                      labelClosed: "Abstract",
                      labelOpen: "Hide",
                    })
                  )
                : ""}
            </div>
            ${tags.length
              ? raw(html`<ul class="tag-row tag-row--muted">${tags.map((t) => raw(html`<li class="tag">${t}</li>`))}</ul>`)
              : ""}
          </div>
          ${abstract
            ? raw(
                collapseRegion({
                  id: `pub-abstract-${i}`,
                  content: html`<p class="pub-abstract">${abstract}</p>`,
                })
              )
            : ""}
        `,
      });
    }
  );

  return html`<ol class="timeline">${items.map(raw)}</ol>`;
}
