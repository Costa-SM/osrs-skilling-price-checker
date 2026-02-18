import { GEM_RECIPES, LEATHER_RECIPES, JEWELLERY_RECIPES, DHIDE_RECIPES, GLASS_RECIPES, MOLTEN_GLASS_ID } from './data.js';
import { fmtGP, volCell, profitCell, gpxpCell } from '../../formatters.js';

// Internal UI state — persists across price updates
let activeTab      = 'gems';
let jewelleryMetal = 'all';   // 'all' | 'gold' | 'silver'
let dhideColour    = 'all';   // 'all' | 'Green' | 'Blue' | 'Red' | 'Black'
let dhideSort      = 'level'; // 'level' | 'gpxp'

let _state = { prices: {}, volumes: {} };

export function render(container, state) {
  _state = state;
  container.innerHTML = buildShell();
  wireEvents(container);
  syncState(container);
  renderGems(container, state);
  renderJewellery(container, state);
  renderDhide(container, state);
  renderLeather(container, state);
  renderGlass(container, state);
}

// ── Shell HTML ───────────────────────────────────────────────────────────────

function buildShell() {
  return `
<div class="tabs">
  <button class="tab" data-tab="gems">&#128142; Gems</button>
  <button class="tab" data-tab="jewellery">&#128141; Jewellery</button>
  <button class="tab" data-tab="dhide">&#129422; D\'hide</button>
  <button class="tab" data-tab="leather">&#129682; Leather</button>
  <button class="tab" data-tab="glass">&#129695; Glass</button>
</div>

<!-- Gems -->
<div id="tab-gems" class="tab-panel">
  <div class="scroll">
    <table>
      <thead><tr>
        <th>Gem</th>
        <th class="r">Lvl</th>
        <th class="r">XP</th>
        <th class="r">Uncut Price</th>
        <th class="r">Cut Price</th>
        <th class="r">Daily Volume</th>
        <th class="r">Profit</th>
        <th class="r">GP / XP</th>
      </tr></thead>
      <tbody id="gems-body"></tbody>
    </table>
  </div>
</div>

<!-- Jewellery -->
<div id="tab-jewellery" class="tab-panel">
  <div class="controls">
    <div class="ctrl-group">
      <span class="ctrl-label">Metal:</span>
      <button class="cbtn" data-jmetal="all">All</button>
      <button class="cbtn" data-jmetal="gold">Gold</button>
      <button class="cbtn" data-jmetal="silver">Silver <span class="badge members-badge">P2P</span></button>
    </div>
  </div>
  <div class="scroll">
    <table>
      <thead><tr>
        <th>Item</th>
        <th class="r">Lvl</th>
        <th class="r">XP</th>
        <th>Inputs</th>
        <th class="r">Input Cost</th>
        <th class="r">Sell Price</th>
        <th class="r">Daily Volume</th>
        <th class="r">Profit</th>
        <th class="r">GP / XP</th>
      </tr></thead>
      <tbody id="jewellery-body"></tbody>
    </table>
  </div>
</div>

<!-- D'hide -->
<div id="tab-dhide" class="tab-panel">
  <div class="controls">
    <div class="ctrl-group">
      <span class="ctrl-label">Colour:</span>
      <button class="cbtn" data-dcolour="all">All</button>
      <button class="cbtn" data-dcolour="Green">Green</button>
      <button class="cbtn" data-dcolour="Blue">Blue</button>
      <button class="cbtn" data-dcolour="Red">Red</button>
      <button class="cbtn" data-dcolour="Black">Black</button>
    </div>
    <div class="ctrl-group">
      <span class="ctrl-label">Sort:</span>
      <button class="cbtn" data-dsort="level">Level &#9660;</button>
      <button class="cbtn" data-dsort="gpxp">GP / XP &#9650;</button>
    </div>
  </div>
  <div class="scroll">
    <table>
      <thead><tr>
        <th>Item</th>
        <th>Colour</th>
        <th class="r">Lvl</th>
        <th class="r">XP</th>
        <th class="r">Hides</th>
        <th class="r">Hide Cost</th>
        <th class="r">Sell Price</th>
        <th class="r">Daily Volume</th>
        <th class="r">Profit</th>
        <th class="r">GP / XP</th>
      </tr></thead>
      <tbody id="dhide-body"></tbody>
    </table>
  </div>
</div>

<!-- Leather -->
<div id="tab-leather" class="tab-panel">
  <div class="scroll">
    <table>
      <thead><tr>
        <th>Item</th>
        <th class="r">Lvl</th>
        <th class="r">XP</th>
        <th>Input</th>
        <th class="r">Input Cost</th>
        <th class="r">Sell Price</th>
        <th class="r">Daily Volume</th>
        <th class="r">Profit</th>
        <th class="r">GP / XP</th>
      </tr></thead>
      <tbody id="leather-body"></tbody>
    </table>
  </div>
</div>

<!-- Glass -->
<div id="tab-glass" class="tab-panel">
  <div class="scroll">
    <table>
      <thead><tr>
        <th>Item</th>
        <th class="r">Lvl</th>
        <th class="r">XP</th>
        <th class="r">Glass Cost</th>
        <th class="r">Sell Price</th>
        <th class="r">Daily Volume</th>
        <th class="r">Profit</th>
        <th class="r">GP / XP</th>
      </tr></thead>
      <tbody id="glass-body"></tbody>
    </table>
  </div>
</div>`;
}

