/* ═══════════════════════════════════════════════════
   PORTFOLIO SCRIPT
═══════════════════════════════════════════════════ */
(function () {
  "use strict";

  const ICON_MAP = {
    email:     "ph-envelope",
    linkedin:  "ph-linkedin-logo",
    github:    "ph-github-logo",
    website:   "ph-globe",
    twitter:   "ph-twitter-logo",
    instagram: "ph-instagram-logo",
    cv:        "ph-file-text",
    default:   "ph-link",
  };

  function e(s) {
    const d = document.createElement("div");
    d.textContent = String(s ?? "");
    return d.innerHTML;
  }

  function nameLink(text, href, className) {
    if (href) {
      return `<a href="${e(href)}" target="_blank" rel="noopener" class="${className}" style="cursor:pointer">${e(text)}</a>`;
    }
    return `<span class="${className}">${e(text)}</span>`;
  }

  function buildTabList() {
    const showContact = portfolioData.contact?.display !== false;
    const tabs = [
      { id: "about",        label: "About Me"     },
      { id: "education",    label: "Education"    },
      { id: "experience",   label: "Experience"   },
      { id: "projects",     label: "Projects"     },
      { id: "skills",       label: "Skills"       },
      { id: "publications", label: "Publications" },
    ];
    if (showContact) tabs.push({ id: "contact", label: "Contact" });
    return tabs;
  }

  /* ─────────────────────────────────────────────
     SIDEBAR
  ───────────────────────────────────────────── */
  function renderSidebar() {
    const { profile } = portfolioData;
    document.getElementById("avatarImg").src = profile.avatar;
    document.getElementById("profileName").textContent = profile.name;
    document.getElementById("profileRole").textContent = profile.role;

    const nav = document.getElementById("profileLinks");
    nav.innerHTML = "";
    profile.links.forEach(({ label, href, icon }, i) => {
      const a = document.createElement("a");
      a.href = href; a.className = "profile-link";
      a.target = "_blank"; a.rel = "noopener noreferrer";
      a.innerHTML = `<i class="ph ${ICON_MAP[icon] || ICON_MAP.default}"></i><span>${e(label)}</span>`;
      a.style.cssText = `opacity:0;transform:translateX(-10px);transition:opacity 360ms ease ${60+i*55}ms,transform 360ms ease ${60+i*55}ms`;
      nav.appendChild(a);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        a.style.opacity = "1"; a.style.transform = "translateX(0)";
      }));
    });

    /* Location pill — from data.js, same appearance as links, non-interactive */
    if (profile.location) {
      const loc = document.createElement("div");
      loc.className = "profile-link profile-link--static";
      loc.innerHTML = `<i class="ph ph-map-pin"></i><span>${e(profile.location)}</span>`;
      loc.style.cssText = `opacity:0;transform:translateX(-10px);transition:opacity 360ms ease ${60+profile.links.length*55}ms,transform 360ms ease ${60+profile.links.length*55}ms`;
      nav.appendChild(loc);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        loc.style.opacity = "1"; loc.style.transform = "translateX(0)";
      }));
    }
  }

  /* ─────────────────────────────────────────────
     NAV
  ───────────────────────────────────────────── */
  let TABS = [];

  function renderNav() {
    TABS = buildTabList();
    const nav = document.getElementById("tabNav");
    nav.innerHTML = "";

    TABS.forEach(({ id, label }) => {
      const btn = document.createElement("button");
      btn.className = "tab-btn"; btn.dataset.tab = id;
      btn.textContent = label;
      btn.setAttribute("role", "tab");
      btn.addEventListener("click", () => switchTab(id));
      nav.appendChild(btn);
    });

    const sep = document.createElement("span");
    sep.className = "nav-separator";
    nav.appendChild(sep);

    const toggle = document.createElement("button");
    toggle.className = "theme-toggle"; toggle.id = "themeToggle";
    toggle.setAttribute("aria-label", "Toggle theme");
    toggle.innerHTML = `<i class="ph ph-sun" id="themeIcon"></i>`;
    toggle.addEventListener("click", toggleTheme);
    nav.appendChild(toggle);
  }

  function switchTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach(b =>
      b.classList.toggle("active", b.dataset.tab === tabId));
    document.querySelectorAll(".panel").forEach(p => {
      const hit = p.id === "panel-" + tabId;
      if (hit && !p.classList.contains("active")) {
        p.classList.add("active");
        p.style.animation = "none"; p.offsetHeight; p.style.animation = "";
        if (tabId === "projects") setTimeout(initProjectDropdown, 30);
      } else if (!hit) {
        p.classList.remove("active");
      }
    });
    try { sessionStorage.setItem("activeTab", tabId); } catch (_) {}
  }

  /* ─────────────────────────────────────────────
     PANELS
  ───────────────────────────────────────────── */
  function renderPanels() {
    const c = document.getElementById("panelContainer");
    c.innerHTML = "";
    const builders = {
      about: buildAbout, education: buildEducation,
      experience: buildExperience, projects: buildProjects,
      skills: buildSkills, publications: buildPublications,
      contact: buildContact,
    };
    TABS.forEach(({ id }) => {
      const div = document.createElement("div");
      div.className = "panel"; div.id = "panel-" + id;
      div.setAttribute("role", "tabpanel");
      div.innerHTML = builders[id]();
      c.appendChild(div);
    });
  }

  /* ─── ABOUT — scrollable inner wrapper ─── */
  function buildAbout() {
    const { about } = portfolioData;
    const bio = about.bio.map(p => `<p>${e(p)}</p>`).join("");
    const stats = about.stats.map(({ value, label }) =>
      `<div class="stat-card">
         <div class="stat-value">${e(value)}</div>
         <div class="stat-label">${e(label)}</div>
       </div>`
    ).join("");
    return `
      <div class="ph-eyebrow">Introduction</div>
      <h2 class="ph-heading">${e(about.greeting)}</h2>
      <div class="about-scroll">
        <div class="about-bio">${bio}</div>
        <div class="stats-row">${stats}</div>
      </div>`;
  }

  /* ─── EDUCATION ─── */
  function buildEducation() {
    const items = portfolioData.education.map(({ degree, school, website, year, description, gpa }) =>
      `<div class="timeline-item">
        <div class="tl-dot"></div>
        <div class="tl-card">
          <div class="tl-header">
            <div class="tl-title">${e(degree)}</div>
            <div class="tl-year">${e(year)}</div>
          </div>
          <div class="tl-entity-row">
            ${nameLink(school, website || null, "tl-school")}
          </div>
          <p class="tl-desc">${e(description)}</p>
          ${gpa ? `<div class="tl-gpa">GPA: ${e(gpa)}</div>` : ""}
        </div>
      </div>`
    ).join("");
    return `<div class="ph-eyebrow">Academic Background</div>
            <h2 class="ph-heading">Education</h2>
            <div class="timeline">${items}</div>`;
  }

  /* ─── EXPERIENCE — timeline with expandable highlights ─── */
  function buildExperience() {
    const items = portfolioData.experience.map(({ title, company, website, period, location, highlights }, idx) => {
      const hlItems = highlights.map(h => `<li>${e(h)}</li>`).join("");
      const locationHTML = location
        ? `<span class="tl-location"><i class="ph ph-map-pin"></i>${e(location)}</span>`
        : "";

      return `
        <div class="timeline-item">
          <div class="tl-dot"></div>
          <div class="tl-card">
            <div class="tl-header">
              <div class="tl-title">${e(title)}</div>
              <div class="tl-year">${e(period)}</div>
            </div>
            <div class="tl-entity-row">
              ${nameLink(company, website || null, "tl-school")}
              ${locationHTML}
              <button class="exp-toggle" data-exp="${idx}" aria-expanded="false" style="margin-left:auto">
                Show more <i class="ph ph-caret-down"></i>
              </button>
            </div>
            <div class="exp-highlights-wrap" id="exp-hl-${idx}">
              <ul class="highlight-list">${hlItems}</ul>
            </div>
          </div>
        </div>`;
    }).join("");

    return `<div class="ph-eyebrow">Work History</div>
            <h2 class="ph-heading">Experience</h2>
            <div class="timeline">${items}</div>`;
  }

  /* ─── PROJECTS — dropdown inside list ─── */
  function buildProjects() {
    const projs = portfolioData.projects;
    const allTags = [...new Set(projs.flatMap(p => p.tags))];
    const options = ["All", ...allTags].map((t, i) =>
      `<option value="${e(t)}"${i === 0 ? " selected" : ""}>${e(t)}</option>`
    ).join("");

    const listItems = projs.map((p, i) =>
      `<div class="md-item${i === 0 ? " selected" : ""}"
            data-idx="${i}"
            data-tags='${JSON.stringify(p.tags)}'
            tabindex="0">
        <div class="proj-item-name">${e(p.name)}</div>
        <div class="proj-item-tagline">${e(p.tagline)}</div>
      </div>`
    ).join("");

    return `<div class="ph-eyebrow">Selected Work</div>
            <h2 class="ph-heading">Projects</h2>
            <div class="md-layout two-col">
              <div class="md-list" id="projList">
                <div class="proj-filter-sticky">
                  <select class="proj-filter-select" id="projFilterSelect">${options}</select>
                </div>
                ${listItems}
              </div>
              <div class="md-detail" id="projDetail">${projDetailHTML(projs[0])}</div>
            </div>`;
  }

  function projDetailHTML({ name, tagline, description, tags, links, image }) {
    const tagsHTML = tags.map(t => `<span class="proj-tag">${e(t)}</span>`).join("");
    const linkBtns = [
      links.live   ? `<a href="${e(links.live)}"   target="_blank" rel="noopener" class="proj-link"><i class="ph ph-arrow-square-out"></i>Live Demo</a>`   : "",
      links.github ? `<a href="${e(links.github)}" target="_blank" rel="noopener" class="proj-link"><i class="ph ph-github-logo"></i>Source Code</a>` : "",
    ].filter(Boolean).join("");
    const imgHTML = image
      ? `<img class="proj-detail-img" src="${e(image)}" alt="${e(name)}" loading="lazy" />`
      : "";

    return `
      <div class="proj-detail-header">
        <div class="proj-detail-text">
          <div class="proj-detail-name">${e(name)}</div>
          <div class="proj-detail-line">${e(tagline)}</div>
        </div>
        ${imgHTML}
      </div>
      <p class="proj-detail-desc">${e(description)}</p>
      <div class="proj-detail-tags">${tagsHTML}</div>
      ${linkBtns ? `<div class="proj-detail-links">${linkBtns}</div>` : ""}`;
  }

  function initProjectDropdown() {
    const select    = document.getElementById("projFilterSelect");
    const projList  = document.getElementById("projList");
    const projDetail= document.getElementById("projDetail");
    if (!select || !projList) return;

    const fresh = select.cloneNode(true);
    select.parentNode.replaceChild(fresh, select);

    fresh.addEventListener("change", () => {
      const tag = fresh.value;
      const items = projList.querySelectorAll(".md-item");
      let firstVisible = null;
      items.forEach(item => {
        const tags = JSON.parse(item.dataset.tags || "[]");
        const show = tag === "All" || tags.includes(tag);
        item.style.display = show ? "" : "none";
        if (show && !firstVisible) firstVisible = item;
      });
      if (firstVisible) {
        items.forEach(i => i.classList.remove("selected"));
        firstVisible.classList.add("selected");
        swapDetail(projDetail, projDetailHTML(portfolioData.projects[parseInt(firstVisible.dataset.idx, 10)]));
      }
    });

    projList.addEventListener("click", ev => {
      const item = ev.target.closest(".md-item");
      if (!item) return;
      projList.querySelectorAll(".md-item").forEach(i => i.classList.remove("selected"));
      item.classList.add("selected");
      swapDetail(projDetail, projDetailHTML(portfolioData.projects[parseInt(item.dataset.idx, 10)]));
    });

    projList.addEventListener("keydown", ev => {
      if (ev.key === "Enter" || ev.key === " ") ev.target.click();
    });
  }

  function swapDetail(pane, html) {
    pane.innerHTML = html;
    pane.classList.remove("entering"); pane.offsetHeight; pane.classList.add("entering");
  }

  /* ─── SKILLS — scrollable data-rail bands ─── */
  function buildSkills() {
    const bands = portfolioData.skills.map(({ category, color, items }) => `
      <div class="skill-band" style="--cat-color:${color}">
        <div class="skill-band-label">
          <span class="skill-band-name">${e(category)}</span>
        </div>
        <div class="skill-band-chips">
          ${items.map(s => `<span class="skill-chip">${e(s)}</span>`).join("")}
        </div>
      </div>`
    ).join("");

    return `<div class="ph-eyebrow">Technical Proficiency</div>
            <h2 class="ph-heading">Skills</h2>
            <div class="skills-bands">${bands}</div>`;
  }

  /* ─── PUBLICATIONS — with authors ─── */
  function buildPublications() {
    const items = portfolioData.publications.map(({ title, venue, venueLink, authors, highlightAuthor, abstract, links, citations, tags }, idx) => {
      const pdfBtn = links.pdf
        ? `<a href="${e(links.pdf)}" target="_blank" rel="noopener" class="pub-link"><i class="ph ph-file-pdf"></i>PDF</a>` : "";
      const doiBtn = links.doi
        ? `<a href="${e(links.doi)}" target="_blank" rel="noopener" class="pub-link"><i class="ph ph-link"></i>DOI</a>` : "";
      const citeSpan = citations != null
        ? `<span class="pub-link" style="cursor:default"><i class="ph ph-quotes"></i>${citations} citations</span>` : "";
      const tagsHTML = (tags || []).map(t => `<span class="pub-tag">${e(t)}</span>`).join("");

      const venueHTML = venueLink
        ? `<a href="${e(venueLink)}" target="_blank" rel="noopener" class="pub-venue">${e(venue)}</a>`
        : `<span class="pub-venue">${e(venue)}</span>`;

      const authorsHTML = authors && authors.length
        ? `<div class="pub-authors">${authors.map(a =>
            a === highlightAuthor
              ? `<strong style="color:var(--text-2);font-weight:600">${e(a)}</strong>`
              : e(a)
          ).join(", ")}</div>`
        : "";

      return `
        <div class="pub-item">
          <div class="pub-dot"></div>
          <div class="pub-card">
            <div class="pub-title">${e(title)}</div>
            ${authorsHTML}
            ${venueHTML}
            <div class="pub-footer">
              <div class="pub-footer-links">
                ${pdfBtn}${doiBtn}${citeSpan}
                ${abstract ? `
                  <button class="abstract-toggle" data-pub="${idx}" aria-expanded="false">
                    Abstract <i class="ph ph-caret-down"></i>
                  </button>` : ""}
              </div>
              <div class="pub-footer-tags">${tagsHTML}</div>
            </div>
            ${abstract ? `
              <div class="pub-abstract-wrap" id="pub-abstract-${idx}">
                <div class="pub-abstract">${e(abstract)}</div>
              </div>` : ""}
          </div>
        </div>`;
    }).join("");

    return `<div class="ph-eyebrow">Research & Writing</div>
            <h2 class="ph-heading">Publications</h2>
            <div class="pub-timeline">${items}</div>`;
  }

  /* ─── CONTACT ─── */
  function buildContact() {
    const { contact } = portfolioData;
    const showForm = contact.form === true;

    const socials = contact.socials.map(({ label, href, icon }) =>
      `<a href="${e(href)}" target="_blank" rel="noopener" class="contact-social">
         <i class="ph ${e(icon)}"></i>${e(label)}</a>`
    ).join("");

    /* Info rows (left) + social buttons (right) in a horizontal card */
    const infoCard = `
      <div class="contact-info-card">
        <div class="contact-info-fields">
          <div class="contact-field">
            <div class="ci-label">Email</div>
            <a href="mailto:${e(contact.email)}" class="ci-value ci-link">${e(contact.email)}</a>
          </div>
          <div class="contact-field">
            <div class="ci-label">Availability</div>
            <div class="ci-value">${e(contact.availability)}</div>
          </div>
          <div class="contact-field">
            <div class="ci-label">Response Time</div>
            <div class="ci-value">${e(contact.responseTime)}</div>
          </div>
        </div>
        <div class="contact-socials-col">
          ${socials}
        </div>
      </div>`;

    const formBlock = showForm ? `
      <div class="contact-form-wrap">
        <form class="contact-form" id="contactForm" onsubmit="return false;">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="cf-name">Name</label>
              <input id="cf-name" class="form-input" type="text" placeholder="Jane Smith" />
            </div>
            <div class="form-group">
              <label class="form-label" for="cf-email">Email</label>
              <input id="cf-email" class="form-input" type="email" placeholder="jane@example.com" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="cf-msg">Message</label>
            <textarea id="cf-msg" class="form-textarea" placeholder="Tell me about your project…"></textarea>
          </div>
          <button type="submit" class="form-submit" id="formSubmit">
            <i class="ph ph-paper-plane-tilt"></i>Send Message
          </button>
        </form>
      </div>` : "";

    return `
      <div class="ph-eyebrow">Get In Touch</div>
      <h2 class="ph-heading">Contact Me</h2>
      <p class="contact-intro">${e(contact.intro)}</p>
      ${infoCard}
      ${formBlock}`;
  }

  /* ─────────────────────────────────────────────
     WIRE
  ───────────────────────────────────────────── */
  function wireAll() {
    initProjectDropdown();
    wireContactForm();
  }

  function wireDelegatedToggles() {
    const container = document.getElementById("panelContainer");
    if (!container) return;

    container.addEventListener("click", ev => {
      /* Abstract toggle */
      const absBtn = ev.target.closest(".abstract-toggle");
      if (absBtn) {
        const idx  = absBtn.dataset.pub;
        const wrap = document.getElementById("pub-abstract-" + idx);
        if (!wrap) return;
        const open = !wrap.classList.contains("open");
        wrap.classList.toggle("open", open);
        absBtn.classList.toggle("open", open);
        absBtn.setAttribute("aria-expanded", String(open));
        absBtn.innerHTML = open
          ? `Hide <i class="ph ph-caret-down"></i>`
          : `Abstract <i class="ph ph-caret-down"></i>`;
        return;
      }

      /* Experience highlights toggle */
      const expBtn = ev.target.closest(".exp-toggle");
      if (expBtn) {
        const idx  = expBtn.dataset.exp;
        const wrap = document.getElementById("exp-hl-" + idx);
        if (!wrap) return;
        const open = !wrap.classList.contains("open");
        wrap.classList.toggle("open", open);
        expBtn.classList.toggle("open", open);
        expBtn.setAttribute("aria-expanded", String(open));
        expBtn.innerHTML = open
          ? `Show less <i class="ph ph-caret-down"></i>`
          : `Show more <i class="ph ph-caret-down"></i>`;
        return;
      }
    });
  }

  function wireContactForm() {
    const form = document.getElementById("contactForm");
    const btn  = document.getElementById("formSubmit");
    if (!form || !btn) return;
    form.addEventListener("submit", () => {
      btn.innerHTML = `<i class="ph ph-check"></i>Sent!`;
      btn.style.opacity = "0.7"; btn.style.pointerEvents = "none";
      setTimeout(() => {
        btn.innerHTML = `<i class="ph ph-paper-plane-tilt"></i>Send Message`;
        btn.style.opacity = ""; btn.style.pointerEvents = "";
        form.reset();
      }, 2600);
    });
  }

  /* ─────────────────────────────────────────────
     CIRCULAR FAVICON — draws avatar on canvas with circle clip
  ───────────────────────────────────────────── */
  function setCircularFavicon(src) {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      ctx.clearRect(0, 0, size, size);
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, size, size);
      const link = document.getElementById("favicon");
      if (link) link.href = canvas.toDataURL("image/png");
    };
    img.src = src;
  }
  function initTheme() {
    let saved = "dark";
    try { saved = localStorage.getItem("theme") || "dark"; } catch (_) {}
    applyTheme(saved);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = document.getElementById("themeIcon");
    if (icon) icon.className = theme === "dark" ? "ph ph-sun" : "ph ph-moon";
    try { localStorage.setItem("theme", theme); } catch (_) {}
  }

  function toggleTheme() {
    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  }

  /* ─────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────── */
  function init() {
    renderSidebar();
    renderNav();
    renderPanels();
    initTheme();

    let start = "about";
    try { start = sessionStorage.getItem("activeTab") || "about"; } catch (_) {}
    if (!TABS.find(t => t.id === start)) start = TABS[0].id;
    switchTab(start);

    requestAnimationFrame(() => {
      wireAll();
      wireDelegatedToggles();
    });

    /* Set circular favicon from the same avatar URL used in the sidebar */
    setCircularFavicon(portfolioData.profile.avatar);

    document.getElementById("tabNav").addEventListener("click", () => {
      requestAnimationFrame(() => wireAll());
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();