import { SI, SMELT_RECIPES, ANVIL_RECIPES } from './data.js';
import { fmtGP, volCell, profitCell, gpxpCell } from '../../formatters.js';

// Internal tab/filter/sort state — persists across price updates
let activeTab   = 'smelting';
let anvilFilter = 'all';
let anvilSort   = 'level';

// Latest state reference for use inside button callbacks after re-render
let _state = { prices: {}, volumes: {} };

export function render(container, state) {
  _state = state;
  container.innerHTML = buildShell();
  wireEvents(container);
  syncState(container);
  renderSmelt(container, state);
  renderAnvil(container, state);
  updateNaturePrice(state);
}

// ── Shell HTML ───────────────────────────────────────────────────────────────

function buildShell() {
  return `
<div class="tabs">
  <button class="tab" data-tab="smelting">&#128293; Smelting</button>
  <button class="tab" data-tab="anvil">&#9874; Anvil Smithing</button>
</div>

<div id="tab-smelting" class="tab-panel">
  <div class="scroll">
    <table>
      <thead>
        <tr>
          <th>Bar</th>
          <th class="r">Lvl</th>
          <th class="r">Smith XP</th>
          <th>Inputs</th>
          <th class="r">Input Cost</th>
          <th class="r">Bar Sell Price</th>
          <th class="r">Daily Volume</th>
          <th class="r">Furnace Profit</th>
          <th class="r">GP / XP</th>
          <th class="r">Superheat Profit</th>
          <th class="r">GP / XP (SH)</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody id="smelt-body"></tbody>
    </table>
  </div>
</div>

<div id="tab-anvil" class="tab-panel">
  <div class="controls">
    <div class="ctrl-group">
      <span class="ctrl-label">Metal:</span>
      <button class="cbtn" data-filter="all">All</button>
      <button class="cbtn" data-filter="Bronze">Bronze</button>
      <button class="cbtn" data-filter="Iron">Iron</button>
      <button class="cbtn" data-filter="Steel">Steel</button>
      <button class="cbtn" data-filter="Mithril">Mithril</button>
      <button class="cbtn" data-filter="Adamant">Adamant</button>
      <button class="cbtn" data-filter="Rune">Rune</button>
    </div>
    <div class="ctrl-group">
      <span class="ctrl-label">Sort:</span>
      <button class="cbtn" data-sort="level">Level &#9660;</button>
      <button class="cbtn" data-sort="gpxp">GP / XP &#9650;</button>
    </div>
  </div>
  <div class="scroll">
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Metal</th>
          <th class="r">Lvl</th>
          <th class="r">Smith XP</th>
          <th class="r">Bars</th>
          <th class="r">Bar Cost</th>
          <th class="r">Sell Price</th>
          <th class="r">Daily Volume</th>
          <th class="r">Profit</th>
          <th class="r">GP / XP</th>
        </tr>
      </thead>
      <tbody id="anvil-body"></tbody>
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

  container.querySelectorAll('.cbtn[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      anvilFilter = btn.dataset.filter;
      container.querySelectorAll('.cbtn[data-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAnvil(container, _state);
    });
  });

  container.querySelectorAll('.cbtn[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => {
      anvilSort = btn.dataset.sort;
      container.querySelectorAll('.cbtn[data-sort]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderAnvil(container, _state);
    });
  });
}

// Restores tab/filter/sort active classes after a shell rebuild
function syncState(container) {
  container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  container.querySelectorAll('.tab[data-tab]').forEach(b => b.classList.remove('active'));
  const panel = container.querySelector(`#tab-${activeTab}`);
  const tabBtn = container.querySelector(`.tab[data-tab="${activeTab}"]`);
  if (panel)  panel.classList.add('active');
  if (tabBtn) tabBtn.classList.add('active');

  const filterBtn = container.querySelector(`.cbtn[data-filter="${anvilFilter}"]`);
  if (filterBtn) filterBtn.classList.add('active');

  const sortBtn = container.querySelector(`.cbtn[data-sort="${anvilSort}"]`);
  if (sortBtn) sortBtn.classList.add('active');
}

// ── Smelting table ───────────────────────────────────────────────────────────

