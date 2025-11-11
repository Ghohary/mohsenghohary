# Mohsen Ghohary Luxury Fashion Website - AI Coding Instructions

## Architecture Overview
This is a luxury fashion e-commerce website built with vanilla HTML/CSS/JS and Tailwind CSS. The site uses a modular approach with a separate header component loaded dynamically across pages.

### Core Components
- `index.html` - Main landing page with hero, collections, products, about, and contact sections
- `header.html` - Shared navigation component with mobile menu and search overlays
- `load-header.js` - Header injection script with interactive behaviors

## Design System & Styling Patterns

### Typography Hierarchy
- Primary font: 'Playfair Display' (serif) for headings and luxury feel
- Secondary font: 'Montserrat' (sans-serif) for body text and UI elements
- Use `.font-sans` class to apply Montserrat
- Letter spacing: Consistent `tracking-wide` and `tracking-widest` classes

### Visual Language
- **Color scheme**: Black, white, grays with minimal color palette
- **Spacing**: Generous whitespace using `py-20`, `px-6` patterns
- **Hover effects**: Scale transforms (`hover:scale-110`, `hover:scale-105`) with 300-700ms durations
- **Images**: Use Unsplash with `w=1200&q=80` or `w=600&q=80` format for consistent quality

### Component Patterns
```html
<!-- Product Card Pattern -->
<div class="group cursor-pointer">
    <div class="relative overflow-hidden mb-4">
        <img class="transition-transform duration-700 group-hover:scale-105" />
    </div>
    <p class="text-xs font-sans tracking-widest text-gray-500">CATEGORY</p>
    <h3 class="text-lg font-light tracking-wide">Product Name</h3>
    <p class="font-sans text-sm">$X,XXX</p>
</div>
```

## Header Component System

### Dynamic Loading Pattern
The header is loaded via `fetch('header.html')` and injected into `#header-placeholder`. Always include a 100ms timeout before initializing to ensure DOM elements are ready.

### Navigation States
- **Transparent**: Default state with white text (`text-white`)
- **Solid**: Scroll/hover state with black text (`text-gray-900`) and white background (`bg-white shadow-md`)
- State changes affect ALL buttons, SVGs, logo, and menu links simultaneously

### Interactive Elements
- Mobile menu: Full-screen overlay (`fixed inset-0 bg-black/95`)
- Search overlay: White overlay with large input field (`text-4xl md:text-6xl`)
- Both overlays prevent body scroll with `overflow-hidden`

## Content Patterns

### Section Structure
```html
<section class="py-20 px-6">
    <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-light text-center mb-16 tracking-wide">
            Section Title
        </h2>
        <!-- Content grid typically md:grid-cols-3 -->
    </div>
</section>
```

### Price Display
Always format as `$X,XXX` with comma separators for thousands. Use `font-sans text-sm tracking-wide` for price styling.

### CTA Buttons
- Primary: `bg-white text-black px-8 py-3 font-sans text-sm tracking-widest`
- Secondary: `border border-black px-8 py-3 font-sans text-sm tracking-widest hover:bg-black hover:text-white`

## Responsive Behavior
- Mobile-first approach with `md:` breakpoints
- Grid layouts: Single column mobile, 3-column desktop (`grid md:grid-cols-3`)
- Typography scales: `text-xl md:text-2xl` pattern for responsive text
- Hide desktop menu on mobile: `hidden md:flex`

## Development Workflow
- No build process - direct file editing
- Use CDN Tailwind (`https://cdn.tailwindcss.com`)
- Test header functionality after any navigation changes
- Verify both mobile menu and search overlay interactions
- Always test scroll/hover state changes for navigation

## Key Files for Context
- Reference `header.html` for navigation patterns and overlay structures
- Check `load-header.js` for interactive behavior implementation
- Use `index.html` sections as templates for new page content