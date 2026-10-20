# Haunted Mansion

A spooky (not scary) top-down game about Liam, a freshly turned vampire who inherits a haunted mansion.
Design: `docs/DESIGN.md` · Art prompts: `docs/Haunted_Mansion_Art_Prompts.xlsx` (mirror: `docs/PROMPTS.md`).

## Play
Double-click `start.command`. It starts a small local server and opens the game in your browser.
(The first time, macOS may ask for permission: right-click > Open.)

Controls: WASD / arrows to move, E / Space / Enter to interact, Esc or P for the pause menu (Resume, Controls, Testing tools, Restart room). F1 (or `) opens the testing tools directly; . steps one frame while the tools have frozen the game.

## Test links
| What | Link |
|---|---|
| Test room with intro | `?debug=1` |
| Test room, no intro, at noon, overlays on | `?debug=1&intro=0&time=12&overlays=hitbox,ranges,values,fps` |
| Night with candles | `?debug=1&intro=0&time=23` |
| Sandbox | `?debug=1&scene=sandbox` |
| Animation viewer on a sheet | `?debug=1&scene=sandbox&sheet=liam_td_walk` |
| Ambrose's night rituals | `?debug=1&intro=0&time=21` |
| Liam as a bat | `?debug=1&intro=0&bat=1` |
| No art at all (fallbacks) | `?debug=1&noart=1` |
| Fixed seed | `?debug=1&seed=42` |

Other parameters: `speed`, `freeze=1`, `daylength`, `curtain=open|half|closed`, `x`, `y`, `pause=1`, `tools=1` (opens the testing modal).

## Folders
- `src/` game code (vanilla JavaScript + Canvas, no dependencies) · `config.json` all numbers · `texts.json` all text
- `assets/img/` generated art (raw) · `assets/sprites/` processed, game-ready art + `manifest.json`
- `tools/process_art.py` turns raw art into sprites (`python3 tools/process_art.py --preview`; needs `pip3 install pillow numpy`). Sheet layouts are in `tools/art_sheets.json`, colours in `tools/palette.json`.
- `tests/smoke.mjs` automated smoke tests (`node tests/smoke.mjs`; needs Node and Playwright)
- `wrangler.jsonc` Cloudflare Workers deploy (static assets; `.assetsignore` keeps docs, tools and raw art out)
