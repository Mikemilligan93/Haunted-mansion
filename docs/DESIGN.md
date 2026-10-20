# Haunted Mansion: Design Document

*Living document. Last updated: 2026-10-19. Working title until we name the game.*

The cornerstone for the game: every decision made so far, and what is still open. Update it with every major change (see the decision log at the end).

---

## 1. Pitch

A freshly turned, easily frightened young vampire inherits a spooky old mansion. The house is already occupied by its ghostly tenants and by a forgetful Victorian butler who doesn't know he's dead. Liam has to win the house over, one misunderstood ghost at a time.

**Spooky, not horror.** The vibe is Scooby-Doo and Wednesday: dry humour on top, and underneath a sincere story about wanting to be understood.

## 2. Pillars

1. **A world worth getting lost in.** A detailed, hand-crafted mansion, garden and cemetery in which nearly every object can be inspected, and every inspection gets a deadpan comment.
2. **Rare fights, real challenge.** Most of the time you explore without fighting. When a fight comes, it is a boss encounter: hard, fair, with an instant retry.
3. **Kindness wins, not violence.** Fights are part of understanding a tenant, not the goal. Liam wins people over by helping them while terrified.
4. **Fear as growth.** Liam panics into bat form early on; he gains control of it as he understands the house and himself.
5. **A living house.** Day and night, weather, and characters with routines.

## 3. Tone

- **Humorous on the surface, sincere underneath.**
- **Liam's humour is dry and deadpan** (Wednesday register). The world around him is spooky-comic.
- No gore, no real horror. Scares are jump-scare comedy.
- Every "scary" character is misunderstood underneath, a mirror of Liam himself.

## 4. Story frame

- **Liam** inherits the mansion. *Why he inherits it, and who the previous owner was, is still open.*
- **The tenants** are the ghosts of the house's former residents. Each has unfinished business; Liam helps each of them.
- **Ambrose**, the butler, is a ghost who doesn't know he's dead. His nightly rituals are a slow-burning mystery the player can investigate. *How he learns the truth is still open.*
- **Ending: warm.** Ambrose learns the truth and chooses to stay. The tenants stop haunting and start living with Liam. A found family of oddballs, and Liam finally belongs.
- **Language:** English.

## 5. Characters

### 5.1 Liam (the player)

**Who he is**
- Early twenties, recently turned vampire, still learning the rules.
- Before the bite: a **failed painter** whose art nobody looked at.
- **Wants** to be a proper, terrifying vampire, because he thinks that's how he'll be respected. **Needs** to be accepted as the awkward person he actually is.
- **Genuine strength: kindness.** He helps everyone even while terrified. That is what wins the tenants over.

