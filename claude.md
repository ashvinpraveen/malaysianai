# Placeholder Design System

This document outlines the design system for the Placeholder website. All components and pages should follow these guidelines to maintain visual consistency.

## Typography

### Font Family
- Body: `Inter` (Google Fonts) — sans-serif for body text, labels, UI elements
- Headings: `Newsreader` (Google Fonts) — serif display font for all headings (h1–h6)
- Fallback body: `system-ui, sans-serif`
- Fallback headings: `Georgia, 'Times New Roman', serif`

### Heading Styles

```css
/* All headings use Newsreader serif font */

/* Hero Title - Main landing page headline */
.hero-title
- Font: Newsreader, Georgia, serif
- Size: text-4xl md:text-6xl lg:text-7xl
- Weight: font-normal
- Tracking: tracking-tight
- Line Height: leading-[1.08]
- Usage: Primary hero headlines only

/* Section Title - Major section headings */
.section-title
- Font: Newsreader, Georgia, serif
- Size: text-3xl md:text-5xl lg:text-6xl
- Weight: font-normal
- Tracking: tracking-tight
- Line Height: leading-[1.1]
- Usage: Main section titles throughout the site

/* Subsection Title - Secondary headings */
.subsection-title
- Font: Newsreader, Georgia, serif
- Size: text-2xl md:text-3xl lg:text-4xl
- Weight: font-normal
- Tracking: tracking-tight
- Line Height: leading-[1.15]
- Usage: Subsection headings, feature titles

/* Card Title - Component headings */
.card-title
- Font: Newsreader, Georgia, serif
- Size: text-xl md:text-2xl
- Weight: font-normal
- Tracking: tracking-tight
- Line Height: leading-[1.2]
- Usage: Card headings, small component titles
```

### Body Text Styles

```css
/* Large Body - Emphasis text */
.body-large
- Size: text-base md:text-lg
- Weight: font-light
- Line Height: leading-relaxed
- Usage: Hero subtitles, important descriptions

/* Default Body - Standard text */
.body-default
- Size: text-sm md:text-base
- Weight: font-light
- Line Height: leading-relaxed
- Usage: Standard body copy, paragraphs

/* Small Body - Compact text */
.body-small
- Size: text-xs md:text-sm
- Weight: font-light
- Line Height: leading-normal
- Usage: Footnotes, compact descriptions
```

### Display

```css
/* Timer Display - Oversized numerals */
.timer-display
- Font: Newsreader, Georgia, serif
- Weight: font-normal
- Tracking: tracking-tight
- Usage: Timer numeral display
```

```css
/* Timer Announcement - Status callout */
.timer-announcement
- Font: Newsreader, Georgia, serif
- Size: text-4xl md:text-6xl
- Weight: font-semibold
- Tracking: tracking-tight
- Usage: Timer completion headline
```

```css
/* Timer Phase - Oversized phase label */
.timer-phase
- Font: Newsreader, Georgia, serif
- Size: text-[24vw] sm:text-[18vw] lg:text-[12vw]
- Weight: font-black
- Tracking: tracking-[0.18em]
- Leading: leading-[0.85]
- Usage: Share / Q&A phase label on timer screen
```

### Labels & Captions

```css
/* Large Label */
.label-large
- Size: text-sm
- Weight: font-normal
- Tracking: tracking-wide
- Usage: Form labels, button text

/* Default Label */
.label-default
- Size: text-xs
- Weight: font-normal
- Tracking: tracking-wide
- Usage: Small labels, tags

/* Caption */
.caption
- Size: text-xs
- Weight: font-light
- Tracking: tracking-wide
- Opacity: opacity-70
- Usage: Captions, disclaimers, metadata
```

## Color Palette

