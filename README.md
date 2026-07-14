# SearchMadarth® Landing Page

A high-performance Next.js landing page for SearchMadarth®, a digital growth agency for Indian SMEs offering SEO, Answer Engine Optimisation (AEO), Generative Engine Optimisation (GEO), Google Ads, Meta advertising, and performance-first web development.

**Live:** https://searchmadarth-landing.vercel.app

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS 4
- **Content**: Sanity CMS (case studies, FAQs)
- **Animations**: GSAP 3.15 + `@gsap/react` (services sticky scroll-stack)
- **Rich Text**: `@portabletext/react` (case-study drawer markdown rendering)
- **Booking**: `@calcom/embed-react` (Cal.com scheduling modal)
- **Styling**: Anek Tamil font (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ (current LTS: Node 24)
- npm (no yarn/pnpm required; uses `package-lock.json`)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root with Sanity credentials:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Get these values from your Sanity project settings dashboard.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Pages auto-refresh as you edit `src/app/page.js` or component files.

### Production Build

```bash
npm run build
npm run start
```

Or deploy directly to Vercel (recommended):

```bash
vercel --prod
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Build for production |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint checks |

## Project Structure

```
src/
├── app/
│   ├── page.js              # Home page (index)
│   ├── layout.js            # Root layout (metadata, fonts, globals)
│   ├── globals.css          # Tailwind + custom CSS
│   ├── privacy-policy/      # Privacy policy
│   ├── terms-and-conditions/# T&Cs
│   └── cookie-policy/       # Cookie policy
├── components/
│   ├── header.js            # Navigation + logo
│   ├── hero.js              # Hero section + search demo
│   ├── services.js          # Services (sticky scroll-stack)
│   ├── services-reveal.js   # GSAP animations wrapper (mobile)
│   ├── case-studies.js      # Case studies section
│   ├── case-studies-client.js# Client wrapper (card state)
│   ├── case-study-drawer.js # Drawer (responsive: bottom sheet mobile, right panel desktop)
│   ├── why.js               # Why SearchMadarth section
│   ├── testimonials.js      # Client testimonials
│   ├── stats.js             # Revenue impact stats (CountUp animations)
│   ├── count-up.js          # Number counter component
│   ├── faq.js               # FAQs
│   ├── offer.js             # Dual audit offers (links to superengine)
│   ├── process.js           # Onboarding process
│   ├── logo-marquee.js      # Client logos carousel
│   ├── footer.js            # Footer
│   ├── mobile-bar.js        # Mobile sticky call button
│   ├── button.js            # Reusable button component
│   ├── cal-button.js        # Cal.com booking button
│   ├── logo.js              # SearchMadarth logo
│   ├── structured-data.js   # JSON-LD schema
│   └── policy-page.js       # Policy layout wrapper
└── lib/
    └── sanity.js            # Sanity CMS queries & fetch helper
```

## Key Features

### Responsive Drawer
- **Mobile**: Bottom sheet, 100vw × 90vh, slides up from bottom
- **Desktop**: Right panel, max-width 768px, 100vh, slides in from right
- Rich text rendering with code blocks, lists, quotes, images, and videos

### Services Sticky Stack
- Desktop: Pin-stack carousel (cards peek as you scroll)
- Mobile: Adapted sticky stack (70vh cards) with same animation

### CMS Integration
Case studies and FAQs pulled from Sanity. Full queries in `src/lib/sanity.js`.

### Animations
- Services scroll-stack via GSAP ScrollTrigger
- Drawer slide/fade transitions (CSS transform + opacity)
- Number counters (CountUp on stat reveal)

### SEO & Schema
- Full Next.js metadata (Open Graph, Twitter, robots directives)
- JSON-LD structured data (@graph: Organization, WebSite, FAQPage, ProfessionalService)
- AEO/GEO/AIO keyword optimization

## Deployment

### Vercel (Recommended)

```bash
vercel link      # Link to Vercel project (first time only)
vercel --prod    # Deploy to production
```

Automatic deployments on git push to main (if configured in Vercel).

### Environment Variables on Vercel

Add to Vercel project settings:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

## Performance

- **Framework**: Turbopack (fast incremental builds)
- **Rendering**: Static pre-rendering for most pages
- **Images**: Next.js Image optimization with Sanity CDN URLs
- **Fonts**: Google Fonts (Anek Tamil) with `next/font` optimization
- **CSS**: Tailwind CSS 4 with PostCSS 4

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). ES2020+ JavaScript (via Next.js transpilation).

## License

Proprietary — SearchMadarth®
