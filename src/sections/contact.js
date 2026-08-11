import { html, raw, safeUrl } from "../lib/dom.js";
import { linkPill } from "../ui/components.js";

export function render(data) {
  const { contact } = data;

  const fields = [
    { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { label: "Availability", value: contact.availability },
    { label: "Response Time", value: contact.responseTime },
  ].filter((f) => f.value);

  return html`
    <div class="panel-scroll">
      ${contact.intro ? raw(html`<p class="prose-lead">${contact.intro}</p>`) : ""}

      <div class="contact-card">
        <dl class="contact-fields">
          ${fields.map(
            (f) => raw(html`
              <div class="contact-field">
                <dt class="contact-label">${f.label}</dt>
                <dd class="contact-value">
                  ${f.href
                    ? raw(html`<a class="contact-link" href="${raw(safeUrl(f.href))}">${f.value}</a>`)
                    : f.value}
                </dd>
              </div>
            `)
          )}
        </dl>
        <div class="contact-socials">
          ${(contact.socials ?? []).map((s) => raw(linkPill({ href: s.href, label: s.label, icon: s.icon })))}
        </div>
      </div>

      ${contact.form === true ? raw(formMarkup()) : ""}
    </div>
  `;
}

/**
 * The form is opt-in via `contact.form` and has no backend. It stays behind the
 * flag rather than being deleted so the markup is ready once an endpoint exists.
 */
function formMarkup() {
  return html`
    <form class="contact-form" id="contactForm" novalidate>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="cf-name">Name</label>
          <input id="cf-name" name="name" class="form-input" type="text" required autocomplete="name" />
        </div>
        <div class="form-group">
          <label class="form-label" for="cf-email">Email</label>
          <input id="cf-email" name="email" class="form-input" type="email" required autocomplete="email" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" class="form-textarea" required></textarea>
      </div>
      <button type="submit" class="form-submit">Send Message</button>
      <p class="form-status" id="formStatus" role="status" aria-live="polite"></p>
    </form>
  `;
}

export function mount(panel) {
  const form = panel.querySelector("#contactForm");
  if (!form) return;
  const status = panel.querySelector("#formStatus");

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // No endpoint is configured yet; say so rather than faking success.
    if (status) {
      status.textContent = "This form isn't connected yet — please email me directly.";
      status.classList.add("form-status--warn");
    }
  });
}
