export function fmtVol(n) {
  if (n == null) return '\u2014';
  if (n >= 1e6)  return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3)  return Math.round(n / 1e3) + 'k';
  return n.toLocaleString();
}

// Volume cell: green >= 100k/day, muted >= 10k, red below
export function volCell(id, volumes) {
  const v = volumes[id];
  if (v == null) return `<span class="na">\u2014</span>`;
  const cls = v >= 100_000 ? 'vol-hi' : v >= 10_000 ? 'vol-mid' : 'vol-lo';
  return `<span class="${cls}">${fmtVol(v)}</span>`;
}

export function fmtGP(n, sign = false) {
  if (n == null) return '\u2014';
  const abs = Math.abs(n);
  const s   = sign ? (n > 0 ? '+' : n < 0 ? '-' : '') : (n < 0 ? '-' : '');
  if (abs >= 1e6) return s + (abs / 1e6).toFixed(2) + 'M';
  if (abs >= 1e3) return s + (abs / 1e3).toFixed(1) + 'k';
  return s + abs.toLocaleString();
}

export function profitCell(val) {
  if (val == null) return `<span class="na">\u2014</span>`;
  const cls   = val > 0 ? 'pos' : 'neg';
  const badge = val > 0
    ? `<span class="badge bp">PROFIT</span>`
    : `<span class="badge bl">LOSS</span>`;
  return `<span class="${cls}">${fmtGP(val, true)}</span>${badge}`;
}

export function gpxpCell(profit, xp) {
  if (profit == null) return `<span class="na">\u2014</span>`;
  if (profit >= 0)    return `<span class="pos">Paid to train</span>`;
  return `<span class="neg">${(-profit / xp).toFixed(1)} gp/xp</span>`;
}
