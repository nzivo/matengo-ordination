---
name: Liturgical Ordination System
colors:
  surface: '#f8f9ff'
  surface-dim: '#d2daea'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eefe'
  surface-container-high: '#e1e8f8'
  surface-container-highest: '#dbe3f2'
  on-surface: '#141c27'
  on-surface-variant: '#4c4639'
  inverse-surface: '#29313c'
  inverse-on-surface: '#eaf1ff'
  outline: '#7e7667'
  outline-variant: '#cfc5b4'
  surface-tint: '#735c17'
  primary: '#735c17'
  on-primary: '#ffffff'
  primary-container: '#c5a85c'
  on-primary-container: '#4f3d00'
  inverse-primary: '#e2c374'
  secondary: '#525f71'
  on-secondary: '#ffffff'
  secondary-container: '#d3e1f6'
  on-secondary-container: '#566475'
  tertiary: '#a5393e'
  on-tertiary: '#ffffff'
  tertiary-container: '#ff8889'
  on-tertiary-container: '#7b1922'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdf90'
  primary-fixed-dim: '#e2c374'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#584400'
  secondary-fixed: '#d6e4f9'
  secondary-fixed-dim: '#bac8dc'
  on-secondary-fixed: '#0f1c2c'
  on-secondary-fixed-variant: '#3a4859'
  tertiary-fixed: '#ffdad9'
  tertiary-fixed-dim: '#ffb3b2'
  on-tertiary-fixed: '#410008'
  on-tertiary-fixed-variant: '#852129'
  background: '#f8f9ff'
  on-background: '#141c27'
  surface-variant: '#dbe3f2'
typography:
  display:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: 0.02em
  display-mobile:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 44px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: 0.015em
  headline-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 26px
    fontWeight: '500'
    lineHeight: 34px
    letterSpacing: 0.015em
  headline-md:
    fontFamily: EB Garamond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0.01em
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0.01em
  rubric:
    fontFamily: EB Garamond
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  label-lg:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.06em
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  versicle:
    fontFamily: EB Garamond
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

This design system embodies solemnity, transcendent dignity, and sacred clarity, tailored specifically for the celebration and liturgical participation of holy orders (diaconate and priesthood). Rooted in the visual lineage of illuminated Roman missals, liturgical vestments, and classical architectural proportions, the aesthetic balances ancient reverence with contemporary digital legibility.

### Target Audience & Tone
The experience serves ordinands, clergy, family members, congregants, and multi-generational observers. The atmosphere evokes contemplation, sacred order, and architectural permanence. Every screen mirrors the tactile gravity of an archival printed order of service: quiet breathing space, balanced bilateral symmetry, razor-sharp architectural geometry, and disciplined ornamentation.

### Aesthetic Principles
- **Sacred Restraint:** Generous negative space acts as liturgical silence, directing attention to the rite, scripture, and canonical declarations without visual noise.
- **Architectural Precision:** Absolute sharp edges (`roundedness: 0`), fine hairline dividing rules, and bilateral columnar balance echo cathedral floorplans and classical vellum manuscripts.
- **Subtle Illumination:** Muted gold serves not as loud decoration, but as an accent of sacred consecration—reminiscent of gold-leaf manuscript initials, altar vessels, and liturgical vestment embroidery.

## Colors

The palette is derived directly from traditional liturgical colors: Marian night sky, consecrated gold leaf, communion rubric red, and illuminated warm parchment.

### Palette Architecture
- **Primary (`#C5A85C` - Consecrated Muted Gold):** Reserved for focal liturgical anchors, insignia, delicate borders, selected key callouts, and interactive indicators.
- **Secondary (`#0D1B2A` - Marian Navy):** The deep theological ground; used for structural headers, primary dark surface containers, authoritative buttons, and grounding typographic elements.
- **Tertiary (`#8A252C` - Sacramental Rubric Crimson):** Used sparingly for traditional liturgical rubrics (instructive liturgical directions), choral versicles (`℣ / ℟`), and liturgical solemnity markers.
- **Neutral (`#1B232E` - Roman Slate Charcoal):** High-legibility text tone providing maximum clarity and contrast across light substrates while avoiding the starkness of pure black.

### Surface System
- **Canvas / Substrate (`#FAF7F2` - Warm Ivory Vellum):** The primary reading background, evoking heavy archival cotton paper.
- **Elevated Canvas (`#FFFFFF` - Pure Altar Linen):** Used for cards, scripture blocks, and modal sheets.
- **Subtle Surface Container (`#F4EFE6` - Pressed Parchment):** For secondary panels, inactive segments, and grouped liturgical steps.
- **Borders & Dividers (`#E2D9C8` / `#C5A85C33`):** 1px fine hairlines providing crisp structural definition without visual heaviness.

## Typography

The typographic hierarchy establishes an intentional dialog between the sacred past and functional modernity. 

### Typographic Roles
- **EB Garamond (Display, Headings, Rubrics):** Echoes the formal beauty of Renaissance liturgical printmaking and early Christian epigraphy. Roman capitals must be tracked deliberately (`0.06em` to `0.08em`) when set in small caps or headings.
- **Manrope (Body, Metadata, Functional Labels):** Provides pristine geometric legibility for hymns, congregational responses, mass itineraries, and accessible readings across high-glare or low-light sanctuary environments.
- **The Rubric Style (`rubric`):** Always formatted in italicized EB Garamond colored with Tertiary Rubric Crimson (`#8A252C`), signaling instructional gestures or liturgical directives (e.g., *“All kneel,”* *“The bishop lays hands in silence”*).
- **Versicles & Responses (`versicle`):** Special notation markers (`℣.` and `℟.`) are keyed in crimson italic serif, followed directly by crisp Manrope congregational text.

