/* ═══════════════════════════════════════════════════
   DevRef Script — Merged Architecture
═══════════════════════════════════════════════════ */
(function () {
  "use strict";

  let activeToolId = 'vscode'; // Fallback if no data or first init
  let expanded = new Set();
  let searchQuery = '';

  /* ── HELPERS ─────────────────────────────────────────────────────────── */
  function esc(s) {
    return String(s ?? "")
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function hl(text, q) {
    if (!q) return esc(text);
    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return esc(text).replace(new RegExp(`(${safe})`, 'gi'), '<mark>$1</mark>');
  }

  function allCmds() {
    if (typeof TOOLS === 'undefined') return [];
    const out = [];
    TOOLS.forEach(t =>
      t.sections.forEach(s =>
        s.cmds.forEach(c => out.push({ ...c, toolId: t.id, toolName: t.name, toolIcon: t.icon }))
      )
    );
    return out;
  }

  function renderKeys(str) {
    if (!str) return esc(str);
    return str.split(' / ').map(alt => {
      return alt.split(/ then /i).map((part, i, arr) => {
        let chord = part;
        if (!part.includes('+') && part.includes(' ')) {
          chord = part.split(' ').map(k => `<kbd>${esc(k)}</kbd>`).join(' ');
        } else {
          chord = part.split('+').map(k => `<kbd>${esc(k)}</kbd>`).join('<span class="key-plus">+</span>');
        }
        return i < arr.length - 1 ? chord + ' <span class="key-then">then</span> ' : chord;
      }).join('');
    }).join('<span class="key-sep">/</span>');
  }

  function renderSyntax(syntax) {
    if (!syntax) return '';
    
    // 1. First, HTML-escape the raw string so <user> becomes &lt;user&gt;
    const safeSyntax = esc(syntax);
    
    // 2. Then, wrap the escaped brackets in their respective styling spans
    return safeSyntax
      // Match &lt;something&gt; for required arguments
      .replace(/(&lt;.*?&gt;)/g, '<span class="c-req">$1</span>')
      // Match [something] for optional arguments
      .replace(/(\[[^\]]+\])/g, '<span class="c-opt">$1</span>');
  }

  /* ── RENDER ROW ───────────────────────────────────────────────────────── */
  function renderRow(cmd, q) {
    const hasExpand = (cmd.args && cmd.args.length > 0) || !!cmd.example;
    const isExp = expanded.has(cmd.id);
    const copyText = cmd.example ? cmd.example.split('\n')[0].replace(/^[$#]\s*/,'') : cmd.cmd;

    let syntaxHTML = cmd.isShortcut 
      ? renderKeys(q ? hl(cmd.cmd, q) : cmd.cmd)
      : `<span class="c-cmd">${q ? hl(cmd.syntax || cmd.cmd, q) : renderSyntax(cmd.syntax || cmd.cmd)}</span>`;

    let expandHTML = '';
    if (hasExpand) {
      const argsHTML = (cmd.args && cmd.args.length)
        ? `<div class="expand-label">Arguments & Flags</div>
           <div class="args-list">${cmd.args.map(([name, type, desc, danger]) => `
             <div class="arg-row">
               <span class="arg-name ${type}">${esc(name)}</span>
               <span class="arg-desc">${q ? hl(desc, q) : esc(desc)}</span>
             </div>`).join('')}
           </div>`
        : '';

      const exHTML = cmd.example
        ? `<div class="expand-label">Example</div>
           <div class="example-block">${cmd.example.split('\n').map(line => {
               const trimmed = line.trim();
               if (trimmed.startsWith('#')) return `<span class="comment">${esc(line)}</span>`;
               if (trimmed === '') return '';
               return `<span class="prompt">$ </span>${q ? hl(line, q) : esc(line)}`;
             }).filter(l => l !== undefined).join('\n')}</div>`
        : '';

      expandHTML = `
        <div class="cmd-expand">
          <div class="cmd-expand-inner">
            <div class="expand-body">${argsHTML}${exHTML}</div>
          </div>
        </div>`;
    }

    return `
      <div class="cmd-row${hasExpand ? ' expandable' : ''}${isExp ? ' expanded' : ''}${cmd.H ? ' highlighted' : ''}" id="row-${cmd.id}">
        <div class="cmd-main">
          
          <div class="cmd-left">
            <div class="expand-arrow" style="${hasExpand ? '' : 'visibility:hidden'}">
              <i class="ph ph-caret-right"></i>
            </div>
            <div class="cmd-syntax">${syntaxHTML}</div>
          </div>
          
          <div class="cmd-middle">
            ${q ? hl(cmd.desc, q) : esc(cmd.desc)}
          </div>
          
          <div class="cmd-right">
            ${cmd.danger ? '<span class="badge-danger"><i class="ph ph-warning"></i> Danger</span>' : ''}
            <button class="copy-btn" data-copy="${esc(copyText).replace(/"/g, '&quot;')}" aria-label="Copy command">
              <i class="ph ph-copy"></i>
            </button>
          </div>
          
        </div>
        ${expandHTML}
      </div>`;
  }

  /* ── RENDER SIDEBAR ───────────────────────────────────────────────────── */
  function renderSidebar() {
    if (typeof TOOLS === 'undefined') return;
    if (!activeToolId) activeToolId = TOOLS[0].id;

    const groups = {};
    TOOLS.forEach(t => {
      if (!groups[t.group]) groups[t.group] = [];
      groups[t.group].push(t);
    });

    let html = '';
    for (const [group, tools] of Object.entries(groups)) {
      html += `<div class="group-label">${esc(group)}</div>`;
      for (const t of tools) {
        const n = t.sections.reduce((acc, s) => acc + s.cmds.length, 0);
        html += `
          <div class="tool-item${t.id === activeToolId ? ' active' : ''}" data-tool-id="${t.id}">
            <i class="ph ${esc(t.icon)} tool-icon"></i>
            <span class="tool-name">${esc(t.name)}</span>
            <span class="tool-count">${n}</span>
          </div>`;
      }
    }
    document.getElementById('sb-nav').innerHTML = html;
  }

  /* ── RENDER TOOL (MAIN CONTENT) ───────────────────────────────────────── */
  function renderTool(id) {
    if (typeof TOOLS === 'undefined') return;
    const tool = TOOLS.find(t => t.id === id);
    if (!tool) return;

    const total = tool.sections.reduce((n, s) => n + s.cmds.length, 0);
    const countEl = document.getElementById('result-count');
    countEl.textContent = `${total} cmds`;
    countEl.classList.remove('hidden');

    let html = `
      <div class="ph-eyebrow">${esc(tool.group)} Reference</div>
      <h2 class="ph-heading"><i class="ph ${esc(tool.icon)}"></i> ${esc(tool.name)}</h2>
      <p class="hero-desc">${esc(tool.desc)}</p>`;

    for (const sec of tool.sections) {
      html += `
        <div class="section">
          <div class="section-title">${esc(sec.name)}</div>
          ${sec.cmds.map(c => renderRow(c, '')).join('')}
        </div>`;
    }

    document.getElementById('content').innerHTML = html;
  }

  /* ── SEARCH ───────────────────────────────────────────────────────────── */
  function renderSearch(q) {
    const results = allCmds().filter(c => {
      const fields = [c.cmd, c.desc, c.syntax, c.example, ...(c.args || []).map(a => a[0] + ' ' + a[2])].filter(Boolean).join(' ').toLowerCase();
      return fields.includes(q.toLowerCase());
    });

    const countEl = document.getElementById('result-count');
    countEl.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;
    countEl.classList.remove('hidden');

    if (!results.length) {
      document.getElementById('content').innerHTML = `
        <div class="empty-state">
          <i class="ph ph-magnifying-glass empty-icon"></i>
          <div class="empty-title">No results for "${esc(q)}"</div>
          <div class="empty-sub">Try a different keyword or check spelling</div>
        </div>`;
      return;
    }

    const byTool = {};
    results.forEach(c => {
      if (!byTool[c.toolId]) byTool[c.toolId] = { name: c.toolName, icon: c.toolIcon, cmds: [] };
      byTool[c.toolId].cmds.push(c);
    });

    let html = `<div class="ph-eyebrow">Search Results</div>
                <h2 class="ph-heading">"${esc(q)}"</h2>`;

    for (const [, group] of Object.entries(byTool)) {
      html += `
        <div class="section">
          <div class="section-title"><i class="ph ${esc(group.icon)}"></i> ${esc(group.name)}</div>
          ${group.cmds.map(c => renderRow(c, q)).join('')}
        </div>`;
    }

    document.getElementById('content').innerHTML = html;
  }

  /* ── EVENT DELEGATION ─────────────────────────────────────────────────── */
  function toggleExpand(id, rowEl) {
    if (expanded.has(id)) {
      expanded.delete(id);
      rowEl.classList.remove('expanded');
    } else {
      expanded.add(id);
      rowEl.classList.add('expanded');
    }
  }

  function copyToClipboard(text, btn) {
    const doCopy = () => {
      btn.innerHTML = `<i class="ph ph-check"></i>`;
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = `<i class="ph ph-copy"></i>`;
        btn.classList.remove('copied');
      }, 1800);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(doCopy).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }

    function fallbackCopy() {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;top:-999px;opacity:0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); doCopy(); } catch (_) {}
      document.body.removeChild(ta);
    }
  }

  document.getElementById('content').addEventListener('click', e => {
    const copyBtn = e.target.closest('.copy-btn');
    if (copyBtn) {
      e.stopPropagation();
      copyToClipboard(copyBtn.getAttribute('data-copy'), copyBtn);
      return;
    }

    const row = e.target.closest('.cmd-row.expandable');
    if (row) {
      const id = row.id.replace('row-', '');
      toggleExpand(id, row);
    }
  });

  document.getElementById('sb-nav').addEventListener('click', e => {
    const item = e.target.closest('.tool-item');
    if (!item) return;
    const id = item.getAttribute('data-tool-id');
    if (!id || id === activeToolId) return;

    activeToolId = id;
    searchQuery = '';
    const searchInput = document.getElementById('gsearch');
    searchInput.value = '';
    document.getElementById('search-clear').classList.add('hidden');

    renderSidebar();
    renderTool(id);
    
    // Auto-close mobile sidebar on selection
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    
    // Scroll content to top
    document.querySelector('.panel.active').scrollTop = 0;
  });

  /* ── SEARCH INPUT ─────────────────────────────────────────────────────── */
  const searchInput = document.getElementById('gsearch');
  const searchClear = document.getElementById('search-clear');

  searchInput.addEventListener('input', e => {
    searchQuery = e.target.value;
    searchClear.classList.toggle('hidden', !searchQuery);

    if (searchQuery.trim()) renderSearch(searchQuery.trim());
    else renderTool(activeToolId);
    
    document.querySelector('.panel.active').scrollTop = 0;
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClear.classList.add('hidden');
    renderTool(activeToolId);
    searchInput.focus();
  });

  /* ── THEME TOGGLE ─────────────────────────────────────────────────────── */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.getElementById('themeIcon').className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
    try { localStorage.setItem('devref-theme', theme); } catch (_) {}
  }

  document.getElementById('themeToggle').addEventListener('click', () => {
    applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ── MOBILE MENU ──────────────────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  hamburger.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });

  /* ── INIT ─────────────────────────────────────────────────────────────── */
  (function init() {
    let saved = "dark";
    try { saved = localStorage.getItem("devref-theme") || "dark"; } catch (_) {}
    applyTheme(saved);

    renderSidebar();
    renderTool(activeToolId);
  })();
})();