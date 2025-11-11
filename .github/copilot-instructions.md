# Mohsen Ghohary Luxury Fashion - AI Coding Guide

## Architecture Overview
Pure vanilla HTML/CSS/JS luxury e-commerce site using CDN Tailwind. **No build tools** - all code runs directly in browser. Component-based architecture through dynamic HTML injection.

### File Structure & Data Flow
```
index.html (landing) → #header-placeholder → fetch('header.html') → load-header.js initializes
                     → #footer-placeholder → fetch('footer.html') → load-footer.js initializes
product.html/account.html → Same pattern, reuse header/footer
```

**Critical**: All pages require `<div id="header-placeholder">` and `<div id="footer-placeholder">` + corresponding script tags. Header/footer are standalone HTML fragments (no `<!DOCTYPE>`, no `<html>` tags).

### Component Loading Pattern (Universal)
```javascript
fetch('component.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('placeholder').innerHTML = data;
        setTimeout(initializeComponent, 100); // 100ms delay critical for DOM readiness
    });
```
The 100ms timeout prevents race conditions where event listeners attach to non-existent elements.

## Design System

### Typography Scale
- **Headings**: `font-light tracking-[0.2em]` (Playfair Display serif)
- **Body/UI**: `.font-sans tracking-wide` (Montserrat)
- **Responsive**: `text-xl md:text-2xl lg:text-3xl` pattern with multiple breakpoints
- **Uppercase labels**: `text-xs tracking-[0.2em]` for categories/metadata

### Spacing System
- **Sections**: `py-16 md:py-24 lg:py-32` (progressive spacing)
- **Containers**: `max-w-7xl mx-auto px-6`
- **Grids**: `grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8`

### Animation Philosophy
Luxury = subtlety. Standard pattern:
```css
transition-all duration-700 hover:scale-105
```
Overlays: opacity + transform transitions (500ms). Stagger menu items with `setTimeout(..., index * 100)`.

### Image Strategy
Unsplash CDN only: `https://images.unsplash.com/photo-[id]?w=800&q=80`. Aspect ratios: `aspect-[3/4]` for products, `h-96 md:h-[32rem]` for heroes.

## Header System (Critical Implementation Details)

### Navigation Color States
Two modes controlled by scroll position + hover:
1. **Transparent**: `bg-transparent text-white` (hero overlay state)
2. **Solid**: `bg-white shadow-md text-gray-900` (scrolled/hover state)

**Implementation quirk**: State change functions (`changeToWhite`, `changeToTransparent`) must update EVERY element:
- Buttons (`#hamburger-btn`, `#search-btn`, `#account-btn`, `#cart-btn`)
- Icon parts (`.hamburger-line`, `.search-circle`, `.cart-body`, etc.)
- Logo link
- Desktop menu links (`.hidden.md\\:flex a`)

Missing any element = visual inconsistency. See `load-header.js` lines 20-140 for complete pattern.

### Overlay Management
Three overlays with identical lifecycle:
```javascript
// Open: remove 'hidden' → 10ms delay → remove 'opacity-0'
overlay.classList.remove('hidden');
setTimeout(() => overlay.classList.add('opacity-100'), 10);
document.body.style.overflow = 'hidden'; // Prevent scroll

// Close: remove 'opacity-100' → 300ms delay → add 'hidden'
overlay.classList.add('opacity-0');
setTimeout(() => overlay.classList.add('hidden'), 300);
document.body.style.overflow = 'auto';
```

### Shopping Cart State
Lives in `localStorage` under key `'luxuryCart'`. Structure:
```javascript
{id, name, price, image, size, color, quantity}[]
```
Functions: `addToCart()`, `removeFromCart()`, `updateCartQuantity()` - all update display + storage. Cart badge shows count with scale animation. Promo codes: hardcoded object in `applyPromoCode()`.

## Page-Specific Patterns

### product.html
Dynamic product loading via URL params (planned) or predefined product data object. Product images in gallery with thumbnail navigation. Size selector buttons: `border hover:border-black hover:bg-black hover:text-white`.

### account.html
Form inputs use floating label pattern:
```html
<input class="luxury-input" placeholder=" " />
<label class="input-label">Email</label>
```
CSS transforms label on `:focus` and `:not(:placeholder-shown)`.

## Responsive Strategy
Mobile-first with Tailwind breakpoints (`md:`, `lg:`, `xl:`). Common patterns:
- Navigation: Mobile hamburger menu; desktop horizontal links (`hidden md:flex`)
- Grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Typography: Scale at each breakpoint (`text-4xl md:text-5xl lg:text-6xl`)
- Spacing: Increase padding/margins with viewport (`py-16 md:py-24`)

## Critical Gotchas

1. **Header initialization race condition**: Without `setTimeout(..., 100)` in component loaders, event listeners fail silently
2. **Navigation state sync**: Changing one icon color requires updating ALL icons (12+ elements) - see `changeToWhite()` function
3. **Overlay body scroll**: Must set `document.body.style.overflow = 'hidden'` when opening overlays, restore to `'auto'` when closing
4. **localStorage cart**: No backend - cart persists only in browser. Clear on checkout or page works in isolation
5. **Escape key handling**: Must close active overlay (search/menu/cart) - check visibility state before closing

## Adding New Pages
1. Copy structure from `product.html` or `account.html`
2. Include header/footer placeholders + scripts: `<script src="load-header.js"></script>`
3. Add page-specific script after placeholders
4. Use `pt-20 md:pt-24` top padding to account for fixed header
5. Follow section structure: `<section class="py-20 px-6"><div class="max-w-7xl mx-auto">...</div></section>`

## Component Patterns Library

### Product Card
```html
<div class="group cursor-pointer">
    <div class="relative overflow-hidden mb-4 bg-white">
        <img class="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
    <p class="text-xs font-sans tracking-widest text-gray-500 mb-1">CATEGORY</p>
    <h3 class="text-lg font-light mb-2 tracking-wide">Product Name</h3>
    <p class="font-sans text-sm tracking-wide">$X,XXX</p>
</div>
```

### CTA Buttons
```html
<!-- Primary (light bg) -->
<button class="bg-white text-black px-8 py-3 font-sans text-sm tracking-widest hover:bg-gray-100 transition-all duration-300">
    BUTTON TEXT
</button>

<!-- Secondary (dark bg) -->
<button class="border border-white text-white px-8 py-3 font-sans text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-500">
    BUTTON TEXT
</button>
```

### Section Header
```html
<div class="text-center mb-16 md:mb-24">
    <div class="w-24 h-px bg-gray-300 mx-auto mb-8"></div>
    <h2 class="text-4xl md:text-5xl lg:text-6xl font-light tracking-[0.2em] mb-6">
        SECTION TITLE
    </h2>
    <p class="text-lg text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">
        Section description text
    </p>
</div>
```

## Testing Checklist
- [ ] Header transitions (transparent → white) on scroll past 50px
- [ ] All overlays open/close smoothly with Escape key
- [ ] Cart persists after page reload (localStorage)
- [ ] Mobile menu covers full screen, prevents scroll
- [ ] Form inputs have floating labels
- [ ] All images use Unsplash CDN with proper dimensions
- [ ] Responsive breakpoints work at md/lg/xl
- [ ] Hover states use appropriate transition durations
