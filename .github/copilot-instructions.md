# Té Matcha Ceremony - AI Coding Assistant Instructions

## Project Overview
A React + Vite landing page for selling Matcha Ceremony tea. Single-page application (SPA) with no backend, hosted statically. Focus on high-performance animations, responsive design, and conversion-optimized UX.

**Tech Stack**: React 19, Vite, Framer Motion (animations), Lucide React (icons), ESLint (linting)

---

## Architecture & Key Components

### Component Structure
- **App.jsx** (274 lines): Single root component containing all sections
- **Inline Components**: `BenefitCard`, `RecipeCard`, `Logo` defined within App.jsx
- **No separate component files**: All UI logic consolidated for maintainability at current scale

### Section Layout (App.jsx follows this order)
1. **WhatsApp Float Button** - Fixed position CTA, always visible
2. **Navbar** - Fixed header with logo and navigation links
3. **Hero Section** - Product showcase with Framer Motion animations
4. **Benefits Section** - 4 benefit cards with lazy animation (whileInView)
5. **Recipes Section** - 5 recipe image cards with click-to-modal functionality
6. **Modal** - AnimatePresence wrapper for smooth recipe detail display
7. **Footer** - Social links, about, navigation

### Critical Implementation Details
- **Scroll Lock on Modal**: Uses `useEffect` to prevent body scroll when modal active (lines 33-44)
- **WhatsApp Integration**: Hardcoded number and pre-filled message via `encodeURIComponent`
- **Image Assets**: All images referenced from `/public/` directory (hero.jpg, recipe-*.jpg, logo-removebg-preview.png)
- **Framer Motion Patterns**:
  - Hero elements use `initial → animate` with staggered delays
  - Benefit cards use `whileInView` for scroll-triggered animations (once: true = animation fires only once)
  - Modal uses `AnimatePresence` for enter/exit animations

---

## Styling Architecture (App.css)

### Design System
**CSS Variables** (lines 14-30):
- Colors: `--color-primary` (#4A6741 dark green), `--color-accent` (#D4AF37 gold), `--color-text`, `--color-bg-light`
- Fonts: `--font-primary` (Inter), `--font-display` (Playfair Display serif)
- Spacing: `--spacing-xs` to `--spacing-xl` (0.5rem to 5rem increments)
- Transitions: `--transition: 0.3s ease` (use for all animatable properties)

### Layout Classes
- `.container` - Max-width 1200px, centered with 2rem padding
- `.nav-content`, `.hero-grid`, `.footer-grid` - Use CSS Grid/Flexbox for layouts
- Naming: `-clean` suffix used throughout (e.g., `.hero-clean`, `.benefit-card-clean`)

### Navbar Design (Updated)
- Height: 80px (fixed, professional)
- Logo: 60px height, clean and proportional
- Nav links: 3.5rem gap with underline hover effect
- Button (Comprar): Dark green with shadow on hover
- No overshooting elements - everything contained

### Responsive Breakpoints
Check App.css for media queries - currently optimized for desktop-first approach

---

## Development Workflow

### Build & Run
```bash
npm run dev      # Start Vite dev server (localhost:5173)
npm run build    # Production bundle to /dist
npm run lint     # Check code with ESLint
npm run preview  # Preview production build locally
```

### ESLint Configuration (eslint.config.js)
- React Hooks rules + React Refresh rules enabled
- Custom rule: Unused variables ignored if they start with uppercase or underscore (varsIgnorePattern)
- Flat config format (ES2024 compatible)

---

## Key Patterns & Conventions

### Component Pattern
```jsx
function ComponentName({ prop1, prop2 }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Content */}
    </motion.div>
  );
}
```
All inline components follow this format - simple, functional, no hooks except in App().

### Animation Pattern (Framer Motion)
- **Scroll-triggered**: `whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}`
- **Page load**: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- **Stagger**: Use `delay` property to sequence animations

### State Management
Only 1 state hook in entire app: `const [selectedImage, setSelectedImage] = useState(null)` for modal image selection. Keep it this way - avoid adding global state libraries.

### Links & Navigation
- Anchor links (#beneficios, #recetas) for sections
- WhatsApp links use: `href={whatsappLink}` with `target="_blank" rel="noopener noreferrer"`
- All CTAs point to WhatsApp except internal navigation

### Accessibility Notes
- Aria-labels on icon buttons (e.g., whatsapp-float)
- Alt text on all images
- Semantic HTML (nav, header, section, footer tags)

---

## Adding New Features

### Adding a New Section
1. Add section HTML after existing sections but before footer
2. Create companion CSS in App.css with `.section-name-clean` class
3. Use `.container` wrapper inside section
4. Add Framer Motion `whileInView` to cards/elements
5. Add section link to navbar `.nav-links` if needed

### Modifying WhatsApp Flow
- Update `whatsappNumber` (line 23) with real +country format
- Update `whatsappMessage` (line 24) for different pre-filled text
- Both are used in 3+ places - search `whatsappLink` to find all usages

### Adding Images
- Place in `/public/` directory
- Reference as `/filename.jpg` (no need for import)
- Optimize before adding (use responsive dimensions)

---

## Common Gotchas

1. **Modal Scroll Lock**: The useEffect cleanup prevents scroll-unlock bugs. Don't remove it.
2. **Image Paths**: Must start with `/` (public root), not relative paths
3. **Animation Performance**: Use `viewport={{ once: true }}` on cards to prevent animation re-triggers on scroll
4. **ESLint Rules**: Unused component props will error - use varsIgnorePattern or truly remove them
5. **WhatsApp Links**: WhatsApp Web doesn't work on desktop browsers - test on mobile or use .me domain

---

## File Structure Reference
```
src/
  ├─ App.jsx          # All components & state
  ├─ App.css          # All styling (645 lines)
  ├─ main.jsx         # Entry point
  ├─ index.css        # Global resets
  └─ assets/          # (Currently empty)
public/
  ├─ logo-removebg-preview.png
  ├─ hero.jpg
  └─ recipe-*.jpg     # 5 recipe images
```

---

## Questions to Clarify Before Changes
- Will this remain a single-file SPA, or should components be split?
- Are animations critical for mobile performance, or should they be disabled for small screens?
- Should form submission replace WhatsApp integration, or keep current flow?
