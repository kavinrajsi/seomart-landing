import Button from "./button";
import ArrowIcon from "./arrow-icon";
import AccentHeading from "./accent-heading";
import { AUDIT_URL, PHONE } from "@/lib/constants";
import { getServices } from "@/lib/payload";

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

// Keep in sync with SERVICE_ICON_KEYS in src/lib/service-icons.ts — the CMS
// stores a key, this registry maps it to the glyph.
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

function ServiceCard({ icon, title, body }) {
  return (
    <div className="border-[1px] bg-card p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Icon path={glyphs[icon]} size={20} />
        </div>
        <h4 className="font-semibold">{title}</h4>
      </div>
      <p className="text-sm leading-normal text-muted-foreground">{body}</p>
    </div>
  );
}

// Sticky pin-stack for all breakpoints: each card's title bar (h-16 = 64px)
// peeks above the next, so TOP_BASE clears the fixed header and every card
// offsets by one bar-height. Mobile uses 70vh, desktop uses 100svh.
const HEADER_H = 64;
const TOP_BASE = 24;

function ServiceBand({ band, index, isLast }) {
  const cards = band.cards ?? [];
  // Last card gets no tall min-height so the deck releases into the CTA
  // sooner once it pins; earlier cards keep full-height to pace the stack.
  const height = isLast ? "" : "min-h-[70vh] lg:min-h-[100svh]";
  return (
    <article
      className={`stack-card mb-0 flex flex-col border-[1px] bg-card sticky ${height}`}
      style={{ top: `${TOP_BASE + index * HEADER_H}px` }}
    >
      <header className="flex h-16 items-center justify-between gap-4 border-b-[1px] bg-card px-6 lg:px-10">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase text-muted-foreground">
          {cards.length} services
        </span>
      </header>

      <div className="flex flex-1 items-start px-6 py-10 sm:px-10 lg:px-14">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h3 className="mb-5 max-w-md text-3xl font-semibold sm:text-4xl lg:text-5xl">
              <AccentHeading
                before={band.headingBefore}
                accent={band.headingAccent}
                after={band.headingAfter}
              />
            </h3>
            <p className="max-w-md text-lg text-muted-foreground">{band.body}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {cards.map((card) => (
              <ServiceCard key={card.id ?? card.title} {...card} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function Services() {
  const data = await getServices();
  if (!data) return null;
  const bands = data.bands ?? [];

  return (
    <section id="services" className="mx-4 scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl">
          <AccentHeading
            before={data.headingBefore}
            accent={data.headingAccent}
            after={data.headingAfter}
          />
        </h2>

        {bands.map((band, i) => (
          <ServiceBand
            key={band.id ?? i}
            band={band}
            index={i}
            isLast={i === bands.length - 1}
          />
        ))}

        <div className="mt-4 flex flex-col gap-6 border-[1px] p-6 sm:p-8 lg:flex-row lg:items-center">
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
            <Button href={AUDIT_URL} target="_blank" rel="noopener noreferrer" className="gap-2">Get Free Growth Audit <ArrowIcon /></Button>
            <Button href={`tel:${PHONE}`} variant="outline" className="gap-2">
              Book a Consultation <ArrowIcon />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
