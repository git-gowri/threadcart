# Design Brief

**Purpose**: Premium e-commerce apparel platform with editorial, product-centric aesthetic.

**Tone**: Modern luxury retail — refined, contemporary, gallery-like. Product is hero; UI fades.

**Palette**:
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary | Charcoal (0.15 L) | Warm Cream (0.85 L) | Navigation, text |
| Accent | Warm Taupe (0.62 L 55°H) | Warm Taupe (0.72 L 55°H) | CTAs, highlights |
| Background | Cream (0.95 L 110°H) | Deep Charcoal (0.12 L) | Page base |
| Card | White (1.0 L) | Deep Charcoal (0.15 L) | Product cards |

**Typography**:
- Display: Fraunces (serif) — product names, headings
- Body: General Sans (sans-serif) — descriptions, UI labels
- Mono: Geist Mono — codes, technical content

**Shape Language**: Sharp corners (0px radius), generous whitespace, visible borders on cards, subtle warm accents.

**Structural Zones**:
| Zone | Treatment |
|------|-----------|
| Header/Nav | White/Deep card with taupe accent on active state |
| Product Grid | Cream background, white card cells, sharp corners |
| Sidebar Filters | White/Deep card, taupe highlight on selected filter |
| Footer | Muted background with minimal text hierarchy |

**Spacing & Rhythm**: Generous padding (2rem sections), breathing room around cards, tight internal card spacing for focus.

**Component Patterns**: Product card as primary unit (image > name > price > CTA), category chips with taupe highlight on select, breadcrumb navigation in serif display font.

**Motion**: Smooth fade-in on product image load (0.3s), hover scale on interactive elements, transitions on color/state changes.

**Constraints**: No gradients, no rounded corners, no animations beyond fade/scale. Warm accent used sparingly — only CTA buttons and active states. No drop-shadow; subtle elevation via border or background change.

**Signature Detail**: Product images with subtle shadow (elevation shadow), warm taupe accent on "Add to Cart" creating visual focus without noise.
