import Button from "./button";

const LOGO_DIR = "/logo";

function Icon({ path, size = 24, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

const glyphs = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      <path d="M8 12h8M8 8.5h5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </>
  ),
  megaphone: (
    <>
      <path d="m3 11 18-7-4 14-6.5-3.5L3 11Z" />
      <path d="M11.5 14.5 10 20l-2.5-6" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15v-4M12 15V7M17 15v-6" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a13.5 13.5 0 0 1 0 18 13.5 13.5 0 0 1 0-18Z" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h2.5l2.3 12.5a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L20.5 7H5" />
    </>
  ),
  code: (
    <>
      <path d="m8 8-5 4 5 4M16 8l5 4-5 4M13 5l-2 14" />
    </>
  ),
  pen: (
    <>
      <path d="M12 19h9" />
      <path d="M16.4 3.6a2 2 0 0 1 2.8 2.8L7 18.6 3 20l1.4-4L16.4 3.6Z" />
    </>
  ),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  shield: <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />,
  mobile: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </>
  ),
};

const clients = [
  { name: "Indicus Paints", logo: `${LOGO_DIR}/indicus.png` },
  { name: "NAC Jewellers", logo: `${LOGO_DIR}/nac-jewellers.png` },
  { name: "KVB", logo: `${LOGO_DIR}/karur-vysya-bank.png` },
  { name: "TAFE Tribe", logo: `${LOGO_DIR}/tafe-tribe.png` },
  { name: "Dahnay", logo: `${LOGO_DIR}/dahnay.png` },
  { name: "Inspace India", logo: `${LOGO_DIR}/inspace.png` },
];

const bands = [
  {
    eyebrow: "Search Optimisation Services",
    heading: (
      <>
        The future-proof advantage{" "}
        <span className="serif-accent">in search</span>.
      </>
    ),
    body: "Traditional SEO alone is no longer enough. We help businesses get discovered across search engines, AI assistants, and generative search experiences.",
    footer: "clients",
    cards: [
      {
        icon: "search",
        title: "Search Engine Optimisation (SEO)",
        body: "Improve rankings, organic traffic, and lead generation through technical SEO, content strategy, local SEO, and authority building.",
      },
      {
        icon: "chat",
        title: "Answer Engine Optimisation (AEO)",
        body: "Structure content for featured snippets, voice search, AI assistants, and conversational queries to become the preferred answer source.",
      },
      {
        icon: "sparkles",
        title: "Generative Engine Optimisation (GEO)",
        body: "Increase brand visibility across AI platforms such as ChatGPT, Gemini, and Google AI Overviews through AI-ready content and entity optimisation.",
      },
      {
        icon: "gear",
        title: "Technical & Content Excellence",
        body: "Schema implementation, Core Web Vitals optimisation, content hubs, internal linking, and analytics-driven improvements.",
      },
    ],
  },
  {
    eyebrow: "Performance Marketing Services",
    heading: (
      <>
        The measurable advantage{" "}
        <span className="serif-accent">in digital growth</span>.
      </>
    ),
    body: "Most agencies focus on clicks and impressions. We focus on leads, conversions, and business outcomes through continuous optimisation.",
    footer: "stats",
    cards: [
      {
        icon: "megaphone",
        title: "Google Ads Management",
        body: "Search, Display, YouTube, Shopping, and Remarketing campaigns designed to maximise return on ad spend.",
      },
      {
        icon: "share",
        title: "Meta Advertising",
        body: "Lead generation, awareness, and conversion campaigns across Facebook and Instagram.",
      },
      {
        icon: "chart",
        title: "Conversion & Tracking",
        body: "Complete tracking setup including GA4, GTM, Enhanced Conversions, CRM integration, and attribution reporting.",
      },
      {
        icon: "layout",
        title: "Landing Page Optimisation",
        body: "Conversion-focused landing pages and funnel improvements to improve lead quality and reduce acquisition costs.",
      },
    ],
  },
  {
    eyebrow: "Website Development Services",
    heading: (
      <>
        The conversion advantage <span className="serif-accent">online</span>.
      </>
    ),
    body: "Build fast, scalable, and SEO-ready websites designed to convert visitors into customers and grow your business.",
    footer: "features",
    cards: [
      {
        icon: "globe",
        title: "Corporate Websites",
        body: "Professional websites that build credibility and showcase your brand effectively.",
      },
      {
        icon: "layout",
        title: "Landing Pages",
        body: "High-converting landing pages for campaigns and lead generation.",
      },
      {
        icon: "cart",
        title: "E-commerce Development",
        body: "Scalable e-commerce solutions that deliver seamless shopping experiences.",
      },
      {
        icon: "code",
        title: "Website Revamp & Development",
        body: "Modern designs, better performance, and SEO-ready development for measurable results.",
      },
      {
        icon: "pen",
        title: "UI/UX Design",
        body: "Intuitive, user-friendly designs that enhance engagement and drive conversions.",
      },
    ],
  },
];

