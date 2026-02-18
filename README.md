# OSRS GE Profit Tracker

A live Grand Exchange profit tracker for Old School RuneScape, built with Vite and vanilla JS.

**Live site:** https://costa-sm.github.io/osrs-skilling-price-checker/

---

## Features

- **Smithing — Smelting:** Furnace profit and Superheat Item profit/loss for every bar, including the Iron bar 50% success rate adjustment
- **Smithing — Anvil:** Profit/loss and GP/XP for all F2P smithable items; filter by metal tier, sort by level or GP/XP
- Prices fetched live from the [OSRS Wiki GE API](https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices) and auto-refreshed every 60 seconds
- Inputs priced at the **high (buy) price**; outputs at the **low (sell) price** — worst-case instant-transaction profit

---

## Running locally

```bash
npm install
npm run dev        # dev server at http://localhost:5173
npm run build      # production build → dist/
npm run preview    # preview the production build locally
```

---

## Project structure

```
osrs_price_tracker/
├── index.html                      # Shell: header, nav, toolbar, <main id="app">
├── vite.config.js                  # base path for GitHub Pages
├── package.json
└── src/
    ├── main.js                     # Bootstrap: wires api + ui + router + skills
    ├── api.js                      # Fetch prices/volumes; observable store
    ├── router.js                   # Hash router; dispatches to active skill.render()
    ├── ui.js                       # Status span, countdown, refresh button
    ├── formatters.js               # Pure helpers: fmtGP, fmtVol, profitCell, etc.
    ├── style.css
    └── skills/
        └── smithing/
            ├── index.js            # Skill manifest { id, label, icon, render }
            ├── data.js             # SI items, SMELT_RECIPES, ANVIL_RECIPES
            └── render.js           # Renders smelting + anvil tables
```

## Adding a new skill

1. Create `src/skills/<skill>/data.js` — item/recipe data
2. Create `src/skills/<skill>/render.js` — `render(container, state)` function
3. Create `src/skills/<skill>/index.js` — manifest: `{ id, label, icon, render }`
4. In `src/main.js`, add one import and one entry to the `skills` array

The nav link appears automatically. No router, API, or CSS changes needed.

---

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the workflow in `.github/workflows/deploy.yml`.

**One-time repo setup:** Settings → Pages → Source → **GitHub Actions**

## Data sources

Prices: [OSRS Wiki Real-time Prices API](https://oldschool.runescape.wiki/w/RuneScape:Real-time_Prices)
Smithing XP and recipe data: [OSRS Wiki — Smithing](https://oldschool.runescape.wiki/w/Smithing)
