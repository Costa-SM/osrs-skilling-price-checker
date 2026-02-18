// ── Gem cutting ──────────────────────────────────────────────────────────────
// Tool: chisel. 1 uncut gem → 1 cut gem.
// Note: low-level players may accidentally crush gems; profit assumes 100% success.
export const GEM_RECIPES = [
  { name: 'Opal',        level:  1, xp:  15.0, members: true,
    uncut: { id: 1625, name: 'Uncut opal'        }, cut: { id: 1609, name: 'Opal'        } },
  { name: 'Jade',        level: 13, xp:  20.0, members: true,
    uncut: { id: 1627, name: 'Uncut jade'        }, cut: { id: 1611, name: 'Jade'        } },
  { name: 'Red topaz',   level: 16, xp:  25.0, members: true,
    uncut: { id: 1629, name: 'Uncut red topaz'   }, cut: { id: 1613, name: 'Red topaz'   } },
  { name: 'Sapphire',    level: 20, xp:  50.0,
    uncut: { id: 1623, name: 'Uncut sapphire'    }, cut: { id: 1607, name: 'Sapphire'    } },
  { name: 'Emerald',     level: 27, xp:  67.5,
    uncut: { id: 1621, name: 'Uncut emerald'     }, cut: { id: 1605, name: 'Emerald'     } },
  { name: 'Ruby',        level: 34, xp:  85.0,
    uncut: { id: 1619, name: 'Uncut ruby'        }, cut: { id: 1603, name: 'Ruby'        } },
  { name: 'Diamond',     level: 43, xp: 107.5,
    uncut: { id: 1617, name: 'Uncut diamond'     }, cut: { id: 1601, name: 'Diamond'     } },
  { name: 'Dragonstone', level: 55, xp: 137.5, members: true,
    uncut: { id: 1631, name: 'Uncut dragonstone' }, cut: { id: 1615, name: 'Dragonstone' } },
];

// ── Leather crafting ─────────────────────────────────────────────────────────
// Tool: needle + thread. Input bought directly from the GE (already tanned).
export const LEATHER_RECIPES = [
  { name: 'Leather gloves',    level:  1, xp:  13.8, input: { id: 1741, name: 'Leather'      }, outputId: 1059 },
  { name: 'Leather boots',     level:  7, xp:  16.3, input: { id: 1741, name: 'Leather'      }, outputId: 1061 },
  { name: 'Leather cowl',      level:  9, xp:  18.5, input: { id: 1741, name: 'Leather'      }, outputId: 1167 },
  { name: 'Leather vambraces', level: 11, xp:  22.0, input: { id: 1741, name: 'Leather'      }, outputId: 1063 },
  { name: 'Leather body',      level: 14, xp:  25.0, input: { id: 1741, name: 'Leather'      }, outputId: 1129 },
  { name: 'Leather chaps',     level: 18, xp:  27.0, input: { id: 1741, name: 'Leather'      }, outputId: 1095 },
  { name: 'Hardleather body',  level: 28, xp:  35.0, input: { id: 1743, name: 'Hard leather' }, outputId: 1131 },
  { name: 'Coif',              level: 38, xp:  37.0, input: { id: 1741, name: 'Leather'      }, outputId: 1169, members: true },
];

// ── Jewellery ────────────────────────────────────────────────────────────────
// Tool: furnace + appropriate mould.
// Inputs use buy (high) price; output uses sell (low) price.
// metal: 'gold' = F2P (except dragonstone gem); 'silver' = P2P (members gems only)
const GOLD   = { id: 2357, name: 'Gold bar'    };
const SILVER = { id: 2355, name: 'Silver bar'  };
const WOOL   = { id: 1759, name: 'Ball of wool' };

