# Haunted Mansion: Design Document

*Living document. Last updated: 2026-10-21. Working title until we name the game.*

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
- **The tenants** are six odd residents: some lived here before, some are strangers who moved in, and not all of them are ghosts. Each has unfinished business; Liam helps each of them.
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
- **Died at 9 pm**, while counting for the Twins' hide-and-seek. Every night he winds the clocks back to nine (`config.json` → ambrose.deathHour = 21).

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

**Six tenants.** A mix of former residents and strangers who moved in; not all are ghosts. Every tenant looks scary and is misunderstood underneath, and each one mirrors one of Liam's own fears. Helping a tenant means understanding them; the fight is part of that, never the goal.

Each tenant gets: a home, a fear they mirror, a fight format, a bat-control upgrade, and a memento for Liam's bedroom. **Origins** (former resident or stranger, ghost or creature), stories and unfinished business are decided in each tenant's own design session.

| # | Tenant | Home | Mirrors Liam's fear | Fight | Bat upgrade | Memento |
|---|---|---|---|---|---|---|
| 1 | **The Twins** *(tutorial)* | Nursery (with the playroom corner; upper floor) | Being left alone | **Painting world:** a picture-book painting; a hide-and-seek chase | **Transform at will** (turn into a bat and back without panicking) | Their crayon drawing of Liam |
| 2 | **The Poltergeist** | Library | Nobody looking at his work (Liam's unseen paintings) | **Locked room:** flying books and shelves | **Carry:** pick up small objects as a bat | A bookmark |
| 3 | **The Empty Armour** | Ballroom | Being hollow behind the act | **Locked room:** a duel | **Dash:** a short burst past drafts and hazards | A polished gauntlet |
| 4 | **The Banshee** | Music room | Not being heard | **Painting world:** an opera painting; dodging sound waves | **Screech:** reveals hidden passages, shatters glass | A music box |
| 5 | **The Mummy** | Wine cellar (basement) | Falling apart; no longer being who you were | **Locked room:** crates and unravelling bandages | **Squeeze:** fit through vents and cracks | A small wrapped scarab |
| 6 | **The Gargoyle** | Tower roof | Sunlight; frozen by day | **Survivor night** on the roof until dawn | **Long flight:** up shafts and the tower | A chipped stone wing tip |

- **The Twins come first.** Hide-and-seek is a gentle start that teaches exploring and the bat.
- **The order is a draft:** each upgrade opens the next tenant's area (e.g. Carry for the library puzzles before the ballroom, Squeeze into the cellar vents, Long flight up the tower last). Confirm in playtests.
- **Painting worlds are magic doors:** old paintings in the portrait gallery are portals; a tenant drags Liam into one. There is no painter character.

### 5.4 The Twins (tenant 1, tutorial)

**Who they are**
- **Ghosts of two little girls** (about 8) who lived in the house in the 1890s, in Ambrose's time. Identical: dark grey bobs with a blunt fringe, very big solid dark eyes, tiny smiles, grey dresses under faded-white pinafores, one big white bow each.
- **Perfect unison:** they speak together, finish each other's sentences, move in sync and tilt their heads at the same moment. Creepy-funny.
- **Names:** **Frida** and **Wilhelmina**.

**Their story**
- In the 1890s they played hide-and-seek, and **Ambrose was the seeker**. He started counting and never came to find them, because **he died while counting**. The Twins don't know that; neither does he. This is a key clue in his mystery.
- They have been **hiding ever since**, waiting for someone to find them. That is their unfinished business.
- **Mirrors Liam's fear of being left alone:** nobody came looking for them; nobody looked at Liam's paintings.

**How Liam meets them: properly menacing**
- The tutorial tenant is the first real scare. Giggles in the dark, a ball rolling out of nowhere, toys moving by themselves, two voices whispering "Found you…" behind Liam.
- **This is where Liam has his first big panic into bat form** (the fright meter's tutorial).
- Once he understands them, they turn out to be lonely, playful and sweet.

**Their rooms** (upper floor)
- **Nursery** *(home, with a playroom corner)*: toys, two little beds, a rocking horse, a dollhouse. The Twins' picture-book painting hangs here.
- **Guest room:** their favourite hiding place; the wardrobe matters at the end.
- **Linen closet:** a secret passage; the Twins use it to vanish and reappear.

**Fight: toy army** *(painting world, side view)*
- The Twins drag Liam into their picture-book painting.
- They command an army of **wind-up tin soldiers** and a **rocking horse**; Liam survives the waves.
- Then he has to **tag both Twins** to win.

**Resolution**
1. **Liam finds them.** After the fight, the game finally has a seeker.
2. **Then it's his turn to hide.** For the first time Liam **turns into a bat on purpose** and hangs in the guest-room wardrobe. The Twins find him, delighted. **This is the bat upgrade: transform at will.**
3. **Epilogue:** Liam brings Ambrose to the nursery. Ambrose says **"Found you"** at last. It's sweet, and a small crack in his forgetting.

**Look** (art prompts TWN-00 to TWN-11, sheet *Twins* in the art tracker)
- **Faded white and grey, almost monochrome:** like porcelain or a faded photograph. No colour on them at all, so they read as ghosts next to Liam's black and burgundy and Ambrose's sepia.
- **Big dark eyes, tiny smiles:** solid dark eyes with no sparkle; the smile never changes. Storybook-creepy, not horror.
- **Telling them apart:** they are mirror images. **Frida's bow sits on her left, Wilhelmina's on her right.** Only Frida is drawn; Wilhelmina is Frida mirrored in code.
- **Size:** small children, about 75% of Liam's height; frames are 32×48 px. Chibi like every in-game sprite.
- **Doll-like movement:** neat little steps with no arm swing and no bob; the unison head tilt as their idle. Inside the painting they float.
- **Portraits:** both girls share one portrait, because they always speak together. 8 expressions: blank stare (default), head tilt, giggle, whisper, pouting, lonely, delighted, at peace.
- **Ghostly transparency is added in code;** the art is solid.

**The toy army** (TWN-12 to TWN-14)
- **Tin soldiers** (24×32): wind-up toys with bearskin hats, faded red coats, a brass key in the back. They march in stiff scissor steps and lunge with a blunt toy bayonet. One cape swipe knocks a soldier flat; left alone, he winds himself back up.
- **The rocking horse** (64×48, mini-boss): a dapple-grey horse with a fixed, slightly unhinged grin. It rocks, then leaps across the arena; when it lands hard it can topple, which opens a window to hit it.
- **Thrown toys** (16×16): blocks, a ball, a jack, a spinning top. The Twins throw them from the fort towers.

**The picture-book world** (TWN-15 to TWN-18)
- The inside of an old Victorian picture book: ink cross-hatching on yellowed paper, painted wood and tin. **Its own palette:** paper, faded toy red, navy, mustard, felt green, so the side-view level looks different from the house.
- Arena: a big wooden **toy fort**; the Twins stand on its two towers. Platforms are giant floorboards, toy blocks and bookshelf planks.
- Backgrounds: a moonlit nursery window (far layer) and giant toys (middle layer). Both are kept low-contrast so the fight stays readable.

**The nursery and the guest room** (TWN-19 to TWN-26)
- **Nursery:** faded dusty-blue wallpaper with tiny stars and moons, a white wainscot with two identical height marks, the oak floor, a faded rose rug.
- **Props:** two identical white iron beds (one can have a twin hiding under the quilt), a **dollhouse that is a miniature of the mansion** (with a tiny butler inside: an Ambrose clue), a rocking horse that rocks by itself, a toy chest that rattles, a rag doll, scattered toys, and **the picture-book painting**, which swirls into a portal.
- **Guest room wardrobe:** closed, ajar (one big dark eye and a bit of bow inside), and open with an empty rail, where Liam hangs as a bat at the end.

**Memento:** their crayon drawing of Liam (as a bat, hanging in the wardrobe).

**Chapter flow** (the playable level; draft beats)

*Rooms:* Liam's bedroom → Landing → Nursery and Guest room, joined by the Linen closet passage. The toy-army fight is a separate side-view level inside the nursery painting.

1. **Evening, Liam's bedroom.** The room is still bare. Ambrose brings the evening tea (his produce animation) and mentions that "the young misses" are rather lively tonight. Liam has no idea who he means. Goal: go and complain.
2. **The landing.** Giggles behind the doors; a ball rolls across the floor by itself. Doors to the nursery and the guest room.
3. **First meeting, nursery (scripted, menacing).** The rocking horse rocks with nobody on it, the toy chest rattles, the light flickers. Two voices whisper "Found you…" right behind Liam. **His first big panic into bat form**: the fright meter fills on screen and teaches the mechanic. When he lands, the Twins are standing there: "Let's play hide-and-seek. You count." Liam counts; they vanish into the linen closet.
4. **Seeking.** Liam checks **hand-placed hiding spots** in the nursery and the guest room. Each spot is a **scare** (fills the fright meter), a **clue** (a line that hints where to look), or **a twin**. Giggles come from the room that still hides a twin. Fixed layout (first draft):
   - Nursery: toy chest (scare: it bursts open), rocking horse (scare: it rocks), dollhouse (clue and Ambrose lore: the tiny butler inside; a lit window), second bed (scare: the lump is a rag doll), **first bed (Frida, under the quilt)**, wainscot (lore: two identical height marks).
   - Guest room: curtains (scare), under the bed (clue), **wardrobe (Wilhelmina, one eye in the gap)**.
   - Linen closet: a shortcut both ways; the Twins' giggles echo through it.
5. **"Now play with us properly."** Once Liam has found both, the Twins take his hands and pull him into the picture-book painting (the portal swirl).
6. **Fight: the toy army** (side view, toy-fort arena). Three phases, and **a defeat retries the current phase**:
   - Phase 1: waves of tin soldiers, while the Twins throw toys from the fort towers.
   - Phase 2: the rocking horse charges across the arena.
   - Phase 3: tag both Twins as they float between the towers.
7. **Back in the nursery: "Your turn to hide."** The Twins count with hands over their eyes. The player learns the **bat upgrade: transform at will**, and hides as a bat on the empty rail of the guest-room wardrobe. The Twins find him and dissolve into giggles.
8. **Epilogue.** Liam brings Ambrose to the nursery: "Ninety-nine… one hundred. Ready or not. Found you, Miss Frida. Miss Wilhelmina." The crayon drawing appears in Liam's bedroom.

**Fright meter in this chapter:** scares fill it. When it is full outside the fight, Liam panics into bat form for a few seconds in the same room, then lands and the meter resets.

**Sample lines** *(draft)*
> **Twins:** "You're not the one who was counting." / "You're taller." / "And dead-er."

> **Liam** *(performance voice)*: "Fear not, children of the night!" **Twins:** "We're not afraid." / "You are." **Liam** *(real voice)*: "...Fair."

> **Ambrose** *(epilogue, remembering)*: "Ninety-nine… one hundred. Ready or not." *(A pause.)* "Found you, Miss Frida. Miss Wilhelmina."

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
  - **Survivor nights:** wave survival outside (garden, cemetery or the tower roof).
- **Liam's moves:** a **cape swipe** (melee) and **one projectile: crumpled sketches** (balled-up drawings: he is a failed painter). Code-drawn placeholder until the art exists.
- **Difficulty:** hard, fair, quick retry (Celeste or Hollow Knight style).
- **Defeat:** no death. Liam startles, turns into a bat and flees in a panic. Retry puts him back at the door, mid-pose, pretending nothing happened.

### 6.4 Time, light and weather

- **Day/night cycle and weather** change the mood, the lighting and Ambrose's behaviour. **They never block progress.**
- **Sunlight is a soft hindrance:** window sunbeams slow and annoy Liam. Opening and closing curtains is a puzzle tool.

### 6.5 Saving

- Tea with Ambrose. Saving is "having a rest".

## 7. World

### 7.1 Structure

- **Room by room:** each room is its own map, with a transition at the doors. Most rooms fit one screen; two large ones scroll (ballroom, portrait gallery).
- **About 27 rooms**, plus the painting worlds as separate side-view levels. Small enough to design every room properly.
- **Hub:** the entrance hall. The other areas branch off it.
- **Tenant areas:** each tenant owns a compact cluster of 2–3 rooms: their **home** (where you meet them) and the rooms around it they **haunt** (their lore, puzzles and haunting effects). The previous tenant's bat upgrade opens the way in. Clusters stay together; the Gargoyle is the one exception (he watches the cemetery from the tower roof).
- **Not every room belongs to a tenant:** Ambrose's rooms run through every floor (he roams the house), and the hubs are shared.
- **Gating:** bat-control upgrades, puzzles and story events.

### 7.2 Room list

| Owner | Rooms | Where |
|---|---|---|
| **Hubs (4)** | Entrance hall *(hub)*, Landing, Portrait gallery *(large; painting doors)*, **Liam's bedroom** | Ground, upper |
| **The Twins (3)** | **Nursery** *(home; with a playroom corner)*, Guest room, Linen closet *(secret passage)* | Upper floor |
| **The Poltergeist (2)** | **Library** *(home)*, Study | Ground floor |
| **The Empty Armour (2)** | **Ballroom** *(home; large)*, Billiard room | Ground floor |
| **The Banshee (3)** | **Music room** *(home)*, Garden terrace, Greenhouse | Ground floor, outside |
| **The Mummy (2)** | **Wine cellar** *(home)*, Boiler room | Basement |
| **The Gargoyle (3)** | **Tower roof** *(home)*, Cemetery, Family crypt | Tower, outside |
| **Ambrose (6)** | Dining room, Kitchen, Ambrose's pantry, **Sealed room**, Tower stairs, **Clock room** | Ground, basement, tower |
| **Endgame (2)** | Master bedroom *(previous owner's)*, Previous owner's studio | Upper floor, tower |

**Cut on 2026-10-21** (from the first draft of 43): Drawing room, Back hall, Servants' passage, Porch, second guest room, Bathroom, Scullery, Servants' hall, Attic storage, Front drive, Hedge maze ×3, second greenhouse, second cemetery, second crypt. The Playroom is merged into the Nursery.

### 7.3 Story rooms

- **Liam's bedroom** starts bare and fills with a memento from each tenant he helps: the found-family arc told through set dressing.
- **The sealed room:** the 1890s plan shows a door where there's now a wall. Ambrose walks through it at night; the room behind it holds his secret.
- **The clock room:** the great clock in the tower runs every clock in the house. Ambrose's clock-winding ritual leads there.

## 8. Art direction

### 8.1 Style

- **Gothic storybook pixel art:** Edward Gorey and Tim Burton illustrations translated into pixels. Darkly whimsical and deadpan; not anime, not cute, not horror.
- Angular, jagged shapes. Thick, slightly uneven inked outline (`#1A1020`). Flat colours, 2–3 tones per material, hatching instead of smooth shading. Matte, no shine. Light from the top-left.
- Every character has a **distinct palette**: Liam black/burgundy/silver, Ambrose sepia, the Twins faded white and grey. The full approved palette is in the art tracker.
- **Painting worlds** have their own palette and look (the Twins' world: an inked picture book on yellowed paper).
- **Interior:** faded grandeur: dusty, cobwebs, peeling corners, but intact. Faded sage-green damask wallpaper, warm mid-brown oak floors, walnut wainscot and mouldings, ochre velvet curtains, tarnished brass. Kept mid-tone so Liam's black and burgundy read clearly.

### 8.2 Sizes

| Item | Size |
|---|---|
| Internal resolution | **640×360**, scaled ×3 to 1080p |
| Tiles | **16×16 px** (one screen = 40×22 tiles) |
| Characters | **32×64 px** (Liam = 2×4 tiles); children 32×48 px (the Twins) |
| Bat form | 24×24 px |
| Dialogue portraits | 96×96 px, 8 expressions each |

### 8.3 Animation

- **4 directions;** right is the left mirrored. Down, left and up are drawn.
- **4–6 frames** per animation: few, strong keyframes. Code handles cheap motion (bobbing, shaking, fading, hit flash, candle glow).

### 8.4 Pipeline

- Images are generated with ChatGPT or Gemini from the prompts in `docs/Haunted_Mansion_Art_Prompts.xlsx` (one sheet per asset group, and one sheet per tenant with everything that tenant needs; `docs/PROMPTS.md` mirrors it).
- Every prompt is self-contained: style block, exact palette, solid magenta `#FF00FF` background, grid layout, no text.
- Each character's approved master turnaround is attached to all of that character's prompts.
- `tools/process_art.py`: chroma-key, auto-crop, palette snapping, nearest-neighbour resize, seamless tiles.
- Per-sheet options in `tools/art_sheets.json` include `remap` (swap colours after snapping; the Twins' hair is one step lighter so their dark eyes read), `still_body` (only the moving part changes between frames), `keep_alpha` (tiles drawn on magenta keep their transparency) and per-row animations for enemy sheets.

## 9. Technical defaults

- **Vanilla JavaScript + Canvas,** zero dependencies, no build step.
- All tunable numbers in `config.json`; all on-screen text in `texts.json`.
- Fallback rendering for every missing asset: the game runs before the art exists.
- Thick pixel font (DotGothic16) on solid panels with a dark outline; text stays on screen for about 1 s + 0.3 s per word (minimum 2 s).
- Deploy to Cloudflare Workers (`wrangler.jsonc`, server code in `worker/`).
- **Testing environment from day one:** testing modal, cheats (god mode, infinite resources, game speed, frame step), spawn anything, sandbox room, visual overlays, live config reload, save states, fixed random seed, automated smoke tests.

### 9.1 Current build

- **Test room:** one room with the oak floor, the sage back wall, a door, a sash window with curtains and two candle sconces. Liam enters through the door and strikes his door pose; then he walks in four directions, idles, fidgets (with a line) after standing still, and inspects things with E.
- **Day/night:** a real-time cycle (a full day is 240 s, in `config.json`). Dawn and dusk get a warm tint; at night the room darkens and the sconces light up with flickering candle light. The window glass switches to night.
- **Sunbeam:** daylight through the window falls on the floor as a slanted beam with dust motes and the window bar's shadow. In it, Liam walks at 45% speed and says a grumpy line once per day. E on the window cycles the curtains open → half → closed, which changes the beam. At night a faint moonbeam has no effect.
- **Room scale:** the back wall is 96 px (6 tiles) tall so it towers over Liam. Door 55×96, window 64×83, sconce 15×32, Liam about 58 px tall.
- **Bat form (testing tools → Bat form):** Turn into bat plays the startle, then the smoke puff, then he flies (110 px/s, hovering 18 px with a bob and a small shadow). Turn back plays the smoke in reverse. Panic bat: he lurches in random directions for 3 s, bouncing off walls, the keys only nudge him, then he turns back by himself. No interacting while a bat. All numbers in `config.json` → `bat`.
- **Ambrose in the test room:** he glides on his own (no body bob) with his candelabra as a moving light. By day he wanders between spots. Rarely (12% chance per stop, at most once every 2 minutes) he drifts: the drift pose, a slight fade, then he snaps back. He bows when Liam comes near (at most every 25 s). E talks to him; lines show one after another with portraits (his on the right), and E skips ahead. Odd conversations are the wrong-name gag (he calls Liam an older master's name each time, Liam corrects him, he agrees with the wrong name again); even ones are small talk, which he sometimes repeats ("I believe I mentioned that, sir."). He has special lines for the bat, for a drift and for each ritual.
- **Night rituals (20:00–05:30):** he sets the small dining table place by place (4 places), winds the grandfather clock back (its hands then stay at 3:00 until dawn) and walks through the left wall where the 1890s plan shows a door, fading out, gone for 6 s, then back. Dawn clears the table and restarts the clock. Liam can inspect the table and the clock. The table (72 px wide, with four staggered settings), the place settings (white china so they read on the cream cloth) and the clock (its hands are drawn by the game) use their real art (PROP-02 to PROP-04).
- **Pause menu:** Esc or P freezes the game and opens Resume, Controls (the controls hint), Testing tools and Restart room. A small "Esc: menu" hint shows for the first 6 seconds.
- **Testing toolkit:** testing panel (from the pause menu, or F1 / \`) with cheats, game speed, pause and frame step, a time-of-day slider, curtain controls, spawning (candle, Liam dummy playing any animation, Ambrose fallback, test dialogue) next to Liam or at the cursor, overlays (hitboxes, ranges/auras/sunbeam, nav grid, FPS, live values), live reload of `config.json` and `texts.json`, 3 save-state slots plus export/import, a fixed seed, and a copyable test link. The **sandbox** scene has an animation viewer that plays every sheet and shows a seam test for tiles. URL parameters are listed in `README.md`.
- **The Twins chapter (playable from start to end, scene `twins`):** five rooms built from `levels/twins.json` (Liam's bedroom, the landing, the nursery, the guest room, the linen closet). Walking up into a door (or E on it) fades to the next room; Liam strikes his door pose in each new room. The chapter follows the flow in 5.4 step by step: Ambrose's tea, the ball on the landing, the scripted first meeting, the hiding spots, the pull into the painting, the toy-army fight, "your turn to hide", the epilogue and the crayon drawing on Liam's wall, then a chapter card.
  - **Fright meter:** a bar at the top left. Scares fill it; it drains slowly. Full = a short panic into bat form in the same room, then it is empty. The first meeting fills it on purpose as the tutorial.
  - **The Twins:** Frida, and Wilhelmina as Frida mirrored. Slightly see-through, with a faint cold glow so they read in the dark. They speak together with one shared portrait.
  - **Bat at will:** after the Twins teach him, Q turns Liam into a bat and back. The bat can fly through doors and hide in the wardrobe.
  - **Cutscenes** are small scripts (`src/engine/script.js`); every line is in `texts.json` → `twins`, every number in `config.json` → `twins` and `fright`.
- **The toy-army fight (scene `toyfight`, side view):** the picture-book world with the moonlit window, a dimmed giant-toys layer, the toy fort (its towers and walkway are platforms) and two bookshelf planks. Liam runs, jumps (buffered, a little coyote time, short hop when the key is released), swipes his cape and throws crumpled sketches (a code-drawn placeholder). 5 HP shown as pages, a second of invulnerability after a hit, god mode in the testing tools.
  - Phase 1: three waves of tin soldiers (3, 4, 5). They march, wind up and lunge with the bayonet; a swipe or a sketch knocks them flat. The Twins throw toys from the towers.
  - Phase 2: the rocking horse rocks, leaps across the arena, lands and topples; hit it while it is down (5 hits).
  - Phase 3: tag both Twins (touch or swipe) while they float between the towers, the shelves and mid-air spots, still throwing toys.
  - Losing all HP retries the current phase with full HP. Winning returns to the nursery. Numbers in `config.json` → `side`.
- **Testing tools for the chapter:** jump to any step or room, add fright or panic now, find either twin, toggle bat at will; for the fight: pick the phase, refill HP, win the phase. Spawn the Twins, Ambrose or a scare in the house; soldiers, the horse or a thrown toy in the fight. Test links are in `README.md`.
- **Smoke tests:** `node tests/smoke.mjs` runs 115 checks in a headless browser and saves screenshots to `tests/screenshots/`: the test room (intro, movement, walls, curtains, sunbeam, dusk/night, day rollover, fidget, save states, config reload, the pause menu and testing panel, the bat form), Ambrose (schedule, greeting, conversations, drift, rituals, dawn reset), a scripted playthrough of the whole Twins chapter with a small bot for the fight, the fixed seed, the sandbox and every viewer page, and no-art runs.
- **Art pipeline:** `tools/process_art.py` keys out the magenta, snaps every pixel to the palette group (`tools/palette.json`, exported from the tracker) and downscales by block sampling: each output pixel takes the most common palette colour of its block, with dark ink colours winning so outlines and eye rings survive. It keeps each drawing whole even when it pokes over its grid cell (it is given to the cell that holds most of it), removes stray specks, trims tile seams and checks that tiles repeat cleanly. A sheet can also swap colours after processing (`remap`, used to turn the cream china white), line its frames up on their own boxes (`align`), and keep one frame for everything except a moving part (`still_body`, used so only the clock's pendulum moves). Sheet layouts and animation timings are in `tools/art_sheets.json`.
- **Font:** the DotGothic16 file has to be added to `assets/fonts/` by hand (download blocked from here); until then a bold system font is used.

## 10. Open questions

| Topic | Question |
|---|---|
| Story | Why does Liam inherit the mansion? Who was the previous owner? |
| Story | How does Ambrose learn he's dead? |
| Art | Ambrose's sepia blends a little with the oak floor by day; consider a darker coat or a rim light. |
| Tenants | Each tenant's origin (former resident or stranger, ghost or creature), story and unfinished business. One design session per tenant. |
| Twins | Dialogue is a first draft in `texts.json` → `twins`: review the voice and the jokes. |
| Twins | Fight difficulty is a first pass (a simple bot clears phase 1 with two defeats; phases 2 and 3 are easier). Tune in `config.json` → `side` after playtesting. |
| Art | Still code-drawn: the crumpled-sketch projectile, the crayon drawing on Liam's wall, the linen-closet shelves. The platform tileset (TWN-15) and the tin soldier (TWN-12) need their regens. |
| Gating | The upgrade order in 5.3 is a draft; confirm it once rooms are built. |
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
| 2026-10-21 | Six tenants: the Twins (tutorial), Poltergeist, Empty Armour, Banshee, Mummy, Gargoyle. Each mirrors one of Liam's fears and grants one bat upgrade. Tenants are a mix of residents and strangers, not all ghosts. No painter; painting worlds are magic doors in the gallery. Tower roof added. |
| 2026-10-21 | World shrunk to about 27 rooms, grouped by owner: each tenant has a compact cluster (home + haunted rooms), Ambrose has his own rooms, plus hubs and endgame. Hedge maze cut. |
| 2026-10-21 | The Twins: 1890s ghost girls in perfect unison; Ambrose was their seeker and never came. Menacing first meeting (first big bat panic), toy-army painting fight, resolved by Liam finding them, then hiding as a bat on purpose (transform at will); Ambrose says "Found you" in the epilogue. |
| 2026-10-21 | The Twins are Frida and Wilhelmina. Ambrose stopped counting because he died mid-count. |
| 2026-10-21 | Ambrose's death hour is 9 pm (was a 3:00 placeholder); the stopped clock now shows nine. |
| 2026-10-21 | Twins art direction: faded white and grey, big dark eyes, tiny smiles; mirror images (Frida's bow left, Wilhelmina's right), only Frida is drawn. 32×48 px. Toy army, picture-book world (own palette) and nursery props designed; 27 prompts (TWN-00 to TWN-26) in the new Twins sheet of the tracker. |
| 2026-10-23 | Liam's projectile: crumpled sketches (placeholder art for now). Twins chapter flow: Ambrose sends Liam from his bedroom; scripted first-meeting panic; hand-placed hiding spots (scare, clue or twin); finding both triggers the painting; the fight retries the current phase; a full fright meter outside fights causes a short bat panic in the same room. |
| 2026-10-23 | Twins, toy army, picture-book world, nursery props and Liam's side-view swipe/throw/hurt processed (29 new sprite sheets, all in the sandbox viewer). Twins drawn at 48 px; the platform tileset is hand-cut as a stopgap until its regen. |
| 2026-10-23 | The Twins chapter is playable from start to end: five rooms with doors, the fright meter, hide-and-seek, the side-view toy-army fight (3 phases, phase retry), bat at will (Q), the epilogue and the memento. |
