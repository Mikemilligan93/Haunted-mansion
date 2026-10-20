# Art prompts

*Mirror of `docs/Haunted_Mansion_Art_Prompts.xlsx`. The spreadsheet is the source of truth (status tracking lives there); this file is regenerated from it.*

## Liam

| ID | Asset | Priority | Status | Output file |
|---|---|---|---|---|
| LIAM-00 | Master reference (turnaround) | Must | Approved | `liam_master.png` |
| LIAM-01 | Dialogue portraits (8 expressions) | Must | In game | `liam_portraits.png` |
| LIAM-02 | Top-down idle | Must | In game | `liam_td_idle.png` |
| LIAM-03 | Top-down walk | Must | In game | `liam_td_walk.png` |
| LIAM-04 | Top-down inspect / interact | Must | In game | `liam_td_inspect.png` |
| LIAM-05 | Top-down hurt | Must | Processed | `liam_td_hurt.png` |
| LIAM-06 | Top-down cape swipe (melee) | Must | Processed | `liam_td_swipe.png` |
| LIAM-07 | Top-down throw (projectile) | Must | Processed | `liam_td_throw.png` |
| LIAM-08 | Top-down startle | Must | Processed | `liam_td_startle.png` |
| LIAM-09 | Top-down cower | Must | Processed | `liam_td_cower.png` |
| LIAM-10 | Door pose (signature) | Must | In game | `liam_td_doorpose.png` |
| LIAM-11 | Door pose mood variants | Nice | Processed | `liam_td_doorpose_moods.png` |
| LIAM-12 | Long-idle fidgets | Nice | In game | `liam_td_fidget.png` |
| LIAM-13 | Bat transform (smoke puff) | Must | Processed | `liam_bat_transform.png` |
| LIAM-14 | Bat fly | Must | Processed | `liam_bat_fly.png` |
| LIAM-15 | Side-view idle | Must | Processed | `liam_sv_idle.png` |
| LIAM-16 | Side-view run | Must | Processed | `liam_sv_run.png` |
| LIAM-17 | Side-view jump + land | Must | Processed | `liam_sv_jump.png` |
| LIAM-18 | Side-view cape swipe | Must | To do | `liam_sv_swipe.png` |
| LIAM-19 | Side-view throw | Must | To do | `liam_sv_throw.png` |
| LIAM-20 | Side-view hurt | Must | To do | `liam_sv_hurt.png` |

### LIAM-00: Master reference (turnaround)

- **Mode:** Reference · **Directions:** Down, Left, Right, Up · **Frames:** 4
- **Grid:** 1 row x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_v2_lanky.png (style reference used for the approved run) · **Output:** `liam_master.png`
- **Notes:** APPROVED 2026-10-19. This image is attached to every other Liam prompt. Do not regenerate unless the design changes.

```
Create a pixel-art character sprite sheet for a top-down 2D game (3/4 view).
If a reference image of this character is attached, match its art style, line work, face, expression, outfit and colours exactly. The ONLY change from the reference is the proportions: make the head bigger as described below. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.
- Designed to be downscaled to a 32x64 pixel sprite, so keep shapes bold and readable; each pixel should be a clearly visible square block (about 8x8 screen pixels).

PROPORTIONS
- Lanky and gaunt, but with an enlarged head: the head (including hair) is about 25-30% of the total height, so the face stays readable at small size.
- The head is long and angular, not round: a narrow, inverted-triangle face tapering to a pointed chin. Plain, odd-looking, a little sickly; not handsome, not delicate.
- Thin neck. Narrow, skinny body. Long, stick-thin arms and legs. Small bony hands.
- Overall impression: a tired, sleepless young artist.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.
- Expression: deadpan and weary, trying to look dignified and menacing, not quite succeeding.
- Hands empty.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- One horizontal row of exactly four characters, four columns, each cell 384x1024 pixels.
- Same standing idle pose in every cell, arms hanging straight down, the character centred in its cell, feet on the same baseline (about 88% down the canvas), identical size and scale in all four cells. The character is about 640 pixels tall and about 256 pixels wide at most.
- Column order, left to right:
  1. Facing down (toward the viewer): face with both eyes visible, shirt front, jabot, collar behind the head, burgundy lining visible.
  2. Facing left: side profile showing the pointed chin, nose and pointed ear, cape drape, a sliver of burgundy lining at the cape edge.
  3. Facing right: exact mirror of column 2.
  4. Facing up (away from the viewer): back of the head with the ragged hair clumps and both ear tips, black cape exterior with ragged hem, pointed collar rising above the shoulders.
- Leave clear empty space between the characters; nothing may touch or overlap a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-01: Dialogue portraits (8 expressions)

- **Mode:** Portrait · **Directions:** 3/4 facing right · **Frames:** 8
- **Grid:** 2 rows x 4 cols, 1536x1024 · **In-game size:** 96x96
- **Attach:** liam_master.png · **Output:** `liam_portraits.png`
- **Notes:** Order: grand, smug, flat, startled, panicked, embarrassed, soft, sad. Flat is the default portrait.

```
Create a set of pixel-art dialogue portraits (character busts) for a 2D game. They appear next to the dialogue box.

A reference image of this character (liam_master.png, a four-direction turnaround) is attached. Match its art style, line work, proportions, face, outfit and colours exactly. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS
- Bust portrait: head, neck, shoulders and the top of the chest with the jabot and the stand-up cape collar. The head is long and angular with a pointed chin, as in the reference.
- The face is large and detailed enough to read the expression clearly.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

EXPRESSIONS, one per cell, left to right then top to bottom:
  1. Grand: his 'proper vampire' performance. Chin raised, eyes half-closed in theatrical superiority, one hand raised to the collar as if sweeping the cape, fangs showing in a forced dramatic smile.
  2. Smug: bravado. Half-lidded eyes, one eyebrow raised, small lopsided smirk with one fang visible.
  3. Flat: his real deadpan voice. Neutral, weary, completely expressionless, mouth a flat line. This is the default portrait.
  4. Startled: just got scared. Eyes wide open (pupils still tiny dots), eyebrows shot up, hair puffed and standing up more than usual, mouth a small open O.
  5. Panicked: about to turn into a bat. Eyes huge and wobbly, mouth wide open in a silent scream, both fangs visible, hands clutching his cheeks, hair standing straight up.
  6. Embarrassed: after a scare, caught being afraid. Eyes looking away to the side, faint #C7B9CC blush lines on the cheeks, mouth a tight wavy line, one hand rubbing the back of his neck.
  7. Soft: his kindness showing. Eyes gently open, eyebrows relaxed, a small genuine closed-mouth smile. The warmest expression in the set, but still in the same gaunt style.
  8. Sad: the rare sincere moment. Eyes downcast, eyebrows tilted up in the middle, mouth slightly turned down, shoulders a little slumped. Quiet, not crying.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 2 rows and 4 columns of equal cells, each cell 384x512 pixels. One portrait per cell, 8 portraits in total.
- Every portrait is a three-quarter view with his body and face turned slightly toward the RIGHT side of the image (the portrait is mirrored in code when needed).
- Same framing in every cell: the top of the hair about 10% below the top of the cell, the bust cut off flat at the bottom of the cell, the head centred horizontally.
- Same size, scale, lighting and design in all eight cells; only the expression, eyebrows, mouth, hands and hair puffiness change.
- Designed to be downscaled to 96x96 pixels per portrait (taking the top square of each cell), so keep shapes bold and readable; each pixel should be a clearly visible square block.
- Nothing may touch or cross a cell border except the flat bottom cut of the bust.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-02: Top-down idle

- **Mode:** Top-down · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 4
- **Grid:** 3 rows x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png · **Output:** `liam_td_idle.png`
- **Notes:** Loop. Plays most of the time; keep it subtle.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

A reference image of this character (liam_master.png, a four-direction turnaround) is attached. Match its art style, line work, proportions, face, outfit and colours exactly. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS
- Lanky and gaunt, but with an enlarged head: the head (including hair) is about 25-30% of the total height, so the face stays readable at small size.
- The head is long and angular, not round: a narrow, inverted-triangle face tapering to a pointed chin. Plain, odd-looking, a little sickly; not handsome, not delicate.
- Thin neck. Narrow, skinny body. Long, stick-thin arms and legs. Small bony hands.
- Overall impression: a tired, sleepless young artist.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Idle loop (standing still, breathing). Subtle and calm: he stands straight, arms hanging down.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Neutral standing pose.
  2. Breathing in: shoulders and head 1 pixel higher, cape hem swings very slightly.
  3. Neutral standing pose, cape hem settled the other way.
  4. Breathing out: shoulders 1 pixel lower, a tiny tired slump.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 4 columns of equal cells, each cell 384x341 pixels. One pose per cell, 12 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer): face, shirt front, jabot, burgundy lining visible on both inner sides of the cape.
  2. Facing left: side profile with pointed chin, nose and pointed ear; a sliver of burgundy lining at the cape edge. (The right-facing version is made by mirroring this row in code, so draw LEFT only.)
  3. Facing up (away from the viewer): back of the head with the ragged hair clumps and both ear tips, black cape exterior, pointed collar above the shoulders.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-03: Top-down walk

- **Mode:** Top-down · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 6
- **Grid:** 3 rows x 6 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png · **Output:** `liam_td_walk.png`
- **Notes:** Loop. Walk speed in config.json; daylight = slower playback, no extra art.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

A reference image of this character (liam_master.png, a four-direction turnaround) is attached. Match its art style, line work, proportions, face, outfit and colours exactly. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS
- Lanky and gaunt, but with an enlarged head: the head (including hair) is about 25-30% of the total height, so the face stays readable at small size.
- The head is long and angular, not round: a narrow, inverted-triangle face tapering to a pointed chin. Plain, odd-looking, a little sickly; not handsome, not delicate.
- Thin neck. Narrow, skinny body. Long, stick-thin arms and legs. Small bony hands.
- Overall impression: a tired, sleepless young artist.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Walk cycle. A slightly stiff, self-conscious walk, as if he is trying to walk like a dignified vampire. Arms swing a little, the cape sways behind him with the ragged hem trailing.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Contact: left foot forward, right foot back, cape swinging right.
  2. Down: weight on the left foot, body 1 pixel lower.
  3. Passing: right leg passing the left, body upright.
  4. Contact: right foot forward, left foot back, cape swinging left.
  5. Down: weight on the right foot, body 1 pixel lower.
  6. Passing: left leg passing the right, body upright.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 6 columns of equal cells, each cell 256x341 pixels. One pose per cell, 18 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer): face, shirt front, jabot, burgundy lining visible on both inner sides of the cape.
  2. Facing left: side profile with pointed chin, nose and pointed ear; a sliver of burgundy lining at the cape edge. (The right-facing version is made by mirroring this row in code, so draw LEFT only.)
  3. Facing up (away from the viewer): back of the head with the ragged hair clumps and both ear tips, black cape exterior, pointed collar above the shoulders.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-04: Top-down inspect / interact

- **Mode:** Top-down · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 3
- **Grid:** 3 rows x 3 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png · **Output:** `liam_td_inspect.png`
- **Notes:** Plays once, holds the last frame while the inspect text is shown, then plays in reverse.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

A reference image of this character (liam_master.png, a four-direction turnaround) is attached. Match its art style, line work, proportions, face, outfit and colours exactly. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS
- Lanky and gaunt, but with an enlarged head: the head (including hair) is about 25-30% of the total height, so the face stays readable at small size.
- The head is long and angular, not round: a narrow, inverted-triangle face tapering to a pointed chin. Plain, odd-looking, a little sickly; not handsome, not delicate.
- Thin neck. Narrow, skinny body. Long, stick-thin arms and legs. Small bony hands.
- Overall impression: a tired, sleepless young artist.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Inspect / interact. He leans in to look at something or touch it, curious but wary.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Neutral standing pose, looking ahead.
  2. Leaning forward slightly, one hand rising toward the object, eyes narrowed.
  3. Full lean, hand extended at chest height, fingers reaching, peering closely (hold frame).

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 3 columns of equal cells, each cell 512x341 pixels. One pose per cell, 9 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer): face, shirt front, jabot, burgundy lining visible on both inner sides of the cape.
  2. Facing left: side profile with pointed chin, nose and pointed ear; a sliver of burgundy lining at the cape edge. (The right-facing version is made by mirroring this row in code, so draw LEFT only.)
  3. Facing up (away from the viewer): back of the head with the ragged hair clumps and both ear tips, black cape exterior, pointed collar above the shoulders.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-05: Top-down hurt

- **Mode:** Top-down · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 2
- **Grid:** 3 rows x 2 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png + liam_td_walk.png · **Output:** `liam_td_hurt.png`
- **Notes:** Regenerate: came out lankier and bigger than the walk sheet; would pop on every hit. The white hit-flash is done in code.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Hurt reaction. He gets hit and recoils.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Recoil: body jerked backward, head tilted back, eyes squeezed shut, mouth open, hair and cape flung forward by the jolt.
  2. Stagger: off-balance, knees bent, one arm flailing, eyes wide.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 2 columns of equal cells, each cell 768x341 pixels. One pose per cell, 6 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer): face, shirt front, jabot, burgundy lining visible on both inner sides of the cape.
  2. Facing left: side profile with pointed chin, nose and pointed ear; a sliver of burgundy lining at the cape edge. (The right-facing version is made by mirroring this row in code, so draw LEFT only.)
  3. Facing up (away from the viewer): back of the head with the ragged hair clumps and both ear tips, black cape exterior, pointed collar above the shoulders.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-06: Top-down cape swipe (melee)

- **Mode:** Top-down · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 4
- **Grid:** 3 rows x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png · **Output:** `liam_td_swipe.png`
- **Notes:** The strike frame may be wider than the idle pose; keep it inside the cell. Hitbox defined in config.json.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

A reference image of this character (liam_master.png, a four-direction turnaround) is attached. Match its art style, line work, proportions, face, outfit and colours exactly. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS
- Lanky and gaunt, but with an enlarged head: the head (including hair) is about 25-30% of the total height, so the face stays readable at small size.
- The head is long and angular, not round: a narrow, inverted-triangle face tapering to a pointed chin. Plain, odd-looking, a little sickly; not handsome, not delicate.
- Thin neck. Narrow, skinny body. Long, stick-thin arms and legs. Small bony hands.
- Overall impression: a tired, sleepless young artist.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Cape swipe melee attack. He grabs the edge of his cape and whips it in a wide horizontal arc in front of him, like a matador with a whip. The swept cape is the attack hitbox, so the cape must clearly extend far in front of him in frame 3.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Anticipation: he grabs the cape edge with one hand and pulls it back behind him, body twisted away, burgundy lining showing.
  2. Swing: the cape whips forward, body untwisting, cape mid-arc and stretched wide.
  3. Strike: the cape fully extended in a wide sharp fan in the facing direction, ragged hem pointed outward like blades, burgundy lining fully visible.
  4. Recover: cape falling back down around him, he straightens up with a slightly smug look.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 4 columns of equal cells, each cell 384x341 pixels. One pose per cell, 12 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer): face, shirt front, jabot, burgundy lining visible on both inner sides of the cape.
  2. Facing left: side profile with pointed chin, nose and pointed ear; a sliver of burgundy lining at the cape edge. (The right-facing version is made by mirroring this row in code, so draw LEFT only.)
  3. Facing up (away from the viewer): back of the head with the ragged hair clumps and both ear tips, black cape exterior, pointed collar above the shoulders.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-07: Top-down throw (projectile)