**How he acts**
- **Performance voice:** grand, archaic, book-learned vampire clichés ("I bid you good evening"), full of bravado he can't back up.
- **Real voice:** flat, dry, honest. The humour comes from the gap between the two.
- **Quirks:** strikes a dramatic pose at every new door; talks to his cape (it's just fabric).
- Scares easily. Too much fright and he turns into a bat (see 6.2).

**Sample lines**
> *(Entering the ballroom, performance voice)* "Behold! The lord of this manor arrives, and the shadows bow before—" *(A chandelier creaks. Bat form. Then, real voice:)* "...Structural concern. Not fear. Noted."

> *(Inspecting a teacup)* "I made tea. I can't drink tea. I made it anyway. Some rituals outlive you."

> *(To the cape)* "Don't look at me like that." *(It does not look at him. It is a cape.)*

**Look** (approved master: `assets/img/liam_master.png`)
- Gothic storybook style: gaunt, lanky, sleepless.
- Messy silver-white hair, pointed ears, pale lilac-grey skin, small pale grey eyes with heavy dark rings, tiny fangs (one crooked).
- Cream frilly poet shirt with a jabot, black skinny trousers, flat pointed ankle boots.
- Black cape with a wine-burgundy lining, a tall pointed collar and a ragged hem.
- His look **stays the same** all game; only his behaviour changes.
- **Two sets of proportions:** the master turnaround and the portraits are lanky (head about 28% of his height). The **in-game sprites are chibi** (head about 35–40%, short legs), which reads better at 32×64. `liam_td_walk.png` is the proportion reference for every in-game sprite sheet.

**Portraits** (8): grand, smug, flat (default), startled, panicked, embarrassed, soft, sad.

### 5.2 Ambrose (the butler)

**Who he is**
- An elderly Victorian butler who **died in the 1890s** and is still on duty. He doesn't know he's dead.
- **Impeccably formal**, completely unflappable. Treats every absurd thing as normal: *"Your bat form, sir. Shall I open a window?"*
- Liam pretends to be something he isn't; Ambrose doesn't know what he is. Two halves of the same theme.

**Forgetfulness**
- **Calls Liam by the names of earlier masters**, going further back in time. In the ending, he finally says "Master Liam."
- **Repeats himself** (tips, stories).
- **Fades** (turns translucent) when he loses his train of thought.

**Role in the game**
- **Lore keeper**: knows the tenants' stories, if he remembers.
- **Hint giver**: vague, half-remembered tips.
- **Save point**: serves tea; saving the game is "having a rest".
- **Running gag**: the hand behind his back always produces exactly what's needed (a teacup, a key, a note).

**Routine**
- **Day:** follows a schedule through the house; the player can learn where to find him.
- **Night rituals** (the investigation thread):
  1. Sets the dinner table for absent guests, always the same number.
  2. Winds every clock back to the same hour (leads to the tower's clock room).
  3. Walks through a wall where a door used to be (leads to the sealed room).

**Ghost tells (subtle):** candles lit even at noon; walks with a slight glide; fades when confused; his uniform is a century out of date.

**Look**
- **Sepia palette**, like an 1890s photograph: faded browns and yellowed whites. This separates him from Liam's black, and quietly marks him as from another era.
- Thin and rigid, ramrod-straight, slightly taller than Liam. Bald, huge flared mutton-chop whiskers.
- 1890s livery: tailcoat, waistcoat, high wing collar, bow tie, white gloves.
- **Master approved** (`assets/img/ambrose_master.png`). Like Liam, the master is lanky; his **in-game sprites are chibi** (head about 35%, about 10% taller than Liam), with Liam's walk sheet as the proportion reference.
- Always carries a **lit three-armed brass candelabra**: at night, a moving pool of warm light is how the player spots him.
- Drawn solid; transparency happens only in code.

**Portraits** (8): composed (default), polite smile, raised eyebrow, drifting, remembering, concerned, warm, shaken (reserved for the reveal).

### 5.3 The tenants

**Not designed yet: next design topic.** Each tenant gets: a home wing, a story and unfinished business, a fight format, a bat-control upgrade, and a memento for Liam's room. Planned count: about 5 (fits 3–5 hours of play).

## 6. Gameplay

### 6.1 Exploration

- **Top-down, 3/4 view** (like Ikigai404 and classic Zelda), 4 directions.
- **Inspect & collect lore:** letters, diaries and objects that reveal the tenants' stories.
- **Talk to everything:** witty comments on props, portraits that talk back.
- **Environmental puzzles:** curtains, mirrors, levers, secret passages.
- **Map:** Ambrose's outdated 1890s floor plan. Rooms are missing, doors have moved; Liam annotates it as he explores. Its mistakes are clues.

### 6.2 Fright and bat form

- A **fright meter** rises with scares.
- When it's full, Liam **panics into bat form** (uncontrolled at first).
- Each tenant Liam helps grants **more bat control**: e.g. hovering across gaps, squeezing through vents, flying up shafts. These are the main way new routes open.
- High fright also shows as cowering (clutching the cape).

### 6.3 Combat

- **Rare, boss-centred:** one boss, maybe with a few minions. No regular enemies wandering the house.
- **Formats vary by tenant:**
  - **Painting worlds:** side-view 2D platformer arenas inside paintings (doors in the portrait gallery).
  - **Locked boss rooms:** top-down; the room locks until the fight is over.
  - **Survivor nights:** wave survival in the garden or cemetery.
- **Liam's moves:** a **cape swipe** (melee) and **one projectile** (not decided yet; ideas: teacups, a withering glare, tiny bats, crumpled sketches).
- **Difficulty:** hard, fair, quick retry (Celeste or Hollow Knight style).
- **Defeat:** no death. Liam startles, turns into a bat and flees in a panic. Retry puts him back at the door, mid-pose, pretending nothing happened.

### 6.4 Time, light and weather

- **Day/night cycle and weather** change the mood, the lighting and Ambrose's behaviour. **They never block progress.**
- **Sunlight is a soft hindrance:** window sunbeams slow and annoy Liam. Opening and closing curtains is a puzzle tool.

### 6.5 Saving

- Tea with Ambrose. Saving is "having a rest".

## 7. World

### 7.1 Structure

- **Room by room:** each room is its own map, with a transition at the doors. Most rooms fit one screen; a few large ones scroll (ballroom, portrait gallery, hedge maze).
- **About 43 rooms**, plus the painting worlds as separate side-view levels.
- **Hub:** the entrance hall. The other areas branch off it.
- **Gating:** bat-control upgrades, puzzles and story events.

### 7.2 Room list (first draft)

| Area | Rooms |
|---|---|
| **Ground floor (11)** | Entrance hall (hub), Ballroom *(large)*, Music room, Dining room, Drawing room, Library, Study, Billiard room, Back hall, Servants' passage *(hidden)*, Porch |
| **Upper floor (10)** | Landing, Portrait gallery *(large; painting doors)*, Master bedroom (previous owner's), **Liam's bedroom**, Guest room ×2, Nursery, Playroom, Bathroom, Linen closet (secret passage) |
| **Basement (7)** | Kitchen, Scullery, Wine cellar, Servants' hall, Ambrose's pantry, Boiler room, **Sealed room** |
| **Attic / tower (4)** | Attic storage, Tower stairs, **Clock room**, Previous owner's studio *(endgame)* |
| **Outside (11)** | Front drive, Garden terrace, Hedge maze ×3, Greenhouse ×2, Cemetery ×2, Family crypt ×2 |

### 7.3 Story rooms

- **Liam's bedroom** starts bare and fills with a memento from each tenant he helps: the found-family arc told through set dressing.
- **The sealed room:** the 1890s plan shows a door where there's now a wall. Ambrose walks through it at night; the room behind it holds his secret.
- **The clock room:** the great clock in the tower runs every clock in the house. Ambrose's clock-winding ritual leads there.

## 8. Art direction

### 8.1 Style

- **Gothic storybook pixel art:** Edward Gorey and Tim Burton illustrations translated into pixels. Darkly whimsical and deadpan; not anime, not cute, not horror.
- Angular, jagged shapes. Thick, slightly uneven inked outline (`#1A1020`). Flat colours, 2–3 tones per material, hatching instead of smooth shading. Matte, no shine. Light from the top-left.
- Every character has a **distinct palette**: Liam black/burgundy/silver, Ambrose sepia. The full approved palette is in the art tracker.
- **Interior:** faded grandeur: dusty, cobwebs, peeling corners, but intact. Faded sage-green damask wallpaper, warm mid-brown oak floors, walnut wainscot and mouldings, ochre velvet curtains, tarnished brass. Kept mid-tone so Liam's black and burgundy read clearly.

### 8.2 Sizes

| Item | Size |
|---|---|
| Internal resolution | **640×360**, scaled ×3 to 1080p |
| Tiles | **16×16 px** (one screen = 40×22 tiles) |
| Characters | **32×64 px** (Liam = 2×4 tiles) |
| Bat form | 24×24 px |
| Dialogue portraits | 96×96 px, 8 expressions each |

### 8.3 Animation

- **4 directions;** right is the left mirrored. Down, left and up are drawn.
- **4–6 frames** per animation: few, strong keyframes. Code handles cheap motion (bobbing, shaking, fading, hit flash, candle glow).

### 8.4 Pipeline

- Images are generated with ChatGPT or Gemini from the prompts in `docs/Haunted_Mansion_Art_Prompts.xlsx` (one sheet per asset group; `docs/PROMPTS.md` mirrors it).
- Every prompt is self-contained: style block, exact palette, solid magenta `#FF00FF` background, grid layout, no text.
- Each character's approved master turnaround is attached to all of that character's prompts.
- `tools/process_art.py`: chroma-key, auto-crop, palette snapping, nearest-neighbour resize, seamless tiles.

## 9. Technical defaults

- **Vanilla JavaScript + Canvas,** zero dependencies, no build step.
- All tunable numbers in `config.json`; all on-screen text in `texts.json`.
- Fallback rendering for every missing asset: the game runs before the art exists.
- Thick pixel font (DotGothic16) on solid panels with a dark outline; text stays on screen for about 1 s + 0.3 s per word (minimum 2 s).
- Deploy to Cloudflare Workers (`wrangler.jsonc`, server code in `worker/`).
- **Testing environment from day one:** testing modal, cheats (god mode, infinite resources, game speed, frame step), spawn anything, sandbox room, visual overlays, live config reload, save states, fixed random seed, automated smoke tests.

### 9.1 Current build (demo room)

- **Test room:** one room with the oak floor, the sage back wall, a door, a sash window with curtains and two candle sconces. Liam enters through the door and strikes his door pose; then he walks in four directions, idles, fidgets (with a line) after standing still, and inspects things with E.
- **Day/night:** a real-time cycle (a full day is 240 s, in `config.json`). Dawn and dusk get a warm tint; at night the room darkens and the sconces light up with flickering candle light. The window glass switches to night.
- **Sunbeam:** daylight through the window falls on the floor as a slanted beam with dust motes and the window bar's shadow. In it, Liam walks at 45% speed and says a grumpy line once per day. E on the window cycles the curtains open → half → closed, which changes the beam. At night a faint moonbeam has no effect.
- **Room scale:** the back wall is 96 px (6 tiles) tall so it towers over Liam. Door 55×96, window 64×83, sconce 15×32, Liam about 58 px tall.
- **Bat form (testing tools → Bat form):** Turn into bat plays the startle, then the smoke puff, then he flies (110 px/s, hovering 18 px with a bob and a small shadow). Turn back plays the smoke in reverse. Panic bat: he lurches in random directions for 3 s, bouncing off walls, the keys only nudge him, then he turns back by himself. No interacting while a bat. All numbers in `config.json` → `bat`.
- **Ambrose in the test room:** he glides on his own (no body bob) with his candelabra as a moving light. By day he wanders between spots. Rarely (12% chance per stop, at most once every 2 minutes) he drifts: the drift pose, a slight fade, then he snaps back. He bows when Liam comes near (at most every 25 s). E talks to him; lines show one after another with portraits (his on the right), and E skips ahead. Odd conversations are the wrong-name gag (he calls Liam an older master's name each time, Liam corrects him, he agrees with the wrong name again); even ones are small talk, which he sometimes repeats ("I believe I mentioned that, sir."). He has special lines for the bat, for a drift and for each ritual.
- **Night rituals (20:00–05:30):** he sets the small dining table place by place (4 places), winds the grandfather clock back (its hands then stay at 3:00 until dawn) and walks through the left wall where the 1890s plan shows a door, fading out, gone for 6 s, then back. Dawn clears the table and restarts the clock. Liam can inspect the table and the clock. The table (72 px wide, with four staggered settings), the place settings (white china so they read on the cream cloth) and the clock (its hands are drawn by the game) use their real art (PROP-02 to PROP-04).
- **Pause menu:** Esc or P freezes the game and opens Resume, Controls (the controls hint), Testing tools and Restart room. A small "Esc: menu" hint shows for the first 6 seconds.
- **Testing toolkit:** testing panel (from the pause menu, or F1 / \`) with cheats, game speed, pause and frame step, a time-of-day slider, curtain controls, spawning (candle, Liam dummy playing any animation, Ambrose fallback, test dialogue) next to Liam or at the cursor, overlays (hitboxes, ranges/auras/sunbeam, nav grid, FPS, live values), live reload of `config.json` and `texts.json`, 3 save-state slots plus export/import, a fixed seed, and a copyable test link. The **sandbox** scene has an animation viewer that plays every sheet and shows a seam test for tiles. URL parameters are listed in `README.md`.
- **Smoke tests:** `node tests/smoke.mjs` runs 68 checks in a headless browser (intro, movement, walls, curtains, sunbeam, dusk/night, day rollover, fidget, save states, config reload, the pause menu and testing panel, the bat form, Ambrose (schedule, greeting, conversations, drift, rituals, dawn reset), the fixed seed, the sandbox and every viewer page, and a no-art run) and saves screenshots to `tests/screenshots/`.
- **Art pipeline:** `tools/process_art.py` keys out the magenta, snaps every pixel to the palette group (`tools/palette.json`, exported from the tracker) and downscales by block sampling: each output pixel takes the most common palette colour of its block, with dark ink colours winning so outlines and eye rings survive. It keeps each drawing whole even when it pokes over its grid cell (it is given to the cell that holds most of it), removes stray specks, trims tile seams and checks that tiles repeat cleanly. A sheet can also swap colours after processing (`remap`, used to turn the cream china white), line its frames up on their own boxes (`align`), and keep one frame for everything except a moving part (`still_body`, used so only the clock's pendulum moves). Sheet layouts and animation timings are in `tools/art_sheets.json`.
- **Font:** the DotGothic16 file has to be added to `assets/fonts/` by hand (download blocked from here); until then a bold system font is used.

## 10. Open questions

| Topic | Question |
|---|---|
| Story | Why does Liam inherit the mansion? Who was the previous owner? |
| Story | How does Ambrose learn he's dead? |
| Story | Ambrose's death hour: the clock stops at 3:00 for now (`config.json` → ambrose.deathHour, and the clock line in `texts.json`). |
| Art | Ambrose's sepia blends a little with the oak floor by day; consider a darker coat or a rim light. |
| Tenants | Who are they, where do they live, which fight format and bat upgrade each? |
| Combat | What is Liam's projectile? |
| Gating | Exact bat-control upgrades and their order. |
| Weather | Which weather types, and what they change. |
| World art | Exterior palette, lighting model, day/night look. (Interior base palette is set.) |
| Audio | Music and sound direction. |
| Title | The game's name. |

## 11. Decision log

| Date | Decision |
|---|---|
| 2026-10-19 | Concept: vampire heir, ghost tenants, spooky not horror, warm ending, 3–5 hours, English. |
| 2026-10-19 | Combat: mixed formats (painting worlds, locked rooms, survivor nights); hard, fair, quick retry. |
| 2026-10-19 | Liam: failed painter, goth look, kindness as his strength; master turnaround approved. |
| 2026-10-19 | Art style: gothic storybook pixel art; Liam 32×64, head 25–30% of height. |
| 2026-10-19 | Ambrose: Victorian ghost butler, sepia palette, candelabra, night rituals. |
| 2026-10-19 | World: room by room, ~43 rooms, entrance hall hub, gating by bat control + puzzles + story. |
| 2026-10-19 | Tech: 16×16 tiles, 640×360 resolution. |
| 2026-10-19 | Liam's in-game sprites are chibi (head 35–40%); master and portraits stay lanky. Walk sheet is the proportion reference. |
| 2026-10-19 | Interior palette: faded sage wallpaper, warm oak floor, walnut wood, ochre curtains. Faded grandeur, not ruined. |
| 2026-10-19 | Demo room built: keyboard only, real-time day/night, sunbeam slows Liam with a grumpy line, curtains as the light switch. Run with `start.command`. |
| 2026-10-19 | Back walls are 96 px (6 tiles) tall; wall props are scaled to Liam (door 96 px). |
| 2026-10-20 | Table, place settings and clock art in the room; the table is drawn at 72 px wide and the china is white for readability. Only the clock's pendulum moves. Ambrose's drifting is rare and subtle. |
| 2026-10-20 | Ambrose is in the test room: schedule, drift, greeting, conversations, and the three night rituals with table and clock. |
| 2026-10-20 | Ambrose master approved; his in-game sprites will be chibi like Liam's. |
| 2026-10-20 | Bat form testable from the testing tools (controlled and panic flight). Fixed: the art tool cut off hair that poked over a grid cell (Liam's head looked cut when walking up). |
| 2026-10-19 | Pause menu on Esc / P holds the testing tools and the controls hint; the TEST button is gone (F1 still works). |
