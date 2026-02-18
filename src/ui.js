// Wires DOM elements for status, countdown, and the refresh button.
// Returns { setStatus, setCountdown } for api.js to call.
export function initUi(onRefresh) {
  const statusEl    = document.getElementById('status');
  const countdownEl = document.getElementById('countdown');
  const refreshBtn  = document.getElementById('refresh-btn');

  refreshBtn.addEventListener('click', onRefresh);

  return {
    setStatus(text, className) {
      statusEl.textContent = text;
      statusEl.className   = className;
    },
    setCountdown(seconds) {
      countdownEl.textContent = `Next refresh in ${seconds}s`;
    },
  };
}