### Brand Colors
```css
--dark-teal: 222 47% 11%        /* Primary brand color */
--dark-teal-accent: 222 40% 15% /* Accent variant */
--cream: 40 50% 98%              /* Light background */
--cream-dark: 40 20% 92%         /* Darker cream variant */
--sand: 35 30% 90%               /* Warm neutral */
```

### Semantic Colors
```css
--foreground: 222 47% 11%        /* Primary text */
--background: 0 0% 100%          /* Page background */
--muted-foreground: 215.4 16.3% 46.9% /* Secondary text */
--border: 214.3 31.8% 91.4%      /* Border color */
```

### Text Opacity Guidelines
- Primary text on dark: `text-white`
- Secondary text on dark: `text-white/85`
- Tertiary text on dark: `text-white/70`
- Muted text on light: `text-muted-foreground/80`
- Very muted text on light: `text-muted-foreground/70`

## Components

### Cards & Surfaces

```css
/* Glass Card - Standard card style */
.glass-card
- Background: bg-white
- Border: border border-border
- Shadow: shadow-sm
- Usage: Content cards, panels

/* Elevated Card - Interactive cards */
.elevated-card
- Background: bg-white
- Border: border border-border
- Shadow: shadow-md hover:shadow-lg
- Transition: transition-shadow duration-300
- Usage: Clickable cards, interactive elements

/* Light Surface - Translucent overlay */
.surface-light
- Background: bg-white/95
- Backdrop: backdrop-blur-sm
- Usage: Modals, popovers on light backgrounds

/* Dark Surface - Dark translucent overlay */
.surface-dark
- Background: bg-foreground/95
- Backdrop: backdrop-blur-sm
- Text: text-white
- Usage: Modals, popovers on dark backgrounds
```

### Backgrounds

```css
/* Timer Backdrop - Full-bleed timer screen */
.timer-backdrop
- Layers: Cream gradient + teal glows + subtle grid + soft vignette
- Usage: Timer/Start screen background
```

### Chat Bubbles

```css
/* Agent Chat Bubble */
.chat-bubble-agent
- Border Radius: rounded-2xl
- Background: bg-white/15
- Border: border-white/25
- Text: text-white
- Padding: px-5 py-4
- Font Size: text-base md:text-lg
- Line Height: leading-relaxed
- Usage: AI agent messages

/* User Chat Bubble */
.chat-bubble-user
- Border Radius: rounded-2xl
- Background: bg-white/25
- Border: border-white/35
- Text: text-white
- Padding: px-5 py-4
- Font Size: text-base md:text-lg
- Line Height: leading-relaxed
- Usage: User messages
```

### Buttons

```css
/* Primary Button */
variant="default" size="lg"
- Background: bg-white
- Text: text-black
- Hover: hover:bg-white/90
- Border: border-none
- Usage: Primary CTAs

/* Secondary Button */
variant="outline" size="lg"
- Border: border-white
- Text: text-white
- Hover: hover:bg-white/20
- Background: bg-transparent
- Usage: Secondary CTAs
```

## Animations

### Standard Animations

```css
/* Fade In - Subtle entrance */
.animate-fade-in
- Duration: 0.8s
- Easing: ease-out
- Usage: Content reveals, page loads

/* Slide Up - Upward entrance */
.animate-slide-up
- Duration: 0.6s
- Easing: ease-out
- Movement: translateY(20px) → translateY(0)
- Usage: Hero elements, important content

/* Chat Pop - Bouncy entrance */
.animate-chat-pop
- Duration: 0.4s
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1)
- Usage: Chat messages, notification-style elements

/* Marquee - Continuous scroll */
.animate-marquee
- Duration: 40s
- Easing: linear
- Loop: infinite
- Pauses on hover
- Usage: Logo scrolls, ticker elements

/* Scroll Left/Right - Directional scroll */
.animate-scroll-left / .animate-scroll-right
- Duration: 30s
- Easing: linear
- Loop: infinite
- Usage: Tag clouds, continuous scrolling content
```

## Spacing System