function renderSmelt(container, state) {
  const { prices, volumes } = state;
  const buyPrice  = id => prices[id]?.high ?? null;
  const sellPrice = id => prices[id]?.low  ?? null;
  const nrp = buyPrice(SI.NATURE_RUNE.id);

  const html = SMELT_RECIPES.map(r => {
    let cost = 0;
    for (const { item, qty } of r.inputs) {
      const p = buyPrice(item.id);
      if (p == null) { cost = null; break; }
      cost += p * qty;
    }
    const sell  = sellPrice(r.output.id);
    const rate  = r.furnaceRate ?? 1;
    const furnP = (cost != null && sell != null) ? sell - cost / rate : null;
    const shP   = (cost != null && sell != null && nrp != null) ? sell - cost - nrp : null;

    const inputsHtml = r.inputs.map(({ item, qty }) => {
      const p  = buyPrice(item.id);
      const ea = p != null ? ` <span class="each">(${fmtGP(p)} ea)</span>` : '';
      return `<span class="qty">${qty}&times;</span>${item.name}${ea}`;
    }).join('<br>');

    const failNote = r.furnaceRate
      ? `<div class="sub-note">adjusted for ${r.furnaceRate * 100}% success</div>` : '';
    const shCell = r.canSH ? profitCell(shP)      : `<span class="na">N/A</span>`;
    const sxCell = r.canSH ? gpxpCell(shP, r.xp)  : `<span class="na">N/A</span>`;

    return `<tr>
      <td><strong>${r.name}</strong></td>
      <td class="r" style="color:var(--muted)">${r.level}</td>
      <td class="r" style="color:var(--muted)">${r.xp}</td>
      <td class="inputs">${inputsHtml}</td>
      <td class="r">${fmtGP(cost)}</td>
      <td class="r">${fmtGP(sell)}</td>
      <td class="r">${volCell(r.output.id, volumes)}</td>
      <td class="r">${profitCell(furnP)}${failNote}</td>
      <td class="r">${gpxpCell(furnP, r.xp)}</td>
      <td class="r">${shCell}</td>
      <td class="r">${sxCell}</td>
      <td class="note-cell">${r.note ?? ''}</td>
    </tr>`;
  }).join('');

  container.querySelector('#smelt-body').innerHTML = html;
}

// ── Anvil table ──────────────────────────────────────────────────────────────

function renderAnvil(container, state) {
  const { prices, volumes } = state;
  const buyPrice  = id => prices[id]?.high ?? null;
  const sellPrice = id => prices[id]?.low  ?? null;

  let rows = ANVIL_RECIPES
    .filter(r => anvilFilter === 'all' || r.metal === anvilFilter)
    .map(r => {
      const barCost  = buyPrice(r.barId);
      const itemSell = sellPrice(r.outputId);
      const outQty   = r.outputQty ?? 1;
      const cost     = barCost  != null ? barCost * r.bars   : null;
      const sell     = itemSell != null ? itemSell * outQty  : null;
      const profit   = (cost != null && sell != null) ? sell - cost : null;
      return { ...r, cost, sell, profit };
    });

  if (anvilSort === 'gpxp') {
    rows.sort((a, b) => {
      const ka = a.profit != null ? a.profit / a.xp : -Infinity;
      const kb = b.profit != null ? b.profit / b.xp : -Infinity;
      return kb - ka;
    });
  } else {
    rows.sort((a, b) => a.level - b.level || a.xp - b.xp);
  }

  const html = rows.map(r => {
    const noteHtml = r.outputQty
      ? `<span style="font-size:0.76rem;color:var(--muted)">&times;${r.outputQty} output</span>` : '';
    return `<tr>
      <td><strong>${r.name}</strong> ${noteHtml}</td>
      <td><span class="pill pill-${r.metal}">${r.metal}</span></td>
      <td class="r" style="color:var(--muted)">${r.level}</td>
      <td class="r" style="color:var(--muted)">${r.xp}</td>
      <td class="r" style="color:var(--muted)">${r.bars}</td>
      <td class="r">${fmtGP(r.cost)}</td>
      <td class="r">${fmtGP(r.sell)}</td>
      <td class="r">${volCell(r.outputId, volumes)}</td>
      <td class="r">${profitCell(r.profit)}</td>
      <td class="r">${gpxpCell(r.profit, r.xp)}</td>
    </tr>`;
  }).join('');

  container.querySelector('#anvil-body').innerHTML =
    html || `<tr><td colspan="10" style="text-align:center;padding:20px;color:var(--muted)">No items.</td></tr>`;
}

// ── Nature rune price in toolbar ─────────────────────────────────────────────

function updateNaturePrice(state) {
  const buyPrice = id => state.prices[id]?.high ?? null;
  const nrp = buyPrice(SI.NATURE_RUNE.id);
  const el  = document.getElementById('nature-price');
  if (el) el.textContent = nrp != null ? `Nature rune: ${fmtGP(nrp)} gp` : '';
}
