const API_LATEST  = 'https://prices.runescape.wiki/api/v1/osrs/latest';
const API_VOLUMES = 'https://prices.runescape.wiki/api/v1/osrs/volumes';

let _state = { prices: {}, volumes: {} };
const _subscribers = new Set();

export function getState() {
  return _state;
}

export function subscribe(fn) {
  _subscribers.add(fn);
  return () => _subscribers.delete(fn);
}

// Starts the first fetch and the 60-second auto-refresh interval.
// Returns { refresh } to allow manual refresh with countdown reset.
export function initApi(ui) {
  let secondsLeft = 60;

  const tick = setInterval(() => {
    secondsLeft--;
    ui.setCountdown(secondsLeft);
    if (secondsLeft <= 0) {
      secondsLeft = 60;
      fetchPrices(ui);
    }
  }, 1000);

  async function fetchPrices(ui) {
    ui.setStatus('Fetching prices\u2026', 'loading');
    try {
      const [priceRes, volRes] = await Promise.all([
        fetch(API_LATEST),
        fetch(API_VOLUMES),
      ]);
      if (!priceRes.ok) throw new Error(`HTTP ${priceRes.status}`);
      if (!volRes.ok)   throw new Error(`HTTP ${volRes.status}`);

      const [priceJson, volJson] = await Promise.all([priceRes.json(), volRes.json()]);

      const prices = {};
      for (const [k, v] of Object.entries(priceJson.data)) prices[+k] = v;

      const volumes = {};
      for (const [k, v] of Object.entries(volJson.data)) volumes[+k] = v;

      _state = { prices, volumes };
      _subscribers.forEach(fn => fn(_state));
      ui.setStatus(`Updated ${new Date().toLocaleTimeString()}`, '');
    } catch (e) {
      ui.setStatus(`Error: ${e.message}`, 'error');
      console.error(e);
    }
  }

  fetchPrices(ui);

  return {
    refresh() {
      secondsLeft = 60;
      fetchPrices(ui);
    },
  };
}