### Container Padding
- Small screens: `px-6`
- All screens: `container mx-auto`

### Vertical Rhythm
- Hero sections: `pt-32 pb-20`
- Standard sections: `py-20`
- Compact sections: `py-10`
- Component padding: `py-6` or `py-4`

### Component Gaps
- Large gaps: `gap-6`
- Default gaps: `gap-4`
- Compact gaps: `gap-2`

## Layout Patterns

### Hero Section
```tsx
<section className="relative h-screen flex flex-col overflow-hidden">
  {/* Background with gradient overlay */}
  <div className="absolute inset-0 bg-cover bg-center">
    {/* background-image with linear-gradient overlay */}
  </div>

  {/* Content: flex-1 for main content */}
  <div className="z-10 flex-1 container mx-auto px-6 pt-32 pb-20">
    {/* Hero content */}
  </div>

  {/* Footer banner: auto height */}
  <div className="relative z-10 py-4 bg-white">
    {/* Footer content */}
  </div>
</section>
```

### Chat Container Pattern
```tsx
{/* Fixed height container with bottom alignment */}
<div className="h-[320px] flex flex-col justify-end overflow-hidden">
  {/* Messages stack from bottom */}
  <div className="flex flex-col gap-4">
    {/* Messages map here */}
  </div>
</div>

{/* Add gradient mask for overflow */}
style={{
  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 55%, black 100%)",
  maskImage: "linear-gradient(to bottom, transparent 0%, black 55%, black 100%)",
}}
```

## Responsive Breakpoints

Follow Tailwind's default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

### Common Responsive Patterns
```css
/* Mobile-first approach */
text-sm md:text-base lg:text-lg
text-3xl md:text-5xl lg:text-6xl

/* Layout shifts */
flex-col sm:flex-row
text-center md:text-left
mx-auto md:mx-0

/* Absolute positioning on larger screens */
mt-12 lg:absolute lg:bottom-32 lg:right-6 lg:mt-0
```

## Design Principles

1. **Light Typography**: Use `font-light` as the default weight for a refined, modern aesthetic
2. **Subtle Hierarchy**: Create hierarchy through size and opacity rather than heavy font weights
3. **Tight Tracking**: Use `tracking-tight` for headlines to create a polished look
4. **Generous Line Height**: Use `leading-relaxed` for body text to improve readability
5. **Glassmorphism**: Leverage translucent backgrounds with backdrop blur for depth
6. **Smooth Transitions**: All interactive elements should have smooth transitions
7. **Mobile First**: Design for mobile, then enhance for larger screens
8. **Consistent Spacing**: Use the spacing system consistently throughout

## Implementation Notes

### Using Design System Classes
Always prefer design system classes over inline styles:

```tsx
// ✅ Good - Using design system classes
<h1 className="hero-title text-white">Title</h1>
<p className="body-large text-white/85">Description</p>

// ❌ Bad - Inline custom styles
<h1 className="text-5xl font-bold">Title</h1>
<p className="text-lg font-medium">Description</p>
```

### Component Organization
1. Use semantic HTML elements
2. Apply design system classes first
3. Add component-specific styles last
4. Keep responsive modifiers grouped together

### Accessibility
- Maintain sufficient color contrast (especially with light fonts)
- Ensure interactive elements have clear hover/focus states
- Use semantic HTML for screen readers
- Test with reduced motion preferences

## File Structure

```
src/
├── index.css           # Design system definitions
├── components/         # Reusable components
│   ├── ui/            # Base UI components
│   └── ...            # Feature components
└── ...
```

## Updates & Maintenance

When adding new styles:
1. Check if existing design system classes can be used
2. If creating new classes, add them to the appropriate section in `index.css`
3. Document new classes in this file
4. Follow the established naming conventions
5. Keep mobile-first responsive approach
6. Test across different screen sizes

---

**Last Updated**: 2026-02-03
**Version**: 1.0.0
