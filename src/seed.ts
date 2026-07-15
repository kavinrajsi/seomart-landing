import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'
import { AUDIT_URL } from '@/lib/constants'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const LOGO_DIR = path.resolve(dirname, '../public/logo')

const CLIENTS: { name: string; file: string }[] = [
  { name: 'Indicus Paints', file: 'indicus.png' },
  { name: 'KVB', file: 'karur-vysya-bank.png' },
  { name: 'TAFE Tribe', file: 'tafe-tribe.png' },
  { name: 'Super Kings Academy', file: 'csk.png' },
  { name: 'NAC Jewellers', file: 'nac-jewellers.png' },
  { name: 'Veranda IAS', file: 'veranda-ias.png' },
  { name: 'Dahnay', file: 'dahnay.png' },
  { name: 'Visvas', file: 'visvas.png' },
  { name: 'Nithya Amirtham', file: 'nithya-amirtham.png' },
  { name: 'Inspace India', file: 'inspace.png' },
  { name: 'Inspace Store', file: 'inspace-store.png' },
  { name: 'Irezumi', file: 'irezumi.png' },
  { name: 'Astrazeneca', file: 'astrazeneca.png' },
  { name: 'Sundari Silks', file: 'sundari-silks.png' },
  { name: 'Annapoorna Masalas', file: 'annpoorna-masala.png' },
  { name: 'Frankfinn', file: 'frankfinn.png' },
  { name: 'Mylapore Times', file: 'myalpore-times.png' },
  { name: 'Mandela', file: 'mandela.png' },
]

const TESTIMONIALS = [
  {
    quote:
      "We've partnered with Madarth for our website, SEO, and digital advertising at Indicus Paints. What stands out is their integrity, transparency, and commitment to results. They deliver on what they promise and consistently go beyond the brief with valuable ideas and insights. It's a partnership built on trust and a genuine focus on growth.",
    name: 'B. Gokul',
    role: 'Partner, VNC Group',
    initials: 'BG',
    order: 0,
  },
  {
    quote:
      "As Veranda IAS's digital marketing partner, Madarth has played a key role in expanding our reach, strengthening brand visibility, and generating quality leads. Their strategic approach, data-driven execution, proactive communication, and deep understanding of the education sector have consistently delivered strong results and made them a trusted growth partner.",
    name: 'Business Head',
    role: 'Veranda IAS',
    initials: 'VI',
    order: 1,
  },
]