export const JEWELLERY_RECIPES = [
  // ── Unset gold (F2P) ────────────────────────────────────────────────────────
  { name: 'Gold ring',          level:  5, xp:  15, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }], outputId: 1635 },
  { name: 'Gold necklace',      level:  6, xp:  20, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }], outputId: 1654 },
  { name: 'Gold bracelet',      level:  7, xp:  25, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }], outputId: 11069 },
  { name: 'Gold amulet (u)',    level:  8, xp:  30, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }], outputId: 1673 },
  { name: 'Gold amulet',        level:  8, xp:  34, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { ...WOOL, qty: 1 }], outputId: 1692 },

  // ── Sapphire gold (F2P) ─────────────────────────────────────────────────────
  { name: 'Sapphire ring',       level: 20, xp:  40, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1607, name: 'Sapphire', qty: 1 }], outputId: 1637 },
  { name: 'Sapphire necklace',   level: 22, xp:  55, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1607, name: 'Sapphire', qty: 1 }], outputId: 1656 },
  { name: 'Sapphire bracelet',   level: 23, xp:  60, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1607, name: 'Sapphire', qty: 1 }], outputId: 11072 },
  { name: 'Sapphire amulet (u)', level: 24, xp:  65, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1607, name: 'Sapphire', qty: 1 }], outputId: 1675 },
  { name: 'Sapphire amulet',     level: 24, xp:  69, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1607, name: 'Sapphire', qty: 1 }, { ...WOOL, qty: 1 }], outputId: 1694 },

  // ── Emerald gold (F2P) ──────────────────────────────────────────────────────
  { name: 'Emerald ring',        level: 27, xp:  55, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1605, name: 'Emerald', qty: 1 }], outputId: 1639 },
  { name: 'Emerald necklace',    level: 29, xp:  60, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1605, name: 'Emerald', qty: 1 }], outputId: 1658 },
  { name: 'Emerald bracelet',    level: 30, xp:  65, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1605, name: 'Emerald', qty: 1 }], outputId: 11076 },
  { name: 'Emerald amulet (u)',  level: 31, xp:  70, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1605, name: 'Emerald', qty: 1 }], outputId: 1677 },
  { name: 'Emerald amulet',      level: 31, xp:  74, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1605, name: 'Emerald', qty: 1 }, { ...WOOL, qty: 1 }], outputId: 1696 },

  // ── Ruby gold (F2P) ─────────────────────────────────────────────────────────
  { name: 'Ruby ring',           level: 34, xp:  70, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1603, name: 'Ruby', qty: 1 }], outputId: 1641 },
  { name: 'Ruby necklace',       level: 40, xp:  75, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1603, name: 'Ruby', qty: 1 }], outputId: 1660 },
  { name: 'Ruby bracelet',       level: 42, xp:  80, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1603, name: 'Ruby', qty: 1 }], outputId: 11085 },
  { name: 'Ruby amulet (u)',     level: 50, xp:  85, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1603, name: 'Ruby', qty: 1 }], outputId: 1679 },
  { name: 'Ruby amulet',         level: 50, xp:  89, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1603, name: 'Ruby', qty: 1 }, { ...WOOL, qty: 1 }], outputId: 1698 },

  // ── Diamond gold (F2P) ──────────────────────────────────────────────────────
  { name: 'Diamond ring',        level: 43, xp:  85, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1601, name: 'Diamond', qty: 1 }], outputId: 1643 },
  { name: 'Diamond necklace',    level: 56, xp:  90, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1601, name: 'Diamond', qty: 1 }], outputId: 1662 },
  { name: 'Diamond bracelet',    level: 58, xp:  95, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1601, name: 'Diamond', qty: 1 }], outputId: 11092 },
  { name: 'Diamond amulet (u)',  level: 70, xp: 100, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1601, name: 'Diamond', qty: 1 }], outputId: 1681 },
  { name: 'Diamond amulet',      level: 70, xp: 104, metal: 'gold',
    inputs: [{ ...GOLD, qty: 1 }, { id: 1601, name: 'Diamond', qty: 1 }, { ...WOOL, qty: 1 }], outputId: 1700 },

  // ── Dragonstone gold (P2P) ──────────────────────────────────────────────────
  { name: 'Dragonstone ring',       level: 55, xp: 100, metal: 'gold', members: true,
    inputs: [{ ...GOLD, qty: 1 }, { id: 1615, name: 'Dragonstone', qty: 1 }], outputId: 1645 },
  { name: 'Dragon necklace',        level: 72, xp: 105, metal: 'gold', members: true,
    inputs: [{ ...GOLD, qty: 1 }, { id: 1615, name: 'Dragonstone', qty: 1 }], outputId: 1664 },
  { name: 'Dragonstone bracelet',   level: 74, xp: 110, metal: 'gold', members: true,
    inputs: [{ ...GOLD, qty: 1 }, { id: 1615, name: 'Dragonstone', qty: 1 }], outputId: 11115 },
  { name: 'Dragonstone amulet (u)', level: 80, xp: 150, metal: 'gold', members: true,
    inputs: [{ ...GOLD, qty: 1 }, { id: 1615, name: 'Dragonstone', qty: 1 }], outputId: 1683 },
  { name: 'Dragonstone amulet',     level: 80, xp: 154, metal: 'gold', members: true,
    inputs: [{ ...GOLD, qty: 1 }, { id: 1615, name: 'Dragonstone', qty: 1 }, { ...WOOL, qty: 1 }], outputId: 1702 },

  // ── Opal silver (P2P) ───────────────────────────────────────────────────────
  { name: 'Opal ring',        level:  1, xp:  10, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1609, name: 'Opal', qty: 1 }], outputId: 21081 },
  { name: 'Opal necklace',    level: 16, xp:  35, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1609, name: 'Opal', qty: 1 }], outputId: 21090 },
  { name: 'Opal bracelet',    level: 22, xp:  45, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1609, name: 'Opal', qty: 1 }], outputId: 21117 },
  { name: 'Opal amulet (u)',  level: 27, xp:  55, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1609, name: 'Opal', qty: 1 }], outputId: 21099 },
  { name: 'Opal amulet',      level: 27, xp:  59, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1609, name: 'Opal', qty: 1 }, { ...WOOL, qty: 1 }], outputId: 21108 },

  // ── Jade silver (P2P) ───────────────────────────────────────────────────────
  { name: 'Jade ring',        level: 13, xp:  32, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1611, name: 'Jade', qty: 1 }], outputId: 21084 },
  { name: 'Jade necklace',    level: 25, xp:  54, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1611, name: 'Jade', qty: 1 }], outputId: 21093 },
  { name: 'Jade bracelet',    level: 29, xp:  60, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1611, name: 'Jade', qty: 1 }], outputId: 21120 },
  { name: 'Jade amulet (u)',  level: 34, xp:  70, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1611, name: 'Jade', qty: 1 }], outputId: 21102 },
  { name: 'Jade amulet',      level: 34, xp:  74, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1611, name: 'Jade', qty: 1 }, { ...WOOL, qty: 1 }], outputId: 21111 },

  // ── Topaz silver (P2P) ──────────────────────────────────────────────────────
  { name: 'Topaz ring',       level: 16, xp:  35, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1613, name: 'Red topaz', qty: 1 }], outputId: 21087 },
  { name: 'Topaz necklace',   level: 32, xp:  70, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1613, name: 'Red topaz', qty: 1 }], outputId: 21096 },
  { name: 'Topaz bracelet',   level: 38, xp:  75, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1613, name: 'Red topaz', qty: 1 }], outputId: 21123 },
  { name: 'Topaz amulet (u)', level: 45, xp:  80, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1613, name: 'Red topaz', qty: 1 }], outputId: 21105 },
  { name: 'Topaz amulet',     level: 45, xp:  84, metal: 'silver', members: true,
    inputs: [{ ...SILVER, qty: 1 }, { id: 1613, name: 'Red topaz', qty: 1 }, { ...WOOL, qty: 1 }], outputId: 21114 },
];