## Layout & Spacing

The layout is built upon architectural classical proportions (Golden Ratio and bilateral symmetry), delivering a calm, ordered reading rhythm.

### Grid Architecture
- **Desktop (1024px+):** 12-column grid, max-width of `1140px` for general layouts, constrained to a reading column of `720px` for prayers, rites, and liturgical scripts. Gutters are fixed at `1.5rem` (`24px`), with outer margins of `3rem` (`48px`).
- **Tablet (768px - 1023px):** 8-column grid with `1.5rem` gutters and `2rem` margins.
- **Mobile (< 768px):** 4-column fluid layout with `1rem` gutters and `1.25rem` margins. All prayer sequences and litanies retain single-column focus to preserve liturgical concentration.

### Spacing Philosophy
- Vertical rhythm follows generous increments (`space-xl` and `space-2xl`) between major sections of the rite, mimicking page breaks in hand-bound service books.
- Fine structural crosslines (0.5pt to 1pt) separate sequential liturgical rites, accompanied by `space-lg` above and below.

## Elevation & Depth

To sustain a solemn and organic atmosphere, drop shadows are strictly restrained. The system rejects floating, puffy elevations in favor of architectural layering, tonal warmth, and crisp frame insets.

### Surface Tiers
1. **Sanctuary Base (Level 0):** Background parchment `#FAF7F2`. Completely flat, non-elevated.
2. **Tabula Card / Altar Linen (Level 1):** `#FFFFFF` surface bordered by a crisp `1px solid #E2D9C8`. A faint, diffused ambient glow is permitted: `0 2px 8px rgba(13, 27, 42, 0.04)`.
3. **Liturgical Monstrance Overlay (Level 2 - Modals & Litany Drawers):** `#FAF7F2` surface encased with a double hairline border: an outer 1px border of `#0D1B2A` and an inner 1px inset of `#C5A85C` (at a 3px inset). Shadow: `0 12px 32px rgba(13, 27, 42, 0.08)`.

### Decorative Insets
Cards and prominent solemn notices use classical bookbinder blind-debossing or gilded insets: a dual hairline border (1px outer, 1px inner with 4px gap), anchoring the card with ceremonial reverence.

## Shapes

In harmony with classical sacred architecture, marble altars, and cut stone inscriptions, the shape language uses an absolute sharp corner geometry (`roundedness: 0`).

- **Radius:** Strictly `0px` across buttons, cards, dialogs, badges, and form inputs.
- **Architectural Motifs:** Visual rhythm is achieved through chamfered corners on select decorative framing banners or diamond cutouts (`45deg` rotated squares) used as bullet glyphs or liturgical section dividers.
- **Dividers:** Horizontal dividing rules are terminated with miniature center-aligned symbols (such as a delicate Greek cross `✟`, Chi-Rho, or Alpha-Omega monogram) rendered in muted gold `#C5A85C`.

## Components

### Buttons
- **Primary (Solemn Action):** Sharp rectangular Marian Navy `#0D1B2A` fill, text in `#FFFFFF` set in `label-lg`, bordered by an accent hairline of `#C5A85C`. Active/Hover states transition to a slightly deeper tone with an illuminated gold outer ring (`outline: 1px solid #C5A85C`).
- **Secondary (Votive / Outlined):** Transparent background, sharp 1px `#C5A85C` solid border, text in `#0D1B2A` or `#C5A85C`. Hover fills with `#C5A85C14` (8% opacity).
- **Text / Rubrical:** No border or fill. EB Garamond Italicized with a subtle bottom hairline on hover.

### Cards & Liturgical Tabulae
- Background in pure `#FFFFFF` or pale parchment `#F4EFE6`.
- Bordered with a precise `1px solid #E2D9C8`. Optional formal variants feature an inner concentric gold hairline border spaced 4px from the edge.
- Header contains uppercase category tracking in `label-md` accompanied by an understated Roman numeral or cross icon.

### Chips & Liturgical Tags
- Sharp rectangular tags (`0px` radius).
- Light parchment background (`#F4EFE6`) with `1px solid #C5A85C` and `label-md` typography.
- Used for liturgical classification (e.g., *“RITE OF ORDINATION”*, *“LITANY OF SUPPLICATION”*, *“EUCHARISTIC PRAYER”*).

### Lists & Litany Formatters
- **Versicle-Response Pairs:** Left-aligned red `℣.` or `℟.` glyph in EB Garamond bold, followed by a hanging indent with response text in Manrope.
- Separators between petitions are hairline dividers `#E2D9C8`, preserving serene readability for reading aloud.

### Input Fields & Selectors
- Flat `#FFFFFF` fields with sharp `1px solid #C5A85C80` borders.
- Floating labels in `label-md` transitioning to `#0D1B2A`.
- Focus state replaces the border with a high-contrast 1px solid `#0D1B2A` and a secondary 1px outer hairline in `#C5A85C`.

### Checkboxes & Radios
- Sharp square check indicators (`0px` radius) with 1px `#0D1B2A` border. Checked state fills with `#0D1B2A` displaying an inner muted gold `#C5A85C` checkmark.
- Radio buttons use sharp diamond orientations (a rotated square) rather than circular forms, preserving the distinct angular architectural motif.

### Specialized Ordination Components
- **Liturgical Pericope Box:** A scripture reading card with a gilded vertical bar (3px `#C5A85C`) on the left, an incipit drop-cap in EB Garamond, and the chapter/verse citation placed in small-caps below.
- **Ordinand Profile Card:** Symmetrical frame showcasing portrait, biblical patron, vesting details, and diaconal/sacerdotal motto.