const seed = async () => {
  const payload = await getPayload({ config })

  // --- Globals (idempotent: updateGlobal overwrites) ---
  payload.logger.info('Seeding globals…')

  await payload.updateGlobal({
    slug: 'hero',
    data: {
      headline: 'We Search. We Build. We Grow Your Business.',
      subhead:
        'At Search Madarth® combines search strategy, paid performance, standout design, and performance-first web development, all under one roof, all built for real results.',
      primaryCtaLabel: 'Explore Our Services',
      primaryCtaHref: '#services',
      secondaryCtaLabel: 'Book a Free Audit',
      secondaryCtaHref: AUDIT_URL,
      searchPairs: [
        {
          query: 'digital marketing agency for growing brands',
          results: [
            { text: 'Search Optimisation — SEO, AEO & GEO' },
            { text: 'Paid Performance — Google, Meta & More' },
            { text: 'Design — Brand, Campaign & Content' },
          ],
        },
        {
          query: 'performance marketing agency that drives roi',
          results: [
            { text: 'Paid Performance — Google, Meta & More' },
            { text: 'Conversion & Tracking — GA4, GTM & Attribution' },
            { text: 'Landing Page Optimisation' },
          ],
        },
        {
          query: 'fast conversion-focused website development',
          results: [
            { text: 'Web Development — Performance-First Builds' },
            { text: 'E-commerce Development' },
            { text: 'UI/UX Design' },
          ],
        },
        {
          query: 'branding and design studio for standout brands',
          results: [
            { text: 'Design — Brand, Campaign & Content' },
            { text: 'UI/UX Design' },
            { text: 'Landing Pages' },
          ],
        },
        {
          query: 'rank higher on google and ai search',
          results: [
            { text: 'Search Engine Optimisation (SEO)' },
            { text: 'Answer Engine Optimisation (AEO)' },
            { text: 'Generative Engine Optimisation (GEO)' },
          ],
        },
        {
          query: 'google ads agency to lower cost per lead',
          results: [
            { text: 'Google Ads Management' },
            { text: 'Meta Advertising' },
            { text: 'Conversion & Tracking' },
          ],
        },
        {
          query: 'ecommerce website that converts more sales',
          results: [
            { text: 'E-commerce Development' },
            { text: 'Landing Page Optimisation' },
            { text: 'Conversion & Tracking' },
          ],
        },
        {
          query: 'social media content and campaign design',
          results: [
            { text: 'Design — Brand, Campaign & Content' },
            { text: 'Meta Advertising' },
            { text: 'UI/UX Design' },
          ],
        },
        {
          query: 'show up in featured snippets and voice search',
          results: [
            { text: 'Answer Engine Optimisation (AEO)' },
            { text: 'Technical & Content Excellence' },
            { text: 'Search Engine Optimisation (SEO)' },
          ],
        },
        {
          query: 'get cited by chatgpt and ai assistants',
          results: [
            { text: 'AI Optimisation (AIO)' },
            { text: 'Generative Engine Optimisation (GEO)' },
            { text: 'Answer Engine Optimisation (AEO)' },
          ],
        },
        {
          query: 'visibility across google ai overviews and gemini',
          results: [
            { text: 'Generative Engine Optimisation (GEO)' },
            { text: 'AI Optimisation (AIO)' },
            { text: 'Technical & Content Excellence' },
          ],
        },
        {
          query: 'improve search experience and click-through',
          results: [
            { text: 'Search Experience Optimisation (SXO)' },
            { text: 'Landing Page Optimisation' },
            { text: 'UI/UX Design' },
          ],
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'stats',
    data: {
      headingBefore: 'Numbers that',
      headingAccent: 'actually',
      headingAfter: 'matter to your business.',
      items: [
        { value: 340, suffix: '%', label: 'Average increase in qualified inbound leads within 90 days' },
        { prefix: '₹', value: 48, suffix: 'Cr+', label: 'Incremental revenue generated for Indian SMEs across our portfolio' },
        { value: 60, suffix: ' days', label: 'Median time from onboarding to measurable ROI impact' },
        { value: 4.1, decimals: 1, suffix: 'x', label: 'Average return on investment reported after the first year' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'services',
    data: {
      headingBefore: 'Everything you need to',
      headingAccent: 'grow',
      headingAfter: ", nothing you don't.",
      bands: [
        {
          headingBefore: 'The future-proof advantage',
          headingAccent: 'in search',
          headingAfter: '.',
          body: 'Traditional SEO alone is no longer enough. We help businesses get discovered across search engines, AI assistants, and generative search experiences.',
          cards: [
            { icon: 'search', title: 'Search Engine Optimisation (SEO)', body: 'Improve rankings, organic traffic, and lead generation through technical SEO, content strategy, local SEO, and authority building.' },
            { icon: 'chat', title: 'Answer Engine Optimisation (AEO)', body: 'Structure content for featured snippets, voice search, AI assistants, and conversational queries to become the preferred answer source.' },
            { icon: 'sparkles', title: 'Generative Engine Optimisation (GEO)', body: 'Increase brand visibility across AI platforms such as ChatGPT, Gemini, and Google AI Overviews through AI-ready content and entity optimisation.' },
            { icon: 'gear', title: 'Technical & Content Excellence', body: 'Schema implementation, Core Web Vitals optimisation, content hubs, internal linking, and analytics-driven improvements.' },
          ],
        },
        {
          headingBefore: 'The measurable advantage',
          headingAccent: 'in digital growth',
          headingAfter: '.',
          body: 'Most agencies focus on clicks and impressions. We focus on leads, conversions, and business outcomes through continuous optimisation.',
          cards: [
            { icon: 'megaphone', title: 'Google Ads Management', body: 'Search, Display, YouTube, Shopping, and Remarketing campaigns designed to maximise return on ad spend.' },
            { icon: 'share', title: 'Meta Advertising', body: 'Lead generation, awareness, and conversion campaigns across Facebook and Instagram.' },
            { icon: 'chart', title: 'Conversion & Tracking', body: 'Complete tracking setup including GA4, GTM, Enhanced Conversions, CRM integration, and attribution reporting.' },
            { icon: 'layout', title: 'Landing Page Optimisation', body: 'Conversion-focused landing pages and funnel improvements to improve lead quality and reduce acquisition costs.' },
          ],
        },
        {
          headingBefore: 'The conversion advantage',
          headingAccent: 'online',
          headingAfter: '.',
          body: 'Build fast, scalable, and SEO-ready websites designed to convert visitors into customers and grow your business.',
          cards: [
            { icon: 'globe', title: 'Corporate Websites', body: 'Professional websites that build credibility and showcase your brand effectively.' },
            { icon: 'layout', title: 'Landing Pages', body: 'High-converting landing pages for campaigns and lead generation.' },
            { icon: 'cart', title: 'E-commerce Development', body: 'Scalable e-commerce solutions that deliver seamless shopping experiences.' },
            { icon: 'code', title: 'Website Revamp & Development', body: 'Modern designs, better performance, and SEO-ready development for measurable results.' },
            { icon: 'pen', title: 'UI/UX Design', body: 'Intuitive, user-friendly designs that enhance engagement and drive conversions.' },
          ],
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'industries',
    data: {
      headingBefore: 'Industries we have',
      headingAccent: 'worked',
      headingAfter: 'with.',
      items: [
        { name: 'Manufacturing', line: 'B2B lead engines for plants, OEMs, and exporters.' },
        { name: 'Education', line: 'Admissions funnels that fill batches faster.' },
        { name: 'Fashion / Jewellery', line: 'Heritage brands selling to digital-first buyers.' },
        { name: 'Real Estate', line: 'Site-visit pipelines from search and social.' },
        { name: 'Banking & Financial Services', line: 'Trust-led acquisition within compliance.' },
        { name: 'Retail', line: 'Footfall and e-commerce growth in one system.' },
        { name: 'Logistics', line: 'Scalable platforms with streamlined UX.' },
        { name: 'Healthcare', line: 'Patient acquisition that respects regulation.' },
        { name: 'SMEs & Startups', line: 'Growth systems sized for real budgets.' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'process',
    data: {
      headingBefore: 'A clear path to',
      headingAccent: 'compounding',
      headingAfter: 'growth.',
      steps: [
        { title: 'Discover', body: 'Understand your business goals.' },
        { title: 'Strategise', body: 'Build a customised growth roadmap.' },
        { title: 'Execute', body: 'Implement campaigns and optimise continuously.' },
        { title: 'Scale', body: 'Improve ROI through data-led decisions.' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'offer',
    data: {
      headingBefore: 'Start with a',
      headingAccent: 'free',
      headingAfter: 'audit.',
      offers: [
        {
          title: 'Digital Growth Audit',
          items: [
            { text: 'Digital Health Score' },
            { text: 'Gap Analysis Report' },
            { text: 'Estimated Revenue Opportunity' },
            { text: 'Competitor Benchmarking' },
            { text: 'Personalised 90-Day Growth Roadmap' },
          ],
          cta: 'Claim Your Free Audit',
          href: AUDIT_URL,
          featured: true,
        },
        {
          title: 'AI Powered SEO Audit',
          items: [
            { text: 'Website Audit' },
            { text: 'Detailed SEO Analysis & Fixes' },
            { text: 'Keyword Opportunities' },
            { text: '90-Day Growth Roadmap' },
          ],
          cta: 'Run My SEO Audit',
          href: AUDIT_URL,
          featured: false,
        },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'why',
    data: {
      headingBefore: 'Built for',
      headingAccent: 'real',
      headingAfter: 'results.',
      points: [
        { title: 'Everything under one roof', body: 'Search, paid media, design, and development work as one team — no agency hand-offs, no mixed signals.' },
        { title: '1000+ brands served', body: 'From family-run stores to national institutions, we have built growth systems across industries.' },
        { title: 'Performance-first builds', body: 'Every website ships fast, ranks well, and is measured against Core Web Vitals from day one.' },
        { title: 'Transparent reporting', body: 'Monthly reports tie every rupee spent to rankings, leads, and revenue — no vanity metrics.' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'faq',
    data: {
      headingBefore: 'Frequently asked',
      headingAccent: 'questions',
      headingAfter: '.',
      items: [
        { q: 'How long does SEO take?', a: 'Most sites see early movement in 8–12 weeks, with meaningful ranking and traffic gains in 4–6 months. Timelines depend on your starting point, competition, and how quickly technical and content fixes go live. We share a milestone roadmap upfront so you always know what to expect.' },
        { q: 'What budget is required for Google Ads?', a: 'There is no fixed minimum — budgets are built backwards from your target cost per lead and market competition. We typically recommend starting with a test budget for the first month, then scaling what converts. You get full visibility into where every rupee goes.' },
        { q: 'Can you redesign my website without affecting rankings?', a: 'Yes. We follow an SEO-safe migration process: full URL mapping, redirect planning, content parity checks, and pre/post-launch monitoring, so your existing rankings and traffic are protected during the revamp.' },
        { q: 'Do you provide monthly reporting?', a: 'Yes. Every engagement includes a monthly report covering rankings, traffic, leads, and spend, plus a review call to walk through results and the plan for the next month.' },
        { q: 'Which industries do you specialise in?', a: 'We have deep experience across manufacturing, education, fashion and jewellery, real estate, banking and financial services, retail, logistics, healthcare, and SMEs and startups.' },
      ],
    },
  })

  // --- Collections (guarded so a re-run doesn't duplicate) ---
  const { totalDocs: clientCount } = await payload.count({ collection: 'clients' })
  if (clientCount > 0) {
    payload.logger.info('Clients already seeded — skipping collections.')
  } else {
    payload.logger.info('Seeding testimonials…')
    for (const testimonial of TESTIMONIALS) {
      await payload.create({ collection: 'testimonials', data: testimonial })
    }

    payload.logger.info('Seeding clients + logos…')
    for (let i = 0; i < CLIENTS.length; i++) {
      const client = CLIENTS[i]
      const media = await payload.create({
        collection: 'media',
        data: { alt: client.name },
        filePath: path.join(LOGO_DIR, client.file),
      })
      await payload.create({
        collection: 'clients',
        data: { name: client.name, logo: media.id, order: i },
      })
    }
  }

  payload.logger.info('Seed complete.')
}

// Top-level await so `payload run` waits for the async work before the process
// exits (a floating promise would be cut off).
try {
  await seed()
  process.exit(0)
} catch (error) {
  console.error(error)
  process.exit(1)
}