// ── Dragonhide crafting (all P2P) ───────────────────────────────────────────
// Tool: needle + thread. Input is tanned dragon leather (buy from GE).
// Vambraces: 1 hide | Chaps: 2 hides | Body: 3 hides
export const DHIDE_RECIPES = [
  // ── Green ────────────────────────────────────────────────────────────────────
  { name: "Green d'hide vambraces", colour: 'Green', level: 57, xp:  62, hides: 1, hideId: 1745, outputId: 1065 },
  { name: "Green d'hide chaps",     colour: 'Green', level: 60, xp: 124, hides: 2, hideId: 1745, outputId: 1099 },
  { name: "Green d'hide body",      colour: 'Green', level: 63, xp: 186, hides: 3, hideId: 1745, outputId: 1135 },
  // ── Blue ─────────────────────────────────────────────────────────────────────
  { name: "Blue d'hide vambraces",  colour: 'Blue',  level: 66, xp:  70, hides: 1, hideId: 2505, outputId: 2487 },
  { name: "Blue d'hide chaps",      colour: 'Blue',  level: 68, xp: 140, hides: 2, hideId: 2505, outputId: 2493 },
  { name: "Blue d'hide body",       colour: 'Blue',  level: 71, xp: 210, hides: 3, hideId: 2505, outputId: 2499 },
  // ── Red ──────────────────────────────────────────────────────────────────────
  { name: "Red d'hide vambraces",   colour: 'Red',   level: 73, xp:  78, hides: 1, hideId: 2507, outputId: 2489 },
  { name: "Red d'hide chaps",       colour: 'Red',   level: 75, xp: 156, hides: 2, hideId: 2507, outputId: 2495 },
  { name: "Red d'hide body",        colour: 'Red',   level: 77, xp: 234, hides: 3, hideId: 2507, outputId: 2501 },
  // ── Black ────────────────────────────────────────────────────────────────────
  { name: "Black d'hide vambraces", colour: 'Black', level: 79, xp:  86, hides: 1, hideId: 2509, outputId: 2491 },
  { name: "Black d'hide chaps",     colour: 'Black', level: 82, xp: 172, hides: 2, hideId: 2509, outputId: 2497 },
  { name: "Black d'hide body",      colour: 'Black', level: 84, xp: 258, hides: 3, hideId: 2509, outputId: 2503 },
];

// ── Glass blowing ─────────────────────────────────────────────────────────────
// Tool: glassblowing pipe. All use 1x Molten glass (id: 1775) as input.
export const MOLTEN_GLASS_ID = 1775;
export const GLASS_RECIPES = [
  { name: 'Beer glass',           level:  1, xp: 17.5, outputId: 1919 },
  { name: 'Empty candle lantern', level:  4, xp: 19.0, outputId: 4527 },
  { name: 'Empty oil lamp',       level: 12, xp: 25.0, outputId: 4525 },
  { name: 'Vial',                 level: 33, xp: 35.0, outputId:  229 },
  { name: 'Fishbowl',             level: 42, xp: 42.5, outputId: 6667 },
  { name: 'Unpowered orb',        level: 46, xp: 52.5, outputId:  567 },
  { name: 'Lantern lens',         level: 49, xp: 55.0, outputId: 4542 },
  { name: 'Empty light orb',      level: 87, xp: 70.0, outputId: 10980, members: true },
];