- **Mode:** Top-down · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 4
- **Grid:** 3 rows x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png · **Output:** `liam_td_throw.png`
- **Notes:** Projectile not decided yet (teacups / glare / tiny bats / sketches). The animation is generic.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

A reference image of this character (liam_master.png, a four-direction turnaround) is attached. Match its art style, line work, proportions, face, outfit and colours exactly. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS
- Lanky and gaunt, but with an enlarged head: the head (including hair) is about 25-30% of the total height, so the face stays readable at small size.
- The head is long and angular, not round: a narrow, inverted-triangle face tapering to a pointed chin. Plain, odd-looking, a little sickly; not handsome, not delicate.
- Thin neck. Narrow, skinny body. Long, stick-thin arms and legs. Small bony hands.
- Overall impression: a tired, sleepless young artist.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Throw. He throws a small object overhand in the facing direction. DO NOT draw the thrown object: his hand is empty in every frame; the projectile is a separate sprite.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Wind-up: throwing arm raised back behind his head, body leaning back, other arm forward for balance.
  2. Throw: arm swinging forward over his shoulder, body leaning into it, cape swinging.
  3. Release: arm fully extended forward in the facing direction, hand open, fingers spread.
  4. Follow-through: arm dropping down across the body, he steadies himself.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 4 columns of equal cells, each cell 384x341 pixels. One pose per cell, 12 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer): face, shirt front, jabot, burgundy lining visible on both inner sides of the cape.
  2. Facing left: side profile with pointed chin, nose and pointed ear; a sliver of burgundy lining at the cape edge. (The right-facing version is made by mirroring this row in code, so draw LEFT only.)
  3. Facing up (away from the viewer): back of the head with the ragged hair clumps and both ear tips, black cape exterior, pointed collar above the shoulders.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-08: Top-down startle

- **Mode:** Top-down · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 4
- **Grid:** 3 rows x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png · **Output:** `liam_td_startle.png`
- **Notes:** Also the first step of the defeat sequence (startle, bat transform, panic flight). Fright meter in config.json.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

A reference image of this character (liam_master.png, a four-direction turnaround) is attached. Match its art style, line work, proportions, face, outfit and colours exactly. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS
- Lanky and gaunt, but with an enlarged head: the head (including hair) is about 25-30% of the total height, so the face stays readable at small size.
- The head is long and angular, not round: a narrow, inverted-triangle face tapering to a pointed chin. Plain, odd-looking, a little sickly; not handsome, not delicate.
- Thin neck. Narrow, skinny body. Long, stick-thin arms and legs. Small bony hands.
- Overall impression: a tired, sleepless young artist.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Startle. A jump scare: something frightens him and he jolts.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Neutral standing pose, unaware.
  2. Jolt: he jumps a little off the ground, whole body stiff and straight, arms pinned to his sides, eyes wide, mouth a small O, hair standing up.
  3. Peak: highest point, hair fully on end, cape flared outward, eyes huge.
  4. Land: back on the ground, frozen stiff, eyes still wide, hair still puffed up.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 4 columns of equal cells, each cell 384x341 pixels. One pose per cell, 12 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer): face, shirt front, jabot, burgundy lining visible on both inner sides of the cape.
  2. Facing left: side profile with pointed chin, nose and pointed ear; a sliver of burgundy lining at the cape edge. (The right-facing version is made by mirroring this row in code, so draw LEFT only.)
  3. Facing up (away from the viewer): back of the head with the ragged hair clumps and both ear tips, black cape exterior, pointed collar above the shoulders.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-09: Top-down cower

- **Mode:** Top-down · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 4
- **Grid:** 3 rows x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png · **Output:** `liam_td_cower.png`
- **Notes:** Loop. Shown while fright meter is above the threshold in config.json.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

A reference image of this character (liam_master.png, a four-direction turnaround) is attached. Match its art style, line work, proportions, face, outfit and colours exactly. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS
- Lanky and gaunt, but with an enlarged head: the head (including hair) is about 25-30% of the total height, so the face stays readable at small size.
- The head is long and angular, not round: a narrow, inverted-triangle face tapering to a pointed chin. Plain, odd-looking, a little sickly; not handsome, not delicate.
- Thin neck. Narrow, skinny body. Long, stick-thin arms and legs. Small bony hands.
- Overall impression: a tired, sleepless young artist.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Cower loop. The fright meter is high: he hunches over and clutches the cape around himself like a blanket, trembling.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Hunched, both hands pulling the cape closed in front of his chest, only his head and eyes peeking over the collar, eyes darting to one side.
  2. Same pose shifted 1 pixel to the side (trembling), eyes darting to the other side.
  3. Same pose, shoulders 1 pixel lower, eyes wide.
  4. Same pose shifted 1 pixel back, eyes darting again.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 4 columns of equal cells, each cell 384x341 pixels. One pose per cell, 12 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer): face, shirt front, jabot, burgundy lining visible on both inner sides of the cape.
  2. Facing left: side profile with pointed chin, nose and pointed ear; a sliver of burgundy lining at the cape edge. (The right-facing version is made by mirroring this row in code, so draw LEFT only.)
  3. Facing up (away from the viewer): back of the head with the ragged hair clumps and both ear tips, black cape exterior, pointed collar above the shoulders.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-10: Door pose (signature)

- **Mode:** Top-down · **Directions:** Down only · **Frames:** 4
- **Grid:** 1 row x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png + liam_td_walk.png · **Output:** `liam_td_doorpose.png`
- **Notes:** Regenerate: came out lanky like the master; he would change shape on every room entry. Plays on entering a new room; skippable. Hold frame 3 duration in config.json.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Door pose. His signature dramatic entrance whenever he enters a new room, performed for an audience that is not there. Theatrical, a little over the top.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Arrival: standing, chin raised, one hand gripping the cape edge.
  2. Sweep: the arm sweeps the cape up and out to the side, burgundy lining flashing, body turning slightly.
  3. Pose (hold frame): cape held up and spread like a bat wing beside him, other hand on his hip or raised dramatically, chin up, eyes half-closed in theatrical superiority, fangs showing in a forced grin.
  4. Relax: cape dropping, shoulders slumping, his face back to deadpan, as if he realised nobody saw it.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 4 columns of equal cells, each cell 384x1024 pixels. One pose per cell, 4 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer), the only direction for this animation.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-11: Door pose mood variants

- **Mode:** Top-down · **Directions:** Down only · **Frames:** 12
- **Grid:** 3 rows x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png + liam_td_doorpose.png · **Output:** `liam_td_doorpose_moods.png`
- **Notes:** Rows: proud, nervous, exhausted. Chosen by story state.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

A reference image of this character (liam_master.png, a four-direction turnaround) is attached. Match its art style, line work, proportions, face, outfit and colours exactly. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS
- Lanky and gaunt, but with an enlarged head: the head (including hair) is about 25-30% of the total height, so the face stays readable at small size.
- The head is long and angular, not round: a narrow, inverted-triangle face tapering to a pointed chin. Plain, odd-looking, a little sickly; not handsome, not delicate.
- Thin neck. Narrow, skinny body. Long, stick-thin arms and legs. Small bony hands.
- Overall impression: a tired, sleepless young artist.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Door pose mood variants. The same signature entrance (arrive, sweep the cape, hold a dramatic pose, relax), performed in three different moods, one mood per row. If the approved door pose sheet is attached, keep the same sequence and only change the mood.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Arrival.
  2. Cape sweep.
  3. Dramatic pose (hold frame).
  4. Relax.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 4 columns of equal cells, each cell 384x341 pixels. One pose per cell, 12 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head. All rows face down (toward the viewer).
- Row order, top to bottom:
  1. Proud: big confident sweep, cape fully spread, chest out, a smug grin; the relax frame stays upright and pleased.
  2. Nervous: a half-hearted, shaky sweep, cape only half raised, eyes glancing to the side, forced smile; the relax frame shrinks into the collar.
  3. Exhausted: a limp sweep, cape barely lifted, droopy eyes, slouched; the relax frame is a full slump with arms hanging.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-12: Long-idle fidgets

- **Mode:** Top-down · **Directions:** Down only · **Frames:** 18
- **Grid:** 3 rows x 6 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png + liam_td_walk.png · **Output:** `liam_td_fidget.png`
- **Notes:** Rows: talk to cape, fix hair, rehearse pose. Idle timeout in config.json.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Long-idle fidgets. Little personality animations that play when the player leaves him standing still for a while. Each row is a separate 6-frame fidget.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Start pose.
  2. Building up.
  3. Main action.
  4. Main action continued.
  5. Winding down.
  6. Back to neutral standing pose.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 6 columns of equal cells, each cell 256x341 pixels. One pose per cell, 18 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head. All rows face down (toward the viewer).
- Row order, top to bottom:
  1. Talking to the cape: he lifts the cape edge in one hand, looks at it, says something to it with a deadpan face, waits for an answer that never comes, then lets it drop.
  2. Fixing his hair: he tries to smooth his messy silver hair flat with both hands; the moment he lets go it springs back up, messier than before; he sighs.
  3. Rehearsing a pose: he tries a dramatic vampire pose, frowns, tries a different one, gives up and stands normally.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-13: Bat transform (smoke puff)