// ── Event wiring ─────────────────────────────────────────────────────────────

function wireEvents(container) {
  container.querySelectorAll('.tab[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      syncState(container);
    });
  });

  container.querySelectorAll('.cbtn[data-jmetal]').forEach(btn => {
    btn.addEventListener('click', () => {
      jewelleryMetal = btn.dataset.jmetal;
      container.querySelectorAll('.cbtn[data-jmetal]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderJewellery(container, _state);
    });
  });

  container.querySelectorAll('.cbtn[data-dcolour]').forEach(btn => {
    btn.addEventListener('click', () => {
      dhideColour = btn.dataset.dcolour;
      container.querySelectorAll('.cbtn[data-dcolour]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDhide(container, _state);
    });
  });

  container.querySelectorAll('.cbtn[data-dsort]').forEach(btn => {
    btn.addEventListener('click', () => {
      dhideSort = btn.dataset.dsort;
      container.querySelectorAll('.cbtn[data-dsort]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderDhide(container, _state);
    });
  });
}

function syncState(container) {
  container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  container.querySelectorAll('.tab[data-tab]').forEach(b => b.classList.remove('active'));
  container.querySelector(`#tab-${activeTab}`)?.classList.add('active');
  container.querySelector(`.tab[data-tab="${activeTab}"]`)?.classList.add('active');

  container.querySelector(`.cbtn[data-jmetal="${jewelleryMetal}"]`)?.classList.add('active');
  container.querySelector(`.cbtn[data-dcolour="${dhideColour}"]`)?.classList.add('active');
  container.querySelector(`.cbtn[data-dsort="${dhideSort}"]`)?.classList.add('active');
}

// ── Gems ─────────────────────────────────────────────────────────────────────

function renderGems(container, state) {
  const { prices, volumes } = state;
  const buyPrice  = id => prices[id]?.high ?? null;
  const sellPrice = id => prices[id]?.low  ?? null;

  const html = GEM_RECIPES.map(r => {
    const cost   = buyPrice(r.uncut.id);
    const sell   = sellPrice(r.cut.id);
    const profit = (cost != null && sell != null) ? sell - cost : null;
    const badge  = r.members ? `<span class="badge members-badge">P2P</span>` : '';

    return `<tr>
      <td><strong>${r.name}</strong>${badge}</td>
      <td class="r" style="color:var(--muted)">${r.level}</td>
      <td class="r" style="color:var(--muted)">${r.xp}</td>
      <td class="r">${fmtGP(cost)}</td>
      <td class="r">${fmtGP(sell)}</td>
      <td class="r">${volCell(r.cut.id, volumes)}</td>
      <td class="r">${profitCell(profit)}</td>
      <td class="r">${gpxpCell(profit, r.xp)}</td>
    </tr>`;
  }).join('');

  container.querySelector('#gems-body').innerHTML = html;
}

// ── Jewellery ────────────────────────────────────────────────────────────────

function renderJewellery(container, state) {
  const { prices, volumes } = state;
  const buyPrice  = id => prices[id]?.high ?? null;
  const sellPrice = id => prices[id]?.low  ?? null;

  const rows = JEWELLERY_RECIPES
    .filter(r => jewelleryMetal === 'all' || r.metal === jewelleryMetal);

  const html = rows.map(r => {
    let cost = 0;
    for (const inp of r.inputs) {
      const p = buyPrice(inp.id);
      if (p == null) { cost = null; break; }
      cost += p * inp.qty;
    }
    const sell   = sellPrice(r.outputId);
    const profit = (cost != null && sell != null) ? sell - cost : null;
    const badge  = r.members ? `<span class="badge members-badge">P2P</span>` : '';

    const inputsHtml = r.inputs.map(inp => {
      const p  = buyPrice(inp.id);
      const ea = p != null ? ` <span class="each">(${fmtGP(p)} ea)</span>` : '';
      return `<span class="qty">${inp.qty}&times;</span>${inp.name}${ea}`;
    }).join('<br>');

    return `<tr>
      <td><strong>${r.name}</strong>${badge}</td>
      <td class="r" style="color:var(--muted)">${r.level}</td>
      <td class="r" style="color:var(--muted)">${r.xp}</td>
      <td class="inputs">${inputsHtml}</td>
      <td class="r">${fmtGP(cost)}</td>
      <td class="r">${fmtGP(sell)}</td>
      <td class="r">${volCell(r.outputId, volumes)}</td>
      <td class="r">${profitCell(profit)}</td>
      <td class="r">${gpxpCell(profit, r.xp)}</td>
    </tr>`;
  }).join('');

  container.querySelector('#jewellery-body').innerHTML =
    html || `<tr><td colspan="9" style="text-align:center;padding:20px;color:var(--muted)">No items.</td></tr>`;
}

// ── D'hide ───────────────────────────────────────────────────────────────────

function renderDhide(container, state) {
  const { prices, volumes } = state;
  const buyPrice  = id => prices[id]?.high ?? null;
  const sellPrice = id => prices[id]?.low  ?? null;

  let rows = DHIDE_RECIPES
    .filter(r => dhideColour === 'all' || r.colour === dhideColour)
    .map(r => {
      const hideCost = buyPrice(r.hideId);
      const cost     = hideCost != null ? hideCost * r.hides : null;
      const sell     = sellPrice(r.outputId);
      const profit   = (cost != null && sell != null) ? sell - cost : null;
      return { ...r, cost, sell, profit };
    });

  if (dhideSort === 'gpxp') {
    rows.sort((a, b) => {
      const ka = a.profit != null ? a.profit / a.xp : -Infinity;
      const kb = b.profit != null ? b.profit / b.xp : -Infinity;
      return kb - ka;
    });
  } else {
    rows.sort((a, b) => a.level - b.level);
  }

  const html = rows.map(r => `<tr>
    <td><strong>${r.name}</strong> <span class="badge members-badge">P2P</span></td>
    <td><span class="pill pill-dhide-${r.colour}">${r.colour}</span></td>
    <td class="r" style="color:var(--muted)">${r.level}</td>
    <td class="r" style="color:var(--muted)">${r.xp}</td>
    <td class="r" style="color:var(--muted)">${r.hides}</td>
    <td class="r">${fmtGP(r.cost)}</td>
    <td class="r">${fmtGP(r.sell)}</td>
    <td class="r">${volCell(r.outputId, volumes)}</td>
    <td class="r">${profitCell(r.profit)}</td>
    <td class="r">${gpxpCell(r.profit, r.xp)}</td>
  </tr>`).join('');

  container.querySelector('#dhide-body').innerHTML =
    html || `<tr><td colspan="10" style="text-align:center;padding:20px;color:var(--muted)">No items.</td></tr>`;
}

// ── Leather ──────────────────────────────────────────────────────────────────

function renderLeather(container, state) {
  const { prices, volumes } = state;
  const buyPrice  = id => prices[id]?.high ?? null;
  const sellPrice = id => prices[id]?.low  ?? null;

  const html = LEATHER_RECIPES.map(r => {
    const cost   = buyPrice(r.input.id);
    const sell   = sellPrice(r.outputId);
    const profit = (cost != null && sell != null) ? sell - cost : null;
    const badge  = r.members ? `<span class="badge members-badge">P2P</span>` : '';

    return `<tr>
      <td><strong>${r.name}</strong>${badge}</td>
      <td class="r" style="color:var(--muted)">${r.level}</td>
      <td class="r" style="color:var(--muted)">${r.xp}</td>
      <td>${r.input.name}</td>
      <td class="r">${fmtGP(cost)}</td>
      <td class="r">${fmtGP(sell)}</td>
      <td class="r">${volCell(r.outputId, volumes)}</td>
      <td class="r">${profitCell(profit)}</td>
      <td class="r">${gpxpCell(profit, r.xp)}</td>
    </tr>`;
  }).join('');

  container.querySelector('#leather-body').innerHTML = html;
}

// ── Glass blowing ─────────────────────────────────────────────────────────────

function renderGlass(container, state) {
  const { prices, volumes } = state;
  const buyPrice  = id => prices[id]?.high ?? null;
  const sellPrice = id => prices[id]?.low  ?? null;

  const glassCost = buyPrice(MOLTEN_GLASS_ID);

  const html = GLASS_RECIPES.map(r => {
    const sell   = sellPrice(r.outputId);
    const profit = (glassCost != null && sell != null) ? sell - glassCost : null;
    const badge  = r.members ? `<span class="badge members-badge">P2P</span>` : '';

    return `<tr>
      <td><strong>${r.name}</strong>${badge}</td>
      <td class="r" style="color:var(--muted)">${r.level}</td>
      <td class="r" style="color:var(--muted)">${r.xp}</td>
      <td class="r">${fmtGP(glassCost)}</td>
      <td class="r">${fmtGP(sell)}</td>
      <td class="r">${volCell(r.outputId, volumes)}</td>
      <td class="r">${profitCell(profit)}</td>
      <td class="r">${gpxpCell(profit, r.xp)}</td>
    </tr>`;
  }).join('');

  container.querySelector('#glass-body').innerHTML = html;
}
