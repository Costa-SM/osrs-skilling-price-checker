import './style.css';
import { initApi, getState, subscribe } from './api.js';
import { initUi } from './ui.js';
import { initRouter } from './router.js';
import smithing from './skills/smithing/index.js';

const skills = [smithing];

// ui must be created before api so the api can call setStatus/setCountdown
const api = initApi(
  initUi(() => api.refresh())
);

const { render } = initRouter(skills, getState);

// Re-render the active skill whenever prices update
subscribe(state => render(state));