const adStats = [
  { value: 8, suffix: "M+", label: "Campaign Impressions" },
  { value: 58, suffix: "%", label: "Sales Qualified Leads" },
  { prefix: "₹", value: 10, suffix: "Cr+", label: "Managed in Ad Spend" },
  { text: "Lower CPL", label: "Better ROI · Max Results" },
];

const webFeatures = [
  { icon: "bolt", label: "Fast & Performance Optimised" },
  { icon: "shield", label: "Secure & Scalable Architecture" },
  { icon: "search", label: "SEO Ready from the Ground Up" },
  { icon: "mobile", label: "Mobile First & User Focused" },
];

function ClientChip({ client }) {
  return (
    <div className="flex h-16 items-center justify-center border px-4">
      {client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          className="max-h-8 w-auto object-contain opacity-70 grayscale"
        />
      ) : (
        <span className="text-center text-sm font-semibold text-muted-foreground/70">
          {client.name}
        </span>
      )}
    </div>
  );
}

function BandFooter({ footer }) {
  if (footer === "clients") {
    return (
      <div>
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
          Clients We Work With
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {clients.map((c) => (
            <ClientChip key={c.name} client={c} />
          ))}
        </div>
      </div>
    );
  }

  if (footer === "stats") {
    return (
      <div

        className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4"
      >
        {adStats.map((s) => (
          <div key={s.label}>
            <p className="mb-2 text-3xl font-semibold tracking-tight">
              {s.text || (
                <>
                  {s.prefix}
                  {s.value}
                  {s.suffix}
                </>
              )}
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div

      className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4"
    >
      {webFeatures.map((f) => (
        <div key={f.label}>
          <Icon path={glyphs[f.icon]} size={22} className="mb-3" />
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
            {f.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function ServiceCard({ icon, title, body }) {
  return (
    <div className="flex items-start gap-5 border bg-card p-5 sm:p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Icon path={glyphs[icon]} size={22} />
      </div>
      <div className="border-l pl-5">
        <h4 className="mb-1.5 font-semibold">{title}</h4>
        <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

function ServiceBand({ band }) {
  return (
    <div className="border-t py-12 lg:py-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="flex flex-col">
          <div>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
              {band.eyebrow}
            </p>
            <div className="mb-6 h-px w-10 bg-foreground" aria-hidden="true" />
            <h3 className="mb-5 max-w-md text-3xl font-semibold sm:text-4xl lg:text-5xl">
              {band.heading}
            </h3>
            <p className="max-w-md text-lg text-muted-foreground">{band.body}</p>
            <div className="my-8 h-px w-10 bg-foreground" aria-hidden="true" />
          </div>
          <BandFooter footer={band.footer} />
        </div>
        <div className="flex flex-col gap-4">
          {band.cards.map((c) => (
            <ServiceCard key={c.title} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="mx-4 scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl">
        <p

          className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground"
        >
          Our Services
        </p>
        <h2

          className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl"
        >
          Everything you need to <span className="serif-accent">grow</span>,
          nothing you don&apos;t.
        </h2>

        {bands.map((band) => (
          <ServiceBand key={band.eyebrow} band={band} />
        ))}

        <div

          className="mt-4 flex flex-col gap-6 border p-6 sm:p-8 lg:flex-row lg:items-center"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Icon path={glyphs.chart} size={22} />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold">Ready to grow your business?</p>
            <p className="text-muted-foreground">
              Let&apos;s build a strategy that delivers measurable results.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="https://superengine.vercel.app/?utm_source=searchmadarth&utm_medium=website&utm_campaign=free_audit" target="_blank" rel="noopener noreferrer">Get Free Growth Audit →</Button>
            <Button href="tel:+918667767447" variant="outline">
              Book a Consultation →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