- **Mode:** Bat · **Directions:** Down only · **Frames:** 5
- **Grid:** 1 row x 5 cols, 1536x1024 · **In-game size:** 32x64 cell (bat 24x24)
- **Attach:** liam_master.png + liam_td_walk.png · **Output:** `liam_bat_transform.png`
- **Notes:** Frame 1 is lanky and off-model: the game skips it and starts the transform from the last startle frame (LIAM-08), so no regen needed. Reverse = transform back. Defeat = startle + this + panic flight (no extra art). Bat target 24x24.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.
BAT FORM (only where this prompt asks for the bat)
- A small bat that is clearly still Liam: black furry body (#1C1A24, #2E2B3A), wings with wine-burgundy membranes (#4A1626, #6E1F35) and a bright crimson edge (#A8323E), black wing bones.
- A messy tuft of silver-white hair (#C9D3E0, #E8EEF5) on top of the head, two pointed ears, small pale grey eyes with dark rings, one tiny crooked fang, a tiny cream ruffle at the neck.
- Deadpan, slightly worried expression. Cute but in the same gaunt, inky gothic style; not kawaii.
- In the game the bat is about 24x24 pixels, so in the image it is roughly a third of Liam's height.
SMOKE (only where this prompt asks for it)
- A puff of angular, jagged smoke clouds in #474359, #8B95A8 and #C9D3E0 with the usual dark outline. Flat, no glow, no transparency.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Bat transformation. Liam turns into a bat in a puff of smoke. Played forwards to transform, backwards to transform back.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Liam standing, facing the viewer, startled: eyes wide, hair up, arms pulling the cape around himself.
  2. Liam wrapped tightly in his cape, his shape shrinking and starting to dissolve into jagged smoke at the edges.
  3. A full jagged smoke puff where Liam was; his silver hair tuft just visible at the top of the cloud.
  4. The smoke puff breaking apart, the small bat emerging from the middle with wings spread.
  5. Only the small bat, hovering in the centre of the cell, wings spread, a few last wisps of smoke.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 5 columns of equal cells, each cell 307x1024 pixels. One pose per cell, 5 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer).

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-14: Bat fly

- **Mode:** Bat · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 4
- **Grid:** 3 rows x 4 cols, 1536x1024 · **In-game size:** 24x24
- **Attach:** liam_master.png + liam_td_walk.png + liam_bat_transform.png · **Output:** `liam_bat_fly.png`
- **Notes:** Panic flight = same frames, erratic movement in code. Also used in side-view.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.
BAT FORM (only where this prompt asks for the bat)
- A small bat that is clearly still Liam: black furry body (#1C1A24, #2E2B3A), wings with wine-burgundy membranes (#4A1626, #6E1F35) and a bright crimson edge (#A8323E), black wing bones.
- A messy tuft of silver-white hair (#C9D3E0, #E8EEF5) on top of the head, two pointed ears, small pale grey eyes with dark rings, one tiny crooked fang, a tiny cream ruffle at the neck.
- Deadpan, slightly worried expression. Cute but in the same gaunt, inky gothic style; not kawaii.
SMOKE (only where this prompt asks for it)
- A puff of angular, jagged smoke clouds in #474359, #8B95A8 and #C9D3E0 with the usual dark outline. Flat, no glow, no transparency.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Bat flying loop. Draw ONLY the bat (no human Liam, no smoke). The bat is drawn large, filling about 70% of each cell, so its details are readable. If the approved transform sheet is attached, match the bat in its last frame exactly.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Wings fully up.
  2. Wings level, mid-stroke.
  3. Wings fully down.
  4. Wings level, coming back up.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 4 columns of equal cells, each cell 384x341 pixels. One pose per cell, 12 poses in total.
- Designed to be downscaled to 24x24 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The bat fills about 70% of the cell, centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Flying toward the viewer: face, both wings spread symmetrically.
  2. Flying left, side view: one wing in front, one behind, profile with pointed ear and silver tuft. (Right = mirror in code; draw LEFT only.)
  3. Flying away from the viewer: back of the bat, silver tuft, both wings from behind.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- The bat's body stays at the same height and centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-15: Side-view idle

- **Mode:** Side-view · **Directions:** Right (Left = mirror) · **Frames:** 4
- **Grid:** 1 row x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png + liam_td_walk.png · **Output:** `liam_sv_idle.png`
- **Notes:** Regenerated 2026-10-19: now matches the side-view run. Attach liam_sv_run.png as well. Loop. Side view faces right; left = mirror in code.

```
Create a pixel-art animation sprite sheet for a 2D side-scrolling platformer (pure side view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Side-view idle loop. Standing still in a slightly wary stance, knees a little bent, ready to dodge.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Neutral stance.
  2. Breathing in, shoulders 1 pixel higher, cape hem swaying back.
  3. Neutral stance, cape settled.
  4. Breathing out, tiny slump.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 4 columns of equal cells, each cell 384x1024 pixels. One pose per cell, 4 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: pure side view for a 2D side-scrolling platformer (not top-down, not 3/4). The character faces RIGHT in every frame.
- Row order, top to bottom:
  1. Facing right, side profile: pointed chin, nose and pointed ear visible, cape trailing behind him to the left.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-16: Side-view run

- **Mode:** Side-view · **Directions:** Right (Left = mirror) · **Frames:** 6
- **Grid:** 1 row x 6 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png + liam_td_walk.png · **Output:** `liam_sv_run.png`
- **Notes:** Loop. Run speed in config.json.

```
Create a pixel-art animation sprite sheet for a 2D side-scrolling platformer (pure side view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Side-view run cycle. A frantic, gangly, slightly awkward run: long thin legs taking big strides, body leaning forward, arms pumping stiffly, cape streaming out horizontally behind him.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Contact: right leg forward, left leg back.
  2. Down: right foot planted, body low, knees bent.
  3. Push-off: left leg driving forward, body rising.
  4. Contact: left leg forward, right leg back.
  5. Down: left foot planted, body low.
  6. Push-off: right leg driving forward, body rising.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 6 columns of equal cells, each cell 256x1024 pixels. One pose per cell, 6 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: pure side view for a 2D side-scrolling platformer (not top-down, not 3/4). The character faces RIGHT in every frame.
- Row order, top to bottom:
  1. Facing right, side profile: pointed chin, nose and pointed ear visible, cape trailing behind him to the left.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-17: Side-view jump + land

- **Mode:** Side-view · **Directions:** Right (Left = mirror) · **Frames:** 5
- **Grid:** 1 row x 5 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png + liam_td_walk.png · **Output:** `liam_sv_jump.png`
- **Notes:** Frames 1-3 chosen by vertical speed in code; 4-5 play on landing.

```
Create a pixel-art animation sprite sheet for a 2D side-scrolling platformer (pure side view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Side-view jump. Separate poses for rising, apex, falling and landing.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Rise: knees pulled up, arms up, cape hanging down and back below him, body stretched upward.
  2. Apex: body curled slightly, cape floating out around him like an open umbrella, eyes wide.
  3. Fall: legs reaching down, arms raised and flailing a little, cape billowing up above him.
  4. Land (squash): knees deeply bent, body squashed low, cape settling over him.
  5. Recover: standing up into the idle stance, smoothing the cape.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 5 columns of equal cells, each cell 307x1024 pixels. One pose per cell, 5 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: pure side view for a 2D side-scrolling platformer (not top-down, not 3/4). The character faces RIGHT in every frame.
- Row order, top to bottom:
  1. Facing right, side profile: pointed chin, nose and pointed ear visible, cape trailing behind him to the left.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-18: Side-view cape swipe

- **Mode:** Side-view · **Directions:** Right (Left = mirror) · **Frames:** 4
- **Grid:** 1 row x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png + liam_td_walk.png · **Output:** `liam_sv_swipe.png`
- **Notes:** Strike frame may be wide; keep it inside the cell. Hitbox in config.json.

```
Create a pixel-art animation sprite sheet for a 2D side-scrolling platformer (pure side view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Side-view cape swipe melee attack. He grabs the edge of the cape and whips it forward in a wide arc to the right like a matador's whip. The swept cape is the hitbox, so it must clearly extend far to the right in frame 3.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Anticipation: body twisted back to the left, cape edge pulled behind him, burgundy lining showing.
  2. Swing: cape whipping over and forward, body turning toward the right.
  3. Strike: cape fully extended in a wide sharp fan to the right, ragged hem pointed outward like blades.
  4. Recover: cape falling back, he straightens with a smug look.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 4 columns of equal cells, each cell 384x1024 pixels. One pose per cell, 4 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: pure side view for a 2D side-scrolling platformer (not top-down, not 3/4). The character faces RIGHT in every frame.
- Row order, top to bottom:
  1. Facing right, side profile: pointed chin, nose and pointed ear visible, cape trailing behind him to the left.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-19: Side-view throw

- **Mode:** Side-view · **Directions:** Right (Left = mirror) · **Frames:** 4
- **Grid:** 1 row x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png + liam_td_walk.png · **Output:** `liam_sv_throw.png`
- **Notes:** Projectile is a separate sprite, not decided yet.

```
Create a pixel-art animation sprite sheet for a 2D side-scrolling platformer (pure side view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Side-view overhand throw to the right. DO NOT draw the thrown object: his hand is empty in every frame.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Wind-up: throwing arm raised back behind his head, leaning back.
  2. Throw: arm swinging forward over the shoulder, leaning into it.
  3. Release: arm fully extended to the right, hand open.
  4. Follow-through: arm dropping across his body, steadying himself.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 4 columns of equal cells, each cell 384x1024 pixels. One pose per cell, 4 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: pure side view for a 2D side-scrolling platformer (not top-down, not 3/4). The character faces RIGHT in every frame.
- Row order, top to bottom:
  1. Facing right, side profile: pointed chin, nose and pointed ear visible, cape trailing behind him to the left.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### LIAM-20: Side-view hurt

- **Mode:** Side-view · **Directions:** Right (Left = mirror) · **Frames:** 2
- **Grid:** 1 row x 2 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png + liam_td_walk.png · **Output:** `liam_sv_hurt.png`
- **Notes:** Hit-flash and knockback in code.

```
Create a pixel-art animation sprite sheet for a 2D side-scrolling platformer (pure side view).

Two reference images of this character are attached. liam_master.png (a four-direction turnaround) defines his DESIGN: face, hair, ears, outfit, cape and colours. liam_td_walk.png (an approved in-game walk sheet) defines his IN-GAME PROPORTIONS and scale. Match the design of the master, but use the proportions, head size, body length and drawing scale of the walk sheet exactly. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not pretty, not horror.
- Angular, jagged, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the cape folds, under the hair) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, especially not in the hair.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

PROPORTIONS (in-game sprite, as in liam_td_walk.png)
- Big head: the head (including hair) is about 35-40% of the total height, so the face reads clearly at small size.
- Short, slim, narrow body and short thin legs; thin arms, small bony hands.
- Still gaunt and angular, NOT cute-kawaii: a long, narrow, inverted-triangle face tapering to a pointed chin, heavy dark eye rings, weary deadpan look.
- Overall impression: a tired, sleepless young artist, drawn as a compact game sprite.

CHARACTER: Liam, a young vampire in his early twenties
- Hair: messy, unruly, matte silver-white (not blue, not grey), falling in a few big ragged clumps with uneven jagged tips, a couple of strands sticking out at odd angles. Big simple shapes, not many fine strands. The hair does NOT cover his eyes.
- Ears: pointed, elf-like, poking out through the hair on both sides. No earrings, no piercings.
- Face: pale skin with a slight lilac-grey tint.
- Eyes: small, half-lidded, pale grey with tiny dark dot pupils, no sparkle, no eyelashes. Heavy dark purple-grey rings smudged around and under the eyes, like he hasn't slept.
- Eyebrows: thin, weary.
- Mouth: a small flat line by default. Two tiny white fangs just poking out over the lower lip, one slightly crooked (visible when the face is seen from the front).
- Nose: a tiny pointed shape, or only suggested by a line.
- Outfit: a warm cream frilly poet shirt with a ruffled jabot at the throat, loose puffed sleeves with ruffled cuffs (a few big ruffles, not tiny detail). The shirt is loose and tucked into the trousers.
- NO waistcoat, NO vest, NO corset, NO jacket, NO buttons, NO belt buckle.
- Black skinny trousers.
- Boots: plain black ankle boots with a pointed toe and a flat sole or a very low heel. NO high heels, NO stilettos, NO buckles, NO straps.
- Cape: black outside, wine-burgundy inner lining, with a tall, sharp-pointed stand-up collar rising behind his head; the collar must be visible from every direction. The cape hangs long and narrow to below the knees, with a ragged, jagged, torn-looking hem of sharp points.
- No weapons, props, jewellery, gold, metal details or paint stains unless this prompt explicitly asks for one.

PALETTE (exact hex, use nothing else; no gold, no yellow metal):
- Outline and hatching: #1A1020
- Cape exterior and trousers: #1C1A24 (dark), #2E2B3A (mid), #474359 (highlight)
- Cape lining: #4A1626 (shadow), #6E1F35 (base), #A8323E (bright crimson edge highlight)
- Hair: #8B95A8 (shadow), #C9D3E0 (base), #E8EEF5 (highlight)
- Skin: #C7B9CC (shadow), #EDE6EE (base)
- Shirt: #CDB98F (shadow), #F2E6CC (base)
- Eyes: #AEB5BE, pupils and eye rings: #2A2233
- Fangs: #FFFFFF
- Boots: #24212C
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Side-view hurt reaction. He gets hit from the right and is knocked back to the left.
Frames, left to right (the same frame sequence in every row, adapted to that row's facing direction):
  1. Recoil: body jerked back to the left, head thrown back, eyes squeezed shut, mouth open, cape and hair flung forward to the right.
  2. Stagger: off-balance, stumbling backward, one arm windmilling, eyes wide.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 2 columns of equal cells, each cell 768x1024 pixels. One pose per cell, 2 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height (less if the pose is wide), centred horizontally.
- Camera: pure side view for a 2D side-scrolling platformer (not top-down, not 3/4). The character faces RIGHT in every frame.
- Row order, top to bottom:
  1. Facing right, side profile: pointed chin, nose and pointed ear visible, cape trailing behind him to the left.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, hair shape, outfit and colours.
- Feet stay on the same baseline in every frame of a row (unless the frame is airborne), and the character stays centred in its cell.
- Only the pose changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no motion lines outside the character, no impact effects unless this prompt explicitly asks for them.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

## NPCs

| ID | Asset | Priority | Status | Output file |
|---|---|---|---|---|
| AMB-00 | Ambrose - master reference (turnaround) | Must | Approved | `ambrose_master.png` |
| AMB-01 | Ambrose - dialogue portraits (8 expressions) | Must | In game | `ambrose_portraits.png` |
| AMB-02 | Ambrose - top-down idle | Must | In game | `ambrose_td_idle.png` |
| AMB-03 | Ambrose - top-down walk (glide) | Must | In game | `ambrose_td_walk.png` |
| AMB-04 | Ambrose - bow (greeting) | Must | In game | `ambrose_td_bow.png` |
| AMB-05 | Ambrose - produce from behind back (tea / item) | Must | Processed | `ambrose_td_produce.png` |
| AMB-06 | Ambrose - drifting (lost in thought) | Must | In game | `ambrose_td_drift.png` |
| AMB-07 | Ambrose - ritual: set the table | Must | In game | `ambrose_td_settable.png` |
| AMB-08 | Ambrose - ritual: wind the clock | Must | In game | `ambrose_td_windclock.png` |

### AMB-00: Ambrose - master reference (turnaround)

- **Mode:** Reference · **Directions:** Down, Left, Right, Up · **Frames:** 4
- **Grid:** 1 row x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** liam_master.png (style only) · **Output:** `ambrose_master.png`
- **Notes:** APPROVED 2026-10-20. Known quirk: the side views show a beard on the chin; the other prompts say clean-shaven explicitly. The master is lanky; in-game sheets are chibi (see AMB-02+). Sepia old-photograph palette sets him apart from Liam. Candle glow is added in code, not in the art. Once approved, this image is attached to every other Ambrose prompt.

```
Create a pixel-art character sprite sheet for a top-down 2D game (3/4 view).
A reference image of a DIFFERENT character (liam_master.png) is attached ONLY as a style reference. Match its art style, line work, outline thickness, pixel size, shading approach and head-to-body proportion. Do NOT copy that character's design, face, hair, clothes or colours. Draw the new character described below.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not horror.
- Angular, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the coat folds, under the whiskers) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.
- Designed to be downscaled to a 32x64 pixel sprite, so keep shapes bold and readable; each pixel should be a clearly visible square block (about 8x8 screen pixels).

COLOUR CONCEPT
- The whole character is drawn in a faded SEPIA palette, as if he stepped out of an 1890s photograph: warm browns, yellowed whites, beige greys. No pure black, no pure white, no saturated colour anywhere on him.
- The ONLY exception is the small candle flames, which are bright warm yellow-orange.

PROPORTIONS
- Thin and rigid: ramrod-straight posture, like a coat stand. Shoulders square, back perfectly straight, chin slightly raised.
- Slightly taller than an average adult, narrow and vertical; his silhouette is a stiff, tall, thin column.
- Enlarged head for readability: the head (including whiskers) is about 25% of the total height.
- Long thin arms and legs, long narrow feet in polished shoes.

CHARACTER: Ambrose, an elderly Victorian butler (about 70 years old)
- Head: bald on top, a long narrow face, a long pointed nose.
- Whiskers: huge, bushy mutton-chop sideburns that flare outward from both cheeks, wider than his head, connected by a thick moustache. Chin clean-shaven. The whiskers are his signature silhouette and must be clearly visible from every direction (from behind they poke out on both sides of the head).
- Eyebrows: big, bushy, slightly raised in polite attentiveness.
- Eyes: small, calm, half-lidded dark dots. No sparkle.
- Expression: impeccably composed, dignified, unflappable, faintly absent-minded.
- Outfit (1890s butler livery): a long tailcoat with tails reaching the back of the knees, a waistcoat, a stiff high wing collar, a small bow tie, white gloves, narrow trousers, polished shoes.
- Pose: standing perfectly straight. One hand holds a three-armed candelabra at chest height in front of him; the other arm is folded behind his back.
- Candelabra: tarnished brass, three arms, three short wax candles, each with a small lit flame (a simple flame shape, 2-3 colours, no glow, no light rays, no halo).
- He is a ghost, but he does NOT know it: draw him fully solid and opaque, feet on the ground. No transparency, no glow, no ghostly tail, no floating.
- No hat, no jewellery, no other props.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Tailcoat, trousers, shoes: #3B2E26 (dark), #5A4636 (mid), #7A634D (highlight)
- Bow tie: #2A211B
- Waistcoat: #6E5A44 (shadow), #8C7356 (base)
- Shirt, wing collar, gloves, candle wax: #D9C9A3 (shadow), #EFE3C4 (base)
- Skin: #B89A7E (shadow), #D8BFA0 (base)
- Whiskers, moustache, eyebrows: #8E8272 (shadow), #B8AD9C (base), #D6CEC0 (highlight)
- Eyes: #3B2E26
- Candelabra (tarnished brass): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Candle flames ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- One horizontal row of exactly four characters, four columns, each cell 384x1024 pixels.
- Same standing pose in every cell, the character centred in its cell, feet on the same baseline (about 88% down the canvas), identical size and scale in all four cells. The character is about 680 pixels tall and about 256 pixels wide at most.
- Column order, left to right:
  1. Facing down (toward the viewer): face, whiskers, wing collar, bow tie, waistcoat, candelabra held in front of the chest.
  2. Facing left: side profile showing the long nose, flared whiskers and bald head; the candelabra held out in front of him, the coat tails behind.
  3. Facing right: exact mirror of column 2.
  4. Facing up (away from the viewer): bald back of the head with the whiskers poking out on both sides, the back of the tailcoat with the long tails, the candle flames just visible above his shoulder.
- Leave clear empty space between the characters; nothing may touch or overlap a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the characters.
- No floor, no ground shadow, no scenery, no frame, no grid lines, no light glow around the candles.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### AMB-01: Ambrose - dialogue portraits (8 expressions)

- **Mode:** Portrait · **Directions:** 3/4 facing left · **Frames:** 8
- **Grid:** 2 rows x 4 cols, 1536x1024 · **In-game size:** 96x96
- **Attach:** ambrose_master.png · **Output:** `ambrose_portraits.png`
- **Notes:** Order: composed, polite smile, raised eyebrow, drifting, remembering, concerned, warm, shaken. Composed is the default. Shaken is reserved for the reveal.

```
Create a set of pixel-art dialogue portraits (character busts) for a 2D game. They appear next to the dialogue box.

A reference image of this character (ambrose_master.png, a four-direction turnaround) is attached. Match its art style, line work, proportions, face, whiskers, outfit, candelabra and colours exactly. Do not add any clothing, accessories or details that are not in the reference or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not horror.
- Angular, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the coat folds, under the whiskers) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

COLOUR CONCEPT
- The whole character is drawn in a faded SEPIA palette, as if he stepped out of an 1890s photograph: warm browns, yellowed whites, beige greys. No pure black, no pure white, no saturated colour anywhere on him.
- The ONLY exception is the small candle flames, which are bright warm yellow-orange. The candles are ALWAYS lit, in every frame.

PROPORTIONS
- Bust portrait: head, neck, shoulders and the top of the chest with the wing collar, bow tie, waistcoat and tailcoat lapels. The flared mutton-chop whiskers must fit fully inside the cell.
- The face is large and detailed enough to read the expression clearly.
- The candelabra is NOT shown in the portraits, except where an expression below mentions it.

CHARACTER: Ambrose, an elderly Victorian butler (about 70 years old)
- Head: bald on top, a long narrow face, a long pointed nose.
- Whiskers: huge, bushy mutton-chop sideburns that flare outward from both cheeks, wider than his head, connected by a thick moustache. Chin clean-shaven in EVERY view, including the side views: no beard on the chin or jaw. Visible from every direction.
- Eyebrows: big and bushy. Eyes: small half-lidded dark dots, no sparkle.
- Default expression: impeccably composed, dignified, unflappable, faintly absent-minded.
- Outfit (1890s butler livery): a long tailcoat with tails reaching the back of the knees, a waistcoat, a stiff high wing collar, a small bow tie, white gloves, narrow trousers, polished shoes.
- Candelabra: tarnished brass, three arms, three short wax candles, each with a small lit flame (simple flame shape, 2-3 colours, no glow, no light rays, no halo). He holds it in the same hand as in the reference, and it stays upright and steady in every frame unless this prompt says otherwise.
- His other hand is normally folded behind his back. Whatever he needs, he produces from behind his back.
- He is a ghost but does NOT know it: draw him fully solid and opaque. No transparency, no glow, no ghostly tail.
- No hat, no jewellery, no props other than those this prompt asks for.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Tailcoat, trousers, shoes: #3B2E26 (dark), #5A4636 (mid), #7A634D (highlight)
- Bow tie: #2A211B
- Waistcoat: #6E5A44 (shadow), #8C7356 (base)
- Shirt, wing collar, gloves, candle wax, china (cups, saucers, plates): #D9C9A3 (shadow), #EFE3C4 (base)
- Skin: #B89A7E (shadow), #D8BFA0 (base)
- Whiskers, moustache, eyebrows: #8E8272 (shadow), #B8AD9C (base), #D6CEC0 (highlight)
- Eyes and tea: #3B2E26
- Brass (candelabra, winding key): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Candle flames ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

EXPRESSIONS, one per cell, left to right then top to bottom:
  1. Composed: the default. Perfectly neutral, chin slightly raised, eyes half-lidded, mouth hidden under the moustache.
  2. Polite smile: a tiny, correct smile lifting the moustache slightly, eyes a little softer.
  3. Raised eyebrow: one bushy eyebrow raised high, the other flat. His strongest form of disapproval; the rest of the face perfectly still.
  4. Drifting: lost in thought. Eyes unfocused and looking past the viewer into the distance, eyebrows slightly raised, mouth slightly open under the moustache, head tilted a little.
  5. Remembering: wistful. Eyes half-closed looking down and to the side, a faint sad smile, as if recalling a long-ago evening.
  6. Concerned: about the young master. Eyebrows drawn together and tilted up in the middle, eyes attentive, leaning slightly forward.
  7. Warm: the rare real smile. Eyes crinkled, a genuine smile visible under the moustache, posture slightly relaxed. The warmest expression in the set.
  8. Shaken: the only time he is not composed. Eyes wide open, eyebrows high, whiskers slightly ruffled, collar a little askew, mouth open. Quiet shock, not comedic terror.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 2 rows and 4 columns of equal cells, each cell 384x512 pixels. One portrait per cell, 8 portraits in total.
- Every portrait is a three-quarter view with his body and face turned slightly toward the LEFT side of the image (he usually faces Liam, whose portraits face right; the portrait is mirrored in code when needed).
- Same framing in every cell: the top of the head about 10% below the top of the cell, the bust cut off flat at the bottom of the cell, the head centred horizontally.
- Same size, scale, lighting and design in all eight cells; only the expression, eyebrows, eyes, moustache and posture change.
- Designed to be downscaled to 96x96 pixels per portrait (taking the top square of each cell), so keep shapes bold and readable; each pixel should be a clearly visible square block.
- Nothing may touch or cross a cell border except the flat bottom cut of the bust.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the portraits.
- No scenery, no frame, no grid lines.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### AMB-02: Ambrose - top-down idle

- **Mode:** Top-down · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 4
- **Grid:** 3 rows x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** ambrose_master.png + liam_td_walk.png · **Output:** `ambrose_td_idle.png`
- **Notes:** Loop. Candles are lit day and night (a quiet gag and ghost tell). Candle light glow is done in code.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images are attached. ambrose_master.png (a four-direction turnaround of THIS character) defines his DESIGN: face, whiskers, outfit, candelabra and colours. liam_td_walk.png (an approved in-game sheet of ANOTHER character, Liam) defines only the game's IN-GAME PROPORTIONS and drawing scale: use its big-head proportions and its scale, but do not copy anything of Liam's design. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not horror.
- Angular, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the coat folds, under the whiskers) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

COLOUR CONCEPT
- The whole character is drawn in a faded SEPIA palette, as if he stepped out of an 1890s photograph: warm browns, yellowed whites, beige greys. No pure black, no pure white, no saturated colour anywhere on him.
- The ONLY exception is the small candle flames, which are bright warm yellow-orange. The candles are ALWAYS lit, in every frame.

PROPORTIONS (in-game sprite, the game's chibi style as in liam_td_walk.png)
- Big head for readability: the head (including whiskers) is about 33-38% of the total height.
- Thin and rigid: ramrod-straight posture, like a coat stand; shoulders square, back straight, chin slightly raised.
- Narrow body, short thin legs, long narrow shoes. He is about 10% TALLER than Liam in liam_td_walk.png; draw them at the same scale.
- Still gaunt and dignified, NOT cute-kawaii: long narrow face, long pointed nose, deadpan half-lidded eyes.

CHARACTER: Ambrose, an elderly Victorian butler (about 70 years old)
- Head: bald on top, a long narrow face, a long pointed nose.
- Whiskers: huge, bushy mutton-chop sideburns that flare outward from both cheeks, wider than his head, connected by a thick moustache. Chin clean-shaven in EVERY view, including the side views: no beard on the chin or jaw. Visible from every direction.
- Eyebrows: big and bushy. Eyes: small half-lidded dark dots, no sparkle.
- Default expression: impeccably composed, dignified, unflappable, faintly absent-minded.
- Outfit (1890s butler livery): a long tailcoat with tails reaching the back of the knees, a waistcoat, a stiff high wing collar, a small bow tie, white gloves, narrow trousers, polished shoes.
- Candelabra: tarnished brass, three arms, three short wax candles, each with a small lit flame (simple flame shape, 2-3 colours, no glow, no light rays, no halo). He holds it in the same hand as in the reference, and it stays upright and steady in every frame unless this prompt says otherwise.
- His other hand is normally folded behind his back. Whatever he needs, he produces from behind his back.
- He is a ghost but does NOT know it: draw him fully solid and opaque. No transparency, no glow, no ghostly tail.
- No hat, no jewellery, no props other than those this prompt asks for.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Tailcoat, trousers, shoes: #3B2E26 (dark), #5A4636 (mid), #7A634D (highlight)
- Bow tie: #2A211B
- Waistcoat: #6E5A44 (shadow), #8C7356 (base)
- Shirt, wing collar, gloves, candle wax, china (cups, saucers, plates): #D9C9A3 (shadow), #EFE3C4 (base)
- Skin: #B89A7E (shadow), #D8BFA0 (base)
- Whiskers, moustache, eyebrows: #8E8272 (shadow), #B8AD9C (base), #D6CEC0 (highlight)
- Eyes and tea: #3B2E26
- Brass (candelabra, winding key): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Candle flames ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Idle loop. He stands perfectly still and upright, as rigid as a coat stand. His body barely moves; the main motion is the candle flames flickering.
Frames, left to right (the same frame sequence in every row, adapted to that row's direction):
  1. Neutral pose, flames upright.
  2. Same pose, all three flames leaning slightly left.
  3. Same pose, a slow blink (eyes closed), flames upright and slightly taller.
  4. Same pose, flames leaning slightly right.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 4 columns of equal cells, each cell 384x341 pixels. One pose per cell, 12 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height, centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer): face, whiskers, wing collar, bow tie, waistcoat, candelabra in front of the chest.
  2. Facing left: side profile with the long nose and flared whiskers, candelabra held out in front, coat tails behind. (The right-facing version is made by mirroring this row in code, so draw LEFT only.)
  3. Facing up (away from the viewer): bald back of the head with the whiskers poking out on both sides, back of the tailcoat with the long tails, candle flames visible above his shoulder.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, whiskers, outfit, candelabra and colours.
- Feet stay on the same baseline in every frame of a row, and the character stays centred in its cell.
- Only the pose (and the candle flames) changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the character.
- No floor, no furniture, no table, no clock, no wall, no ground shadow, no scenery, no frame, no grid lines, no light glow around the candles, no motion lines.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### AMB-03: Ambrose - top-down walk (glide)

- **Mode:** Top-down · **Directions:** Down, Left, Up (Right = mirror) · **Frames:** 6
- **Grid:** 3 rows x 6 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** ambrose_master.png + liam_td_walk.png · **Output:** `ambrose_td_walk.png`
- **Notes:** Loop. The glide is a subtle ghost tell: no body bob. Speed in config.json. Walking through a wall uses this walk; the fade is done in code.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images are attached. ambrose_master.png (a four-direction turnaround of THIS character) defines his DESIGN: face, whiskers, outfit, candelabra and colours. liam_td_walk.png (an approved in-game sheet of ANOTHER character, Liam) defines only the game's IN-GAME PROPORTIONS and drawing scale: use its big-head proportions and its scale, but do not copy anything of Liam's design. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not horror.
- Angular, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the coat folds, under the whiskers) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

COLOUR CONCEPT
- The whole character is drawn in a faded SEPIA palette, as if he stepped out of an 1890s photograph: warm browns, yellowed whites, beige greys. No pure black, no pure white, no saturated colour anywhere on him.
- The ONLY exception is the small candle flames, which are bright warm yellow-orange. The candles are ALWAYS lit, in every frame.

PROPORTIONS (in-game sprite, the game's chibi style as in liam_td_walk.png)
- Big head for readability: the head (including whiskers) is about 33-38% of the total height.
- Thin and rigid: ramrod-straight posture, like a coat stand; shoulders square, back straight, chin slightly raised.
- Narrow body, short thin legs, long narrow shoes. He is about 10% TALLER than Liam in liam_td_walk.png; draw them at the same scale.
- Still gaunt and dignified, NOT cute-kawaii: long narrow face, long pointed nose, deadpan half-lidded eyes.

CHARACTER: Ambrose, an elderly Victorian butler (about 70 years old)
- Head: bald on top, a long narrow face, a long pointed nose.
- Whiskers: huge, bushy mutton-chop sideburns that flare outward from both cheeks, wider than his head, connected by a thick moustache. Chin clean-shaven in EVERY view, including the side views: no beard on the chin or jaw. Visible from every direction.
- Eyebrows: big and bushy. Eyes: small half-lidded dark dots, no sparkle.
- Default expression: impeccably composed, dignified, unflappable, faintly absent-minded.
- Outfit (1890s butler livery): a long tailcoat with tails reaching the back of the knees, a waistcoat, a stiff high wing collar, a small bow tie, white gloves, narrow trousers, polished shoes.
- Candelabra: tarnished brass, three arms, three short wax candles, each with a small lit flame (simple flame shape, 2-3 colours, no glow, no light rays, no halo). He holds it in the same hand as in the reference, and it stays upright and steady in every frame unless this prompt says otherwise.
- His other hand is normally folded behind his back. Whatever he needs, he produces from behind his back.
- He is a ghost but does NOT know it: draw him fully solid and opaque. No transparency, no glow, no ghostly tail.
- No hat, no jewellery, no props other than those this prompt asks for.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Tailcoat, trousers, shoes: #3B2E26 (dark), #5A4636 (mid), #7A634D (highlight)
- Bow tie: #2A211B
- Waistcoat: #6E5A44 (shadow), #8C7356 (base)
- Shirt, wing collar, gloves, candle wax, china (cups, saucers, plates): #D9C9A3 (shadow), #EFE3C4 (base)
- Skin: #B89A7E (shadow), #D8BFA0 (base)
- Whiskers, moustache, eyebrows: #8E8272 (shadow), #B8AD9C (base), #D6CEC0 (highlight)
- Eyes and tea: #3B2E26
- Brass (candelabra, winding key): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Candle flames ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Walk cycle that is slightly too smooth. His legs take small, stiff, proper steps, but his upper body, head and candelabra stay perfectly level with NO bobbing up and down at all, as if he glides a little. His feet barely lift off the ground. The coat tails sway gently behind him. The candle flames lean back slightly from the movement.
Frames, left to right (the same frame sequence in every row, adapted to that row's direction):
  1. Left foot slightly forward, right foot back.
  2. Feet closer together, left foot planted.
  3. Right foot passing the left.
  4. Right foot slightly forward, left foot back.
  5. Feet closer together, right foot planted.
  6. Left foot passing the right.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 3 rows and 6 columns of equal cells, each cell 256x341 pixels. One pose per cell, 18 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height, centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer): face, whiskers, wing collar, bow tie, waistcoat, candelabra in front of the chest.
  2. Facing left: side profile with the long nose and flared whiskers, candelabra held out in front, coat tails behind. (The right-facing version is made by mirroring this row in code, so draw LEFT only.)
  3. Facing up (away from the viewer): bald back of the head with the whiskers poking out on both sides, back of the tailcoat with the long tails, candle flames visible above his shoulder.
- IMPORTANT: the head, shoulders and candelabra are at exactly the same height in all six frames of a row.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, whiskers, outfit, candelabra and colours.
- Feet stay on the same baseline in every frame of a row, and the character stays centred in its cell.
- Only the pose (and the candle flames) changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the character.
- No floor, no furniture, no table, no clock, no wall, no ground shadow, no scenery, no frame, no grid lines, no light glow around the candles, no motion lines.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### AMB-04: Ambrose - bow (greeting)

- **Mode:** Top-down · **Directions:** Down only · **Frames:** 4
- **Grid:** 1 row x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** ambrose_master.png + liam_td_walk.png · **Output:** `ambrose_td_bow.png`
- **Notes:** Plays when Liam enters a room Ambrose is in, and on greetings. Then plays frames 2-1 to finish.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images are attached. ambrose_master.png (a four-direction turnaround of THIS character) defines his DESIGN: face, whiskers, outfit, candelabra and colours. liam_td_walk.png (an approved in-game sheet of ANOTHER character, Liam) defines only the game's IN-GAME PROPORTIONS and drawing scale: use its big-head proportions and its scale, but do not copy anything of Liam's design. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not horror.
- Angular, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the coat folds, under the whiskers) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

COLOUR CONCEPT
- The whole character is drawn in a faded SEPIA palette, as if he stepped out of an 1890s photograph: warm browns, yellowed whites, beige greys. No pure black, no pure white, no saturated colour anywhere on him.
- The ONLY exception is the small candle flames, which are bright warm yellow-orange. The candles are ALWAYS lit, in every frame.

PROPORTIONS (in-game sprite, the game's chibi style as in liam_td_walk.png)
- Big head for readability: the head (including whiskers) is about 33-38% of the total height.
- Thin and rigid: ramrod-straight posture, like a coat stand; shoulders square, back straight, chin slightly raised.
- Narrow body, short thin legs, long narrow shoes. He is about 10% TALLER than Liam in liam_td_walk.png; draw them at the same scale.
- Still gaunt and dignified, NOT cute-kawaii: long narrow face, long pointed nose, deadpan half-lidded eyes.

CHARACTER: Ambrose, an elderly Victorian butler (about 70 years old)
- Head: bald on top, a long narrow face, a long pointed nose.
- Whiskers: huge, bushy mutton-chop sideburns that flare outward from both cheeks, wider than his head, connected by a thick moustache. Chin clean-shaven in EVERY view, including the side views: no beard on the chin or jaw. Visible from every direction.
- Eyebrows: big and bushy. Eyes: small half-lidded dark dots, no sparkle.
- Default expression: impeccably composed, dignified, unflappable, faintly absent-minded.
- Outfit (1890s butler livery): a long tailcoat with tails reaching the back of the knees, a waistcoat, a stiff high wing collar, a small bow tie, white gloves, narrow trousers, polished shoes.
- Candelabra: tarnished brass, three arms, three short wax candles, each with a small lit flame (simple flame shape, 2-3 colours, no glow, no light rays, no halo). He holds it in the same hand as in the reference, and it stays upright and steady in every frame unless this prompt says otherwise.
- His other hand is normally folded behind his back. Whatever he needs, he produces from behind his back.
- He is a ghost but does NOT know it: draw him fully solid and opaque. No transparency, no glow, no ghostly tail.
- No hat, no jewellery, no props other than those this prompt asks for.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Tailcoat, trousers, shoes: #3B2E26 (dark), #5A4636 (mid), #7A634D (highlight)
- Bow tie: #2A211B
- Waistcoat: #6E5A44 (shadow), #8C7356 (base)
- Shirt, wing collar, gloves, candle wax, china (cups, saucers, plates): #D9C9A3 (shadow), #EFE3C4 (base)
- Skin: #B89A7E (shadow), #D8BFA0 (base)
- Whiskers, moustache, eyebrows: #8E8272 (shadow), #B8AD9C (base), #D6CEC0 (highlight)
- Eyes and tea: #3B2E26
- Brass (candelabra, winding key): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Candle flames ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Formal bow. He bends stiffly at the hips like a hinge, keeping his back perfectly straight. The candelabra stays level and upright the whole time, flames pointing straight up.
Frames, left to right (the same frame sequence in every row, adapted to that row's direction):
  1. Standing upright, composed.
  2. Bending forward about 20 degrees at the hips, back straight, eyes lowered.
  3. Full bow, about 45 degrees, back straight, bald head toward the viewer, candelabra still level (hold frame).
  4. Rising halfway back up.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 4 columns of equal cells, each cell 384x1024 pixels. One pose per cell, 4 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height, centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer), the only direction for this animation.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, whiskers, outfit, candelabra and colours.
- Feet stay on the same baseline in every frame of a row, and the character stays centred in its cell.
- Only the pose (and the candle flames) changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the character.
- No floor, no furniture, no table, no clock, no wall, no ground shadow, no scenery, no frame, no grid lines, no light glow around the candles, no motion lines.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### AMB-05: Ambrose - produce from behind back (tea / item)

- **Mode:** Top-down · **Directions:** Down only · **Frames:** 10
- **Grid:** 2 rows x 5 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** ambrose_master.png + liam_td_walk.png · **Output:** `ambrose_td_produce.png`
- **Notes:** Row 1 = tea (save point). Row 2 = generic item; key, note, etc. are overlaid in code at the palm. Plays in reverse to put the hand back.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images are attached. ambrose_master.png (a four-direction turnaround of THIS character) defines his DESIGN: face, whiskers, outfit, candelabra and colours. liam_td_walk.png (an approved in-game sheet of ANOTHER character, Liam) defines only the game's IN-GAME PROPORTIONS and drawing scale: use its big-head proportions and its scale, but do not copy anything of Liam's design. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not horror.
- Angular, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the coat folds, under the whiskers) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

COLOUR CONCEPT
- The whole character is drawn in a faded SEPIA palette, as if he stepped out of an 1890s photograph: warm browns, yellowed whites, beige greys. No pure black, no pure white, no saturated colour anywhere on him.
- The ONLY exception is the small candle flames, which are bright warm yellow-orange. The candles are ALWAYS lit, in every frame.

PROPORTIONS (in-game sprite, the game's chibi style as in liam_td_walk.png)
- Big head for readability: the head (including whiskers) is about 33-38% of the total height.
- Thin and rigid: ramrod-straight posture, like a coat stand; shoulders square, back straight, chin slightly raised.
- Narrow body, short thin legs, long narrow shoes. He is about 10% TALLER than Liam in liam_td_walk.png; draw them at the same scale.
- Still gaunt and dignified, NOT cute-kawaii: long narrow face, long pointed nose, deadpan half-lidded eyes.

CHARACTER: Ambrose, an elderly Victorian butler (about 70 years old)
- Head: bald on top, a long narrow face, a long pointed nose.
- Whiskers: huge, bushy mutton-chop sideburns that flare outward from both cheeks, wider than his head, connected by a thick moustache. Chin clean-shaven in EVERY view, including the side views: no beard on the chin or jaw. Visible from every direction.
- Eyebrows: big and bushy. Eyes: small half-lidded dark dots, no sparkle.
- Default expression: impeccably composed, dignified, unflappable, faintly absent-minded.
- Outfit (1890s butler livery): a long tailcoat with tails reaching the back of the knees, a waistcoat, a stiff high wing collar, a small bow tie, white gloves, narrow trousers, polished shoes.
- Candelabra: tarnished brass, three arms, three short wax candles, each with a small lit flame (simple flame shape, 2-3 colours, no glow, no light rays, no halo). He holds it in the same hand as in the reference, and it stays upright and steady in every frame unless this prompt says otherwise.
- His other hand is normally folded behind his back. Whatever he needs, he produces from behind his back.
- He is a ghost but does NOT know it: draw him fully solid and opaque. No transparency, no glow, no ghostly tail.
- No hat, no jewellery, no props other than those this prompt asks for.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Tailcoat, trousers, shoes: #3B2E26 (dark), #5A4636 (mid), #7A634D (highlight)
- Bow tie: #2A211B
- Waistcoat: #6E5A44 (shadow), #8C7356 (base)
- Shirt, wing collar, gloves, candle wax, china (cups, saucers, plates): #D9C9A3 (shadow), #EFE3C4 (base)
- Skin: #B89A7E (shadow), #D8BFA0 (base)
- Whiskers, moustache, eyebrows: #8E8272 (shadow), #B8AD9C (base), #D6CEC0 (highlight)
- Eyes and tea: #3B2E26
- Brass (candelabra, winding key): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Candle flames ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Producing something from behind his back. His running gag: the hand folded behind his back always produces exactly what is needed. Both rows are the same motion; only what is in his hand differs.
Frames, left to right (the same frame sequence in every row, adapted to that row's direction):
  1. Standing upright, composed, hand behind his back.
  2. The hidden hand starts to come out from behind his back, elbow bending.
  3. The hand comes round to his side, holding the object low.
  4. The hand presents the object forward at chest height with a slight bow.
  5. Hold: presenting the object, a tiny polite smile.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 2 rows and 5 columns of equal cells, each cell 307x512 pixels. One pose per cell, 10 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height, centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down. He holds a teacup on a saucer (cream china, dark tea in the cup, no steam).
  2. Facing down. Exactly the same motion, but his hand is EMPTY, palm up and slightly cupped, as if holding a small invisible object. (The item is added separately in the game.)

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, whiskers, outfit, candelabra and colours.
- Feet stay on the same baseline in every frame of a row, and the character stays centred in its cell.
- Only the pose (and the candle flames) changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the character.
- No floor, no furniture, no table, no clock, no wall, no ground shadow, no scenery, no frame, no grid lines, no light glow around the candles, no motion lines.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### AMB-06: Ambrose - drifting (lost in thought)

- **Mode:** Top-down · **Directions:** Down only · **Frames:** 3
- **Grid:** 1 row x 3 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** ambrose_master.png + liam_td_walk.png · **Output:** `ambrose_td_drift.png`
- **Notes:** He fades toward transparent in code while holding frame 3, then snaps back with frames 2-1. Fade amount and duration in config.json.

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images are attached. ambrose_master.png (a four-direction turnaround of THIS character) defines his DESIGN: face, whiskers, outfit, candelabra and colours. liam_td_walk.png (an approved in-game sheet of ANOTHER character, Liam) defines only the game's IN-GAME PROPORTIONS and drawing scale: use its big-head proportions and its scale, but do not copy anything of Liam's design. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not horror.
- Angular, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the coat folds, under the whiskers) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

COLOUR CONCEPT
- The whole character is drawn in a faded SEPIA palette, as if he stepped out of an 1890s photograph: warm browns, yellowed whites, beige greys. No pure black, no pure white, no saturated colour anywhere on him.
- The ONLY exception is the small candle flames, which are bright warm yellow-orange. The candles are ALWAYS lit, in every frame.

PROPORTIONS (in-game sprite, the game's chibi style as in liam_td_walk.png)
- Big head for readability: the head (including whiskers) is about 33-38% of the total height.
- Thin and rigid: ramrod-straight posture, like a coat stand; shoulders square, back straight, chin slightly raised.
- Narrow body, short thin legs, long narrow shoes. He is about 10% TALLER than Liam in liam_td_walk.png; draw them at the same scale.
- Still gaunt and dignified, NOT cute-kawaii: long narrow face, long pointed nose, deadpan half-lidded eyes.

CHARACTER: Ambrose, an elderly Victorian butler (about 70 years old)
- Head: bald on top, a long narrow face, a long pointed nose.
- Whiskers: huge, bushy mutton-chop sideburns that flare outward from both cheeks, wider than his head, connected by a thick moustache. Chin clean-shaven in EVERY view, including the side views: no beard on the chin or jaw. Visible from every direction.
- Eyebrows: big and bushy. Eyes: small half-lidded dark dots, no sparkle.
- Default expression: impeccably composed, dignified, unflappable, faintly absent-minded.
- Outfit (1890s butler livery): a long tailcoat with tails reaching the back of the knees, a waistcoat, a stiff high wing collar, a small bow tie, white gloves, narrow trousers, polished shoes.
- Candelabra: tarnished brass, three arms, three short wax candles, each with a small lit flame (simple flame shape, 2-3 colours, no glow, no light rays, no halo). He holds it in the same hand as in the reference, and it stays upright and steady in every frame unless this prompt says otherwise.
- His other hand is normally folded behind his back. Whatever he needs, he produces from behind his back.
- He is a ghost but does NOT know it: draw him fully solid and opaque. No transparency, no glow, no ghostly tail.
- No hat, no jewellery, no props other than those this prompt asks for.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Tailcoat, trousers, shoes: #3B2E26 (dark), #5A4636 (mid), #7A634D (highlight)
- Bow tie: #2A211B
- Waistcoat: #6E5A44 (shadow), #8C7356 (base)
- Shirt, wing collar, gloves, candle wax, china (cups, saucers, plates): #D9C9A3 (shadow), #EFE3C4 (base)
- Skin: #B89A7E (shadow), #D8BFA0 (base)
- Whiskers, moustache, eyebrows: #8E8272 (shadow), #B8AD9C (base), #D6CEC0 (highlight)
- Eyes and tea: #3B2E26
- Brass (candelabra, winding key): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Candle flames ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Drifting. He loses his train of thought mid-sentence. He stays upright, but his composure slips a little.
Frames, left to right (the same frame sequence in every row, adapted to that row's direction):
  1. Composed, looking at the viewer.
  2. Eyes unfocused, looking past the viewer into the distance, eyebrows slightly raised, head tilting slightly.
  3. Fully lost: head tilted, mouth slightly open under the moustache, the candelabra lowered a little and tilted, flames leaning (hold frame).

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 3 columns of equal cells, each cell 512x1024 pixels. One pose per cell, 3 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height, centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing down (toward the viewer), the only direction for this animation.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, whiskers, outfit, candelabra and colours.
- Feet stay on the same baseline in every frame of a row, and the character stays centred in its cell.
- Only the pose (and the candle flames) changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the character.
- No floor, no furniture, no table, no clock, no wall, no ground shadow, no scenery, no frame, no grid lines, no light glow around the candles, no motion lines.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### AMB-07: Ambrose - ritual: set the table

- **Mode:** Top-down · **Directions:** Left only (Right = mirror) · **Frames:** 5
- **Grid:** 1 row x 5 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** ambrose_master.png + liam_td_walk.png · **Output:** `ambrose_td_settable.png`
- **Notes:** Loops between places at the table; the plates on the table are a separate prop. Always the same number of places (story detail).

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images are attached. ambrose_master.png (a four-direction turnaround of THIS character) defines his DESIGN: face, whiskers, outfit, candelabra and colours. liam_td_walk.png (an approved in-game sheet of ANOTHER character, Liam) defines only the game's IN-GAME PROPORTIONS and drawing scale: use its big-head proportions and its scale, but do not copy anything of Liam's design. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not horror.
- Angular, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the coat folds, under the whiskers) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

COLOUR CONCEPT
- The whole character is drawn in a faded SEPIA palette, as if he stepped out of an 1890s photograph: warm browns, yellowed whites, beige greys. No pure black, no pure white, no saturated colour anywhere on him.
- The ONLY exception is the small candle flames, which are bright warm yellow-orange. The candles are ALWAYS lit, in every frame.

PROPORTIONS (in-game sprite, the game's chibi style as in liam_td_walk.png)
- Big head for readability: the head (including whiskers) is about 33-38% of the total height.
- Thin and rigid: ramrod-straight posture, like a coat stand; shoulders square, back straight, chin slightly raised.
- Narrow body, short thin legs, long narrow shoes. He is about 10% TALLER than Liam in liam_td_walk.png; draw them at the same scale.
- Still gaunt and dignified, NOT cute-kawaii: long narrow face, long pointed nose, deadpan half-lidded eyes.

CHARACTER: Ambrose, an elderly Victorian butler (about 70 years old)
- Head: bald on top, a long narrow face, a long pointed nose.
- Whiskers: huge, bushy mutton-chop sideburns that flare outward from both cheeks, wider than his head, connected by a thick moustache. Chin clean-shaven in EVERY view, including the side views: no beard on the chin or jaw. Visible from every direction.
- Eyebrows: big and bushy. Eyes: small half-lidded dark dots, no sparkle.
- Default expression: impeccably composed, dignified, unflappable, faintly absent-minded.
- Outfit (1890s butler livery): a long tailcoat with tails reaching the back of the knees, a waistcoat, a stiff high wing collar, a small bow tie, white gloves, narrow trousers, polished shoes.
- Candelabra: tarnished brass, three arms, three short wax candles, each with a small lit flame (simple flame shape, 2-3 colours, no glow, no light rays, no halo). He holds it in the same hand as in the reference, and it stays upright and steady in every frame unless this prompt says otherwise.
- His other hand is normally folded behind his back. Whatever he needs, he produces from behind his back.
- He is a ghost but does NOT know it: draw him fully solid and opaque. No transparency, no glow, no ghostly tail.
- No hat, no jewellery, no props other than those this prompt asks for.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Tailcoat, trousers, shoes: #3B2E26 (dark), #5A4636 (mid), #7A634D (highlight)
- Bow tie: #2A211B
- Waistcoat: #6E5A44 (shadow), #8C7356 (base)
- Shirt, wing collar, gloves, candle wax, china (cups, saucers, plates): #D9C9A3 (shadow), #EFE3C4 (base)
- Skin: #B89A7E (shadow), #D8BFA0 (base)
- Whiskers, moustache, eyebrows: #8E8272 (shadow), #B8AD9C (base), #D6CEC0 (highlight)
- Eyes and tea: #3B2E26
- Brass (candelabra, winding key): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Candle flames ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Night ritual: setting the dinner table for guests who never come. He stands beside a table (the table is NOT drawn) and places a plate on it with great care. The candelabra stays upright in his other hand.
Frames, left to right (the same frame sequence in every row, adapted to that row's direction):
  1. Standing upright facing left, hand behind his back.
  2. The hand comes out from behind his back holding a plate (cream china).
  3. Holding the plate out in front of him at waist height, where the tabletop would be.
  4. Lowering the plate gently onto the invisible tabletop, bending slightly at the hips, back straight.
  5. Hand empty, straightening up, adjusting the invisible plate's position with one fingertip.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 5 columns of equal cells, each cell 307x1024 pixels. One pose per cell, 5 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height, centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing left: side profile. (Right-facing is mirrored in code; draw LEFT only.)

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, whiskers, outfit, candelabra and colours.
- Feet stay on the same baseline in every frame of a row, and the character stays centred in its cell.
- Only the pose (and the candle flames) changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the character.
- No floor, no furniture, no table, no clock, no wall, no ground shadow, no scenery, no frame, no grid lines, no light glow around the candles, no motion lines.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### AMB-08: Ambrose - ritual: wind the clock

- **Mode:** Top-down · **Directions:** Up only · **Frames:** 4
- **Grid:** 1 row x 4 cols, 1536x1024 · **In-game size:** 32x64
- **Attach:** ambrose_master.png + liam_td_walk.png · **Output:** `ambrose_td_windclock.png`
- **Notes:** Frames 2-3 loop while winding. The clock is a separate prop. Ritual 3 (walking through the wall) uses the walk with a code fade: no extra art. Processed with a bigger scale reference (the raised candelabra adds height).

```
Create a pixel-art animation sprite sheet for a top-down 2D game (3/4 view).

Two reference images are attached. ambrose_master.png (a four-direction turnaround of THIS character) defines his DESIGN: face, whiskers, outfit, candelabra and colours. liam_td_walk.png (an approved in-game sheet of ANOTHER character, Liam) defines only the game's IN-GAME PROPORTIONS and drawing scale: use its big-head proportions and its scale, but do not copy anything of Liam's design. Do not add any clothing, accessories or details that are not in the references or in this description.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, deadpan, spooky but comedic. Not anime, not manga, not cute-kawaii, not horror.
- Angular, slightly irregular shapes. Nothing soft, round or glossy.
- Thick dark outline (2 pixels, #1A1020) around the whole silhouette and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen. Rough rather than polished.
- Flat colours with minimal shading: at most 2-3 tones per material. A few short dark hatching lines may be used for shadows (in the coat folds, under the whiskers) instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients.
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.

COLOUR CONCEPT
- The whole character is drawn in a faded SEPIA palette, as if he stepped out of an 1890s photograph: warm browns, yellowed whites, beige greys. No pure black, no pure white, no saturated colour anywhere on him.
- The ONLY exception is the small candle flames, which are bright warm yellow-orange. The candles are ALWAYS lit, in every frame.

PROPORTIONS (in-game sprite, the game's chibi style as in liam_td_walk.png)
- Big head for readability: the head (including whiskers) is about 33-38% of the total height.
- Thin and rigid: ramrod-straight posture, like a coat stand; shoulders square, back straight, chin slightly raised.
- Narrow body, short thin legs, long narrow shoes. He is about 10% TALLER than Liam in liam_td_walk.png; draw them at the same scale.
- Still gaunt and dignified, NOT cute-kawaii: long narrow face, long pointed nose, deadpan half-lidded eyes.

CHARACTER: Ambrose, an elderly Victorian butler (about 70 years old)
- Head: bald on top, a long narrow face, a long pointed nose.
- Whiskers: huge, bushy mutton-chop sideburns that flare outward from both cheeks, wider than his head, connected by a thick moustache. Chin clean-shaven in EVERY view, including the side views: no beard on the chin or jaw. Visible from every direction.
- Eyebrows: big and bushy. Eyes: small half-lidded dark dots, no sparkle.
- Default expression: impeccably composed, dignified, unflappable, faintly absent-minded.
- Outfit (1890s butler livery): a long tailcoat with tails reaching the back of the knees, a waistcoat, a stiff high wing collar, a small bow tie, white gloves, narrow trousers, polished shoes.
- Candelabra: tarnished brass, three arms, three short wax candles, each with a small lit flame (simple flame shape, 2-3 colours, no glow, no light rays, no halo). He holds it in the same hand as in the reference, and it stays upright and steady in every frame unless this prompt says otherwise.
- His other hand is normally folded behind his back. Whatever he needs, he produces from behind his back.
- He is a ghost but does NOT know it: draw him fully solid and opaque. No transparency, no glow, no ghostly tail.
- No hat, no jewellery, no props other than those this prompt asks for.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Tailcoat, trousers, shoes: #3B2E26 (dark), #5A4636 (mid), #7A634D (highlight)
- Bow tie: #2A211B
- Waistcoat: #6E5A44 (shadow), #8C7356 (base)
- Shirt, wing collar, gloves, candle wax, china (cups, saucers, plates): #D9C9A3 (shadow), #EFE3C4 (base)
- Skin: #B89A7E (shadow), #D8BFA0 (base)
- Whiskers, moustache, eyebrows: #8E8272 (shadow), #B8AD9C (base), #D6CEC0 (highlight)
- Eyes and tea: #3B2E26
- Brass (candelabra, winding key): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Candle flames ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere on the character.

ANIMATION: Night ritual: winding a grandfather clock back to the same hour. He stands facing the clock (the clock is NOT drawn), seen from behind. The candelabra is held up beside his head to light the clock face.
Frames, left to right (the same frame sequence in every row, adapted to that row's direction):
  1. Seen from behind, candelabra raised beside his head, the other hand reaching up to face height holding a small brass winding key.
  2. Turning the key: wrist rotated a quarter turn.
  3. Turning the key: wrist rotated back.
  4. Lowering the hand, standing perfectly still, head tilted slightly as if listening to the clock.

SPRITE SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Exactly 1 row and 4 columns of equal cells, each cell 384x1024 pixels. One pose per cell, 4 poses in total.
- Designed to be downscaled to 32x64 pixels per frame, so keep shapes bold and readable; each pixel should be a clearly visible square block.
- The character fills about 80% of the cell height, centred horizontally.
- Camera: top-down 2D game seen in 3/4 view (classic SNES-era RPG perspective): you see the front of the character and a little of the top of the head.
- Row order, top to bottom:
  1. Facing up (away from the viewer): bald back of the head with whiskers poking out on both sides, back of the tailcoat with the long tails.

CONSISTENCY
- Every frame shows the same character at the same size and scale, with the same proportions, face, whiskers, outfit, candelabra and colours.
- Feet stay on the same baseline in every frame of a row, and the character stays centred in its cell.
- Only the pose (and the candle flames) changes from frame to frame; frames read left to right as a smooth sequence.
- Leave clear empty space around each character; nothing may touch or cross a cell border.

BACKGROUND
- Solid flat magenta #FF00FF filling the entire canvas behind the character.
- No floor, no furniture, no table, no clock, no wall, no ground shadow, no scenery, no frame, no grid lines, no light glow around the candles, no motion lines.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

## Props

| ID | Asset | Priority | Status | Output file |
|---|---|---|---|---|
| PROP-01 | Wall candle sconce (unlit + 3 flicker frames) | Must | In game | `prop_sconce.png` |
| PROP-02 | Dining table (Ambrose's ritual) | Must | In game | `prop_table.png` |
| PROP-03 | Place settings (4 variants) | Must | In game | `prop_plate.png` |
| PROP-04 | Grandfather clock (pendulum swing) | Must | In game | `prop_clock.png` |

### PROP-01: Wall candle sconce (unlit + 3 flicker frames)

- **Mode:** Wall prop · **Directions:** Front · **Frames:** 4
- **Grid:** 1 row x 4 cols, 1536x1024 · **In-game size:** 16x32
- **Attach:** liam_master.png (style only) · **Output:** `prop_sconce.png`
- **Notes:** Frames 2-4 loop as flicker. Light radius and colour in config.json; at night it is a light source.

```
Create a pixel-art sprite sheet of a wall candle sconce for a top-down 2D game (3/4 view). It hangs on the back wall of a room and is seen from the front.

A reference image (liam_master.png, the game's main character) is attached ONLY as a style reference. Match its art style, line work, outline thickness and shading approach. Do NOT draw that character or anything from his design.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, spooky but cosy. Not anime, not cute-kawaii, not horror.
- Setting: an old Victorian mansion in faded grandeur: once beautiful, now dusty, a few cobwebs and peeling corners, but intact. Not ruined, not broken.
- Slightly irregular, hand-drawn shapes. Nothing glossy.
- Dark outline (#1A1020) around objects and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen.
- Flat colours with minimal shading: at most 2-3 tones per material. Short dark hatching lines may be used for shadows and wood grain instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, no reflections.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow, no lighting effects (lighting is added later in the game).
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.
- Camera: top-down 2D game in 3/4 view (classic SNES-era RPG perspective): floors are seen from above, walls show their front face.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Oak floor: #4A3426 (gaps between planks, deep shadow), #6B4A33 (shadow), #8A6142 (base), #A57A55 (highlight, worn spots)
- Sage wallpaper: #5E6E58 (shadow and damask pattern), #7A8C70 (base), #96A688 (highlight)
- Walnut (wainscot, mouldings, skirting, door, window frame): #3E2C22 (dark), #56402F (base), #6E5440 (highlight)
- Wall top cap (seen from above): #2B2530 (base), #3A3340 (edge highlight)
- Dust and cobwebs: #A9A39A (shadow), #CFC9BE (base)
- Ochre velvet curtains: #7A6230 (shadow), #9C7F42 (base), #B89A5A (highlight)
- Brass (handles, hinges, sconce): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Window glass by day: #A9C2D6 (base), #CFE0EC (light)
- Window glass by night: #2F3B4A (base), #45566A (light)
- Candle wax: #D9C9A3 (shadow), #EFE3C4 (base)
- Candle flame ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere in the art.

CONTENT: a small tarnished brass wall sconce, 16 pixels wide and 32 pixels tall in game pixels.
- A decorative brass back plate fixed to the wall, a curved brass arm, a small drip tray and one wax candle with old wax drips.
- The flame is a simple flame shape in 2-3 colours. No glow, no light rays, no halo: the light is added in the game.
- Draw ONLY the sconce: no wall, no wallpaper behind it.

FRAMES, left to right:
  1. Unlit: candle with a tiny dark wick, no flame.
  2. Lit: flame upright.
  3. Lit: flame leaning slightly left and a little shorter.
  4. Lit: flame leaning slightly right and a little taller.

SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- One row of exactly 4 equal cells, each cell 384x1024 pixels.
- In every cell the sconce is the same size (256x512 image pixels = 16x32 game pixels) and in the same position, centred horizontally and vertically. Only the flame changes between frames.
- Each game pixel is a clearly visible square block of 16x16 image pixels.

BACKGROUND
- Solid flat magenta #FF00FF filling every part of the canvas that is not art.
- No scenery beyond what is described, no frame, no grid lines, no labels.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### PROP-02: Dining table (Ambrose's ritual)

- **Mode:** Floor prop · **Directions:** 3/4 view · **Frames:** 2
- **Grid:** 1 row x 2 cols, 1536x1024 · **In-game size:** 64x40
- **Attach:** liam_master.png (style only) · **Output:** `prop_table.png`
- **Notes:** Empty tabletop: the game places the settings on it one by one at night. Collision box in code. Replaces the code-drawn placeholder automatically once processed. Shown at 96 px wide (bigger than planned) so four readable place settings fit on it.

```
Create a pixel-art sprite sheet of a small dining table for a top-down 2D game (3/4 view).

A reference image (liam_master.png, the game's main character) is attached ONLY as a style reference. Match its art style, line work, outline thickness and shading approach. Do NOT draw that character or anything from his design.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, spooky but cosy. Not anime, not cute-kawaii, not horror.
- Setting: an old Victorian mansion in faded grandeur: once beautiful, now dusty, a few cobwebs and peeling corners, but intact. Not ruined, not broken.
- Slightly irregular, hand-drawn shapes. Nothing glossy.
- Dark outline (#1A1020) around objects and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen.
- Flat colours with minimal shading: at most 2-3 tones per material. Short dark hatching lines may be used for shadows and wood grain instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, no reflections.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow, no lighting effects (lighting is added later in the game).
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.
- Camera: top-down 2D game in 3/4 view (classic SNES-era RPG perspective): floors are seen from above, walls show their front face.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Oak floor: #4A3426 (gaps between planks, deep shadow), #6B4A33 (shadow), #8A6142 (base), #A57A55 (highlight, worn spots)
- Sage wallpaper: #5E6E58 (shadow and damask pattern), #7A8C70 (base), #96A688 (highlight)
- Walnut (wainscot, mouldings, skirting, door, window frame): #3E2C22 (dark), #56402F (base), #6E5440 (highlight)
- Wall top cap (seen from above): #2B2530 (base), #3A3340 (edge highlight)
- Dust and cobwebs: #A9A39A (shadow), #CFC9BE (base)
- Ochre velvet curtains: #7A6230 (shadow), #9C7F42 (base), #B89A5A (highlight)
- Brass (handles, hinges, sconce): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Window glass by day: #A9C2D6 (base), #CFE0EC (light)
- Window glass by night: #2F3B4A (base), #45566A (light)
- Candle wax: #D9C9A3 (shadow), #EFE3C4 (base)
- Candle flame ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere in the art.

CONTENT: a small Victorian dining table for four, 64 pixels wide and 40 pixels tall in game pixels.
- Seen in 3/4 view from above and in front: you see the whole tabletop surface and the front edge, with the front legs and a little of the back legs underneath.
- A cream linen tablecloth (#EFE3C4 base, #D9C9A3 shadow) covers the top and hangs a few pixels over the front edge in soft straight folds.
- Turned walnut legs (#3E2C22, #56402F, #6E5440) with small feet.
- The tabletop is EMPTY: no plates, cups, cutlery, candles or food (those are separate sprites placed by the game).
- No chairs.

FRAMES, left to right:
  1. Clean: a neat tablecloth.
  2. Faded: the same table, the cloth a little dusty (#CFC9BE dust specks near the edges) and one small cobweb between the front legs.

SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- One row of exactly 2 equal cells, each cell 768x1024 pixels.
- In both cells the table is the same size (512x320 image pixels = 64x40 game pixels) and in the same position: centred horizontally, the bottom of the front legs 160 pixels above the bottom of the cell.
- Each game pixel is a clearly visible square block of 8x8 image pixels.

BACKGROUND
- Solid flat magenta #FF00FF filling every part of the canvas that is not art.
- No scenery beyond what is described, no frame, no grid lines, no labels.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### PROP-03: Place settings (4 variants)

- **Mode:** Table prop · **Directions:** 3/4 view · **Frames:** 4
- **Grid:** 1 row x 4 cols, 1536x1024 · **In-game size:** 16x10
- **Attach:** liam_master.png (style only) · **Output:** `prop_plate.png`
- **Notes:** Ambrose sets one per animation at night; the game picks variants in order. Positions on the table in config.json → props.table.placeOffsets. Processed at 24 px wide with the cream china swapped to white so it reads on the cloth (tools/art_sheets.json).

```
Create a pixel-art sprite sheet of small place settings for a dining table in a top-down 2D game (3/4 view).

A reference image (liam_master.png, the game's main character) is attached ONLY as a style reference. Match its art style, line work, outline thickness and shading approach. Do NOT draw that character or anything from his design.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, spooky but cosy. Not anime, not cute-kawaii, not horror.
- Setting: an old Victorian mansion in faded grandeur: once beautiful, now dusty, a few cobwebs and peeling corners, but intact. Not ruined, not broken.
- Slightly irregular, hand-drawn shapes. Nothing glossy.
- Dark outline (#1A1020) around objects and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen.
- Flat colours with minimal shading: at most 2-3 tones per material. Short dark hatching lines may be used for shadows and wood grain instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, no reflections.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow, no lighting effects (lighting is added later in the game).
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.
- Camera: top-down 2D game in 3/4 view (classic SNES-era RPG perspective): floors are seen from above, walls show their front face.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Oak floor: #4A3426 (gaps between planks, deep shadow), #6B4A33 (shadow), #8A6142 (base), #A57A55 (highlight, worn spots)
- Sage wallpaper: #5E6E58 (shadow and damask pattern), #7A8C70 (base), #96A688 (highlight)
- Walnut (wainscot, mouldings, skirting, door, window frame): #3E2C22 (dark), #56402F (base), #6E5440 (highlight)
- Wall top cap (seen from above): #2B2530 (base), #3A3340 (edge highlight)
- Dust and cobwebs: #A9A39A (shadow), #CFC9BE (base)
- Ochre velvet curtains: #7A6230 (shadow), #9C7F42 (base), #B89A5A (highlight)
- Brass (handles, hinges, sconce): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Window glass by day: #A9C2D6 (base), #CFE0EC (light)
- Window glass by night: #2F3B4A (base), #45566A (light)
- Candle wax: #D9C9A3 (shadow), #EFE3C4 (base)
- Candle flame ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere in the art.

CONTENT: one place setting per cell, as it lies on a tablecloth, seen from above at a slight angle. Each is about 16 pixels wide and 10 pixels tall in game pixels.
- A round cream china dinner plate (#EFE3C4, #D9C9A3) with a thin tarnished brass rim line (#9C8352), drawn as a flattened oval because of the 3/4 view.
- Tarnished brass cutlery (#6E5A3A, #9C8352, #C2AA72): a fork on the left of the plate, a knife on the right.
- Do NOT draw the tablecloth or the table: only the setting itself on the magenta background.

FRAMES, left to right:
  1. Plate, fork and knife.
  2. The same with a folded cream napkin on the plate.
  3. The same with a small teacup on a saucer beside the plate.
  4. The same with a fine cobweb across the plate (it has waited a long time).

SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- One row of exactly 4 equal cells, each cell 384x1024 pixels.
- In every cell the setting is the same size (256x160 image pixels = 16x10 game pixels), centred horizontally and vertically.
- Each game pixel is a clearly visible square block of 16x16 image pixels.

BACKGROUND
- Solid flat magenta #FF00FF filling every part of the canvas that is not art.
- No scenery beyond what is described, no frame, no grid lines, no labels.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### PROP-04: Grandfather clock (pendulum swing)

- **Mode:** Wall prop · **Directions:** Front · **Frames:** 3
- **Grid:** 1 row x 3 cols, 1536x1024 · **In-game size:** 26x88
- **Attach:** liam_master.png (style only) · **Output:** `prop_clock.png`
- **Notes:** Face WITHOUT hands: the game draws them (game time, or Ambrose's hour after he winds it back). After processing, the face position is set in config.json → props.clock.faceOffset.

```
Create a pixel-art sprite sheet of a grandfather clock for a top-down 2D game (3/4 view). The clock stands against the back wall of a room and is seen from the front.

A reference image (liam_master.png, the game's main character) is attached ONLY as a style reference. Match its art style, line work, outline thickness and shading approach. Do NOT draw that character or anything from his design.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, spooky but cosy. Not anime, not cute-kawaii, not horror.
- Setting: an old Victorian mansion in faded grandeur: once beautiful, now dusty, a few cobwebs and peeling corners, but intact. Not ruined, not broken.
- Slightly irregular, hand-drawn shapes. Nothing glossy.
- Dark outline (#1A1020) around objects and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen.
- Flat colours with minimal shading: at most 2-3 tones per material. Short dark hatching lines may be used for shadows and wood grain instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, no reflections.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow, no lighting effects (lighting is added later in the game).
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.
- Camera: top-down 2D game in 3/4 view (classic SNES-era RPG perspective): floors are seen from above, walls show their front face.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Oak floor: #4A3426 (gaps between planks, deep shadow), #6B4A33 (shadow), #8A6142 (base), #A57A55 (highlight, worn spots)
- Sage wallpaper: #5E6E58 (shadow and damask pattern), #7A8C70 (base), #96A688 (highlight)
- Walnut (wainscot, mouldings, skirting, door, window frame): #3E2C22 (dark), #56402F (base), #6E5440 (highlight)
- Wall top cap (seen from above): #2B2530 (base), #3A3340 (edge highlight)
- Dust and cobwebs: #A9A39A (shadow), #CFC9BE (base)
- Ochre velvet curtains: #7A6230 (shadow), #9C7F42 (base), #B89A5A (highlight)
- Brass (handles, hinges, sconce): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Window glass by day: #A9C2D6 (base), #CFE0EC (light)
- Window glass by night: #2F3B4A (base), #45566A (light)
- Candle wax: #D9C9A3 (shadow), #EFE3C4 (base)
- Candle flame ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere in the art.

CONTENT: a tall Victorian longcase (grandfather) clock, 26 pixels wide and 88 pixels tall in game pixels.
- Walnut case (#3E2C22, #56402F, #6E5440): a hood at the top with a small carved crest, a long narrow trunk, a wider base standing on the floor.
- In the hood: a round cream clock face (#EFE3C4 with a #D9C9A3 ring), 14 game pixels across, centred horizontally, with ONLY twelve small dark tick marks around the edge.
- The clock face has NO hands and NO numerals and NO text: the game draws the hands itself.
- In the trunk: a narrow glass window (#2F3B4A, #45566A, flat, no reflections) showing a long brass pendulum (#6E5A3A, #9C8352, #C2AA72) with a round bob.
- A little dust on the top of the hood. No glow, no light effects.
- Draw ONLY the clock: no wall, no wallpaper, no floor.

FRAMES, left to right (only the pendulum moves):
  1. Pendulum swung to the left.
  2. Pendulum hanging straight down in the centre.
  3. Pendulum swung to the right.

SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- One row of exactly 3 equal cells, each cell 512x1024 pixels.
- In every cell the clock is the same size (260x880 image pixels = 26x88 game pixels) and in the same position: centred horizontally, its base 64 pixels above the bottom of the cell.
- Each game pixel is a clearly visible square block of 10x10 image pixels.
- The clock face must be in exactly the same place in all three frames.

BACKGROUND
- Solid flat magenta #FF00FF filling every part of the canvas that is not art.
- No scenery beyond what is described, no frame, no grid lines, no labels.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

## Mansion

| ID | Asset | Priority | Status | Output file |
|---|---|---|---|---|
| MAN-01 | Test room - oak floor tiles (24) | Must | In game | `tiles_floor_oak.png` |
| MAN-02 | Test room - wall face strips + wall caps | Must | In game | `tiles_wall_sage.png` |
| MAN-03 | Test room - window with curtains (day/night) | Must | In game | `prop_window_sash.png` |
| MAN-04 | Test room - panelled door | Must | In game | `prop_door_panel.png` |

### MAN-01: Test room - oak floor tiles (24)

- **Mode:** Tileset · **Directions:** Top view · **Frames:** 24
- **Grid:** 4 rows x 6 cols, 1536x1024 (256 px cells) · **In-game size:** 16x16 per tile
- **Attach:** liam_master.png (style only) · **Output:** `tiles_floor_oak.png`
- **Notes:** Seamless. process_art.py splits the grid, snaps the palette and checks the edges tile. Row 4 holds the wall shadow and cobweb corner tiles.

```
Create a pixel-art tileset of floor tiles for a top-down 2D game (3/4 view).

A reference image (liam_master.png, the game's main character) is attached ONLY as a style reference. Match its art style, line work, outline thickness and shading approach. Do NOT draw that character or anything from his design.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, spooky but cosy. Not anime, not cute-kawaii, not horror.
- Setting: an old Victorian mansion in faded grandeur: once beautiful, now dusty, a few cobwebs and peeling corners, but intact. Not ruined, not broken.
- Slightly irregular, hand-drawn shapes. Nothing glossy.
- Dark outline (#1A1020) around objects and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen.
- Flat colours with minimal shading: at most 2-3 tones per material. Short dark hatching lines may be used for shadows and wood grain instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, no reflections.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow, no lighting effects (lighting is added later in the game).
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.
- Camera: top-down 2D game in 3/4 view (classic SNES-era RPG perspective): floors are seen from above, walls show their front face.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Oak floor: #4A3426 (gaps between planks, deep shadow), #6B4A33 (shadow), #8A6142 (base), #A57A55 (highlight, worn spots)
- Sage wallpaper: #5E6E58 (shadow and damask pattern), #7A8C70 (base), #96A688 (highlight)
- Walnut (wainscot, mouldings, skirting, door, window frame): #3E2C22 (dark), #56402F (base), #6E5440 (highlight)
- Wall top cap (seen from above): #2B2530 (base), #3A3340 (edge highlight)
- Dust and cobwebs: #A9A39A (shadow), #CFC9BE (base)
- Ochre velvet curtains: #7A6230 (shadow), #9C7F42 (base), #B89A5A (highlight)
- Brass (handles, hinges, sconce): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Window glass by day: #A9C2D6 (base), #CFE0EC (light)
- Window glass by night: #2F3B4A (base), #45566A (light)
- Candle wax: #D9C9A3 (shadow), #EFE3C4 (base)
- Candle flame ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere in the art.

CONTENT: oak plank floor tiles
- Each tile is a 16x16 pixel square of floor seen from directly above.
- Horizontal oak planks, 4 planks per tile, each plank 4 pixels tall, with 1-pixel dark gaps (#4A3426) between planks. Plank ends are staggered; a plank joint appears in some tiles but not all.
- SEAMLESS: every tile must tile with every other tile in all four directions. The planks line up exactly at the left and right edges, and the gap lines are at the same heights in every tile.
- NO outline around the tile edges. Outlines are only used on details (nails, cracks, cobwebs).
- Wood grain is suggested with a few short hatching lines, not noise.

TILES, left to right, row by row:
- Row 1 (plain, 6 variants): clean oak planks; each variant has the plank joints and grain lines in different places.
- Row 2 (worn, 6 variants): the same planks with lighter worn patches (#A57A55) where people walked, and a few scratches.
- Row 3 (details, 6 tiles): a wood knot; two small nail heads; a thin crack; a dark old stain; a slightly raised loose board (one plank with a highlight edge and shadow); a tiny mouse-hole-sized gap between planks.
- Row 4 (dust and edges, 6 tiles): a light dust patch; a heavy dust patch with a few footprints; a cobweb filling the top-left corner; a cobweb filling the top-right corner; the floor with a 4-pixel dark shadow band along the TOP edge (where the floor meets a wall); the floor with a 3-pixel dark shadow band along the LEFT edge.

SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- A grid of exactly 6 columns and 4 rows of equal square cells, each cell 256x256 pixels, 24 tiles in total.
- Every cell is completely filled edge to edge by its tile (no magenta inside cells, no gaps between cells).
- Each cell is ONE game tile drawn hugely enlarged: every game pixel is a clearly visible square block of 16x16 image pixels, aligned to a strict grid. Keep shapes bold and simple; the tile is downscaled to its in-game size.

BACKGROUND
- Solid flat magenta #FF00FF filling nothing: the tiles fill the whole canvas, so no magenta should be visible.
- No scenery beyond what is described, no frame, no grid lines, no labels.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### MAN-02: Test room - wall face strips + wall caps

- **Mode:** Tileset · **Directions:** Front (wall), top (caps) · **Frames:** 12
- **Grid:** 6 strips 256x768 + 6 cells 256x256, 1536x1024 · **In-game size:** 16x48 strips, 16x16 caps
- **Attach:** liam_master.png (style only) · **Output:** `tiles_wall_sage.png`
- **Notes:** Back wall is 3 tiles tall. Side and south walls are drawn as caps only (3/4 view).

```
Create a pixel-art tileset of interior wall pieces for a top-down 2D game (3/4 view).

A reference image (liam_master.png, the game's main character) is attached ONLY as a style reference. Match its art style, line work, outline thickness and shading approach. Do NOT draw that character or anything from his design.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, spooky but cosy. Not anime, not cute-kawaii, not horror.
- Setting: an old Victorian mansion in faded grandeur: once beautiful, now dusty, a few cobwebs and peeling corners, but intact. Not ruined, not broken.
- Slightly irregular, hand-drawn shapes. Nothing glossy.
- Dark outline (#1A1020) around objects and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen.
- Flat colours with minimal shading: at most 2-3 tones per material. Short dark hatching lines may be used for shadows and wood grain instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, no reflections.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow, no lighting effects (lighting is added later in the game).
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.
- Camera: top-down 2D game in 3/4 view (classic SNES-era RPG perspective): floors are seen from above, walls show their front face.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Oak floor: #4A3426 (gaps between planks, deep shadow), #6B4A33 (shadow), #8A6142 (base), #A57A55 (highlight, worn spots)
- Sage wallpaper: #5E6E58 (shadow and damask pattern), #7A8C70 (base), #96A688 (highlight)
- Walnut (wainscot, mouldings, skirting, door, window frame): #3E2C22 (dark), #56402F (base), #6E5440 (highlight)
- Wall top cap (seen from above): #2B2530 (base), #3A3340 (edge highlight)
- Dust and cobwebs: #A9A39A (shadow), #CFC9BE (base)
- Ochre velvet curtains: #7A6230 (shadow), #9C7F42 (base), #B89A5A (highlight)
- Brass (handles, hinges, sconce): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Window glass by day: #A9C2D6 (base), #CFE0EC (light)
- Window glass by night: #2F3B4A (base), #45566A (light)
- Candle wax: #D9C9A3 (shadow), #EFE3C4 (base)
- Candle flame ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere in the art.

CONTENT: the back (north) wall of a room, seen from the front, plus the wall-top caps seen from above.
WALL FACE STRIP (top part of the sheet): each strip is 16 pixels wide and 48 pixels tall, and from top to bottom shows:
- 4 px crown moulding in walnut along the top.
- 24 px sage-green wallpaper with a faded damask pattern (pattern drawn in #5E6E58 on #7A8C70).
- 2 px walnut chair rail.
- 14 px walnut wainscot panel with a simple raised-panel shape.
- 4 px dark walnut skirting board at the bottom.
- SEAMLESS horizontally: strips tile left-to-right with each other; the damask pattern and the mouldings continue across the left and right edges. No outline on the left and right edges.
WALL CAPS (bottom row): 16x16 pixel tiles showing the thick top of a wall seen from directly above: a flat dark band (#2B2530) with a thin lighter edge (#3A3340) on the side facing the room.

PIECES:
- Top part, 6 wall face strips, left to right: (1) plain; (2) plain with the damask pattern shifted half a repeat; (3) a corner of wallpaper peeling down from the top; (4) a faded, slightly lighter water-stained patch on the wallpaper; (5) a cobweb hanging from the crown moulding; (6) a small crack in the wainscot panel.
- Bottom row, 6 wall caps, left to right: (1) horizontal cap, room side at the bottom; (2) vertical cap, room side on the right (west wall); (3) vertical cap, room side on the left (east wall); (4) outer corner, top-left; (5) outer corner, top-right; (6) horizontal cap, room side at the top (south wall).

SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- Top part: 6 columns, each 256 pixels wide and 768 pixels tall, each completely filled by one wall face strip (16x48 game pixels).
- Bottom row: 6 square cells of 256x256 pixels, each completely filled by one wall cap tile (16x16 game pixels).
- Each cell is ONE game tile drawn hugely enlarged: every game pixel is a clearly visible square block of 16x16 image pixels, aligned to a strict grid. Keep shapes bold and simple; the tile is downscaled to its in-game size.

BACKGROUND
- Solid flat magenta #FF00FF filling nothing: the pieces fill the whole canvas, so no magenta should be visible.
- No scenery beyond what is described, no frame, no grid lines, no labels.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### MAN-03: Test room - window with curtains (day/night)

- **Mode:** Wall prop · **Directions:** Front · **Frames:** 8
- **Grid:** 2 rows x 4 cols, 1536x1024 · **In-game size:** 48x48
- **Attach:** liam_master.png (style only) · **Output:** `prop_window_sash.png`
- **Notes:** Curtain open/half/closed = puzzle states. The sunbeam on the floor is drawn in code from the open pane area. Day/night glass swap in code.

```
Create a pixel-art sprite sheet of a window with curtains for a top-down 2D game (3/4 view). The window hangs on the back wall of a room and is seen from the front.

A reference image (liam_master.png, the game's main character) is attached ONLY as a style reference. Match its art style, line work, outline thickness and shading approach. Do NOT draw that character or anything from his design.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, spooky but cosy. Not anime, not cute-kawaii, not horror.
- Setting: an old Victorian mansion in faded grandeur: once beautiful, now dusty, a few cobwebs and peeling corners, but intact. Not ruined, not broken.
- Slightly irregular, hand-drawn shapes. Nothing glossy.
- Dark outline (#1A1020) around objects and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen.
- Flat colours with minimal shading: at most 2-3 tones per material. Short dark hatching lines may be used for shadows and wood grain instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, no reflections.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow, no lighting effects (lighting is added later in the game).
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.
- Camera: top-down 2D game in 3/4 view (classic SNES-era RPG perspective): floors are seen from above, walls show their front face.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Oak floor: #4A3426 (gaps between planks, deep shadow), #6B4A33 (shadow), #8A6142 (base), #A57A55 (highlight, worn spots)
- Sage wallpaper: #5E6E58 (shadow and damask pattern), #7A8C70 (base), #96A688 (highlight)
- Walnut (wainscot, mouldings, skirting, door, window frame): #3E2C22 (dark), #56402F (base), #6E5440 (highlight)
- Wall top cap (seen from above): #2B2530 (base), #3A3340 (edge highlight)
- Dust and cobwebs: #A9A39A (shadow), #CFC9BE (base)
- Ochre velvet curtains: #7A6230 (shadow), #9C7F42 (base), #B89A5A (highlight)
- Brass (handles, hinges, sconce): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Window glass by day: #A9C2D6 (base), #CFE0EC (light)
- Window glass by night: #2F3B4A (base), #45566A (light)
- Candle wax: #D9C9A3 (shadow), #EFE3C4 (base)
- Candle flame ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere in the art.

CONTENT: a tall Victorian sash window, 48 pixels wide and 48 pixels tall in game pixels.
- Walnut window frame with a sill at the bottom, 2 columns x 3 rows of glass panes separated by thin walnut bars.
- Glass is flat and opaque: no reflections, no view of anything outside, only the flat glass colours from the palette (one or two straight pale streaks per pane are allowed).
- Heavy ochre velvet curtains hang from a walnut curtain rod with small brass finials across the top. Curtains have a few strong vertical folds.
- Draw ONLY the window, rod and curtains: no wall, no wallpaper around it.

FRAMES, left to right:
- Row 1 (day glass #A9C2D6 / #CFE0EC): (1) curtains open, tied back to both sides with brass-coloured tassels, all panes visible; (2) curtains half closed, covering the outer pane columns; (3) curtains fully closed, meeting in the middle, no glass visible; (4) the bare window with no curtains and no rod.
- Row 2 (night glass #2F3B4A / #45566A): the same four states as row 1.

SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- A grid of exactly 4 columns and 2 rows of equal cells, each cell 384x512 pixels, 8 frames in total.
- In every cell the window is the same size (384x384 image pixels = 48x48 game pixels) and in the same position: centred horizontally, its bottom edge 32 pixels above the bottom of the cell.
- Each game pixel is a clearly visible square block of 8x8 image pixels.

BACKGROUND
- Solid flat magenta #FF00FF filling every part of the canvas that is not art.
- No scenery beyond what is described, no frame, no grid lines, no labels.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

### MAN-04: Test room - panelled door

- **Mode:** Wall prop · **Directions:** Front · **Frames:** 3
- **Grid:** 1 row x 3 cols, 1536x1024 · **In-game size:** 32x48
- **Attach:** liam_master.png (style only) · **Output:** `prop_door_panel.png`
- **Notes:** Closed / ajar / open. Liam's door pose plays when he enters through it.

```
Create a pixel-art sprite sheet of a door for a top-down 2D game (3/4 view). The door is set into the back wall of a room and is seen from the front.

A reference image (liam_master.png, the game's main character) is attached ONLY as a style reference. Match its art style, line work, outline thickness and shading approach. Do NOT draw that character or anything from his design.

STYLE
- Gothic storybook style translated into pixel art: think Edward Gorey and Tim Burton illustrations. Darkly whimsical, spooky but cosy. Not anime, not cute-kawaii, not horror.
- Setting: an old Victorian mansion in faded grandeur: once beautiful, now dusty, a few cobwebs and peeling corners, but intact. Not ruined, not broken.
- Slightly irregular, hand-drawn shapes. Nothing glossy.
- Dark outline (#1A1020) around objects and major shapes, slightly uneven and hand-inked looking, as if drawn with a scratchy pen.
- Flat colours with minimal shading: at most 2-3 tones per material. Short dark hatching lines may be used for shadows and wood grain instead of smooth shading.
- Everything is matte: no shine, no glints, no specular highlights, no reflections.
- Crisp pixel art with hard pixel edges. No anti-aliasing, no blur, no gradients, no glow, no lighting effects (lighting is added later in the game).
- Every pixel must be one flat colour from the palette below.
- Light comes from the top-left.
- Camera: top-down 2D game in 3/4 view (classic SNES-era RPG perspective): floors are seen from above, walls show their front face.

PALETTE (exact hex, use nothing else):
- Outline and hatching: #1A1020
- Oak floor: #4A3426 (gaps between planks, deep shadow), #6B4A33 (shadow), #8A6142 (base), #A57A55 (highlight, worn spots)
- Sage wallpaper: #5E6E58 (shadow and damask pattern), #7A8C70 (base), #96A688 (highlight)
- Walnut (wainscot, mouldings, skirting, door, window frame): #3E2C22 (dark), #56402F (base), #6E5440 (highlight)
- Wall top cap (seen from above): #2B2530 (base), #3A3340 (edge highlight)
- Dust and cobwebs: #A9A39A (shadow), #CFC9BE (base)
- Ochre velvet curtains: #7A6230 (shadow), #9C7F42 (base), #B89A5A (highlight)
- Brass (handles, hinges, sconce): #6E5A3A (shadow), #9C8352 (base), #C2AA72 (highlight)
- Window glass by day: #A9C2D6 (base), #CFE0EC (light)
- Window glass by night: #2F3B4A (base), #45566A (light)
- Candle wax: #D9C9A3 (shadow), #EFE3C4 (base)
- Candle flame ONLY: #FFB13B (outer), #FFE08A (core)
Do not use magenta (#FF00FF) or any pink/purple close to it anywhere in the art.

CONTENT: a Victorian panelled door, 32 pixels wide and 48 pixels tall in game pixels.
- Walnut door with four raised panels and a walnut door frame (architrave) around it.
- A round brass knob on the right side and a small brass keyhole plate under it.
- A little dust on the top of the frame; one small cobweb in the top-left corner of the frame.
- Draw ONLY the door and its frame: no wall, no wallpaper around it.

FRAMES, left to right:
  1. Closed.
  2. Ajar: the door swung slightly inward, a thin dark gap (#1A1020) visible on the right side.
  3. Open: the door swung fully inward and out of sight; the frame now surrounds a dark doorway (#1A1020 with a #2B2530 floor edge at the bottom).

SHEET LAYOUT
- Canvas: 1536x1024 pixels, landscape.
- One row of exactly 3 equal cells, each cell 512x1024 pixels.
- In every cell the door with its frame is the same size (512x768 image pixels = 32x48 game pixels), centred horizontally, its bottom edge 128 pixels above the bottom of the cell.
- Each game pixel is a clearly visible square block of 16x16 image pixels.

BACKGROUND
- Solid flat magenta #FF00FF filling every part of the canvas that is not art.
- No scenery beyond what is described, no frame, no grid lines, no labels.

NO TEXT: no letters, labels, numbers, captions, signatures or watermarks anywhere in the image.
```

## Garden

*No prompts yet.*
