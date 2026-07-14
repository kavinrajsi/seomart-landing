import Button from "./button";

const AUDIT_URL = "https://superengine.vercel.app/?utm_source=searchmadarth&utm_medium=website&utm_campaign=free_audit";

const offers = [
  {
    title: "Get a Free Digital Growth Audit",
    items: [
      "Digital Health Score",
      "Gap Analysis Report",
      "Estimated Revenue Opportunity",
      "Competitor Benchmarking",
      "Personalised 90-Day Growth Roadmap",
    ],
    cta: "Claim Your Free Audit",
    href: AUDIT_URL,
    featured: true,
  },
  {
    title: "AI Powered SEO Audit",
    items: [
      "Website Audit",
      "Detailed SEO Analysis & Fixes",
      "Keyword Opportunities",
      "90-Day Growth Roadmap",
    ],
    cta: "Run My SEO Audit",
    href: AUDIT_URL,
    featured: false,
  },
];

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function Offer() {
  return (
    <section id="offer" className="mx-4 scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <p

          className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground"
        >
          Strong Offer
        </p>
        <h2

          className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl"
        >
          Start with a <span className="serif-accent">free</span> audit.
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className={`flex flex-col p-8 lg:p-10 ${
                offer.featured
                  ? "bg-primary text-primary-foreground"
                  : "border bg-background"
              }`}
            >
              <h3 className="mb-8 text-2xl font-semibold lg:text-3xl">
                {offer.title}
              </h3>
              <ul className="mb-10 flex flex-col gap-3">
                {offer.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-base">
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  href={offer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={offer.featured ? "ghost-light" : "ghost"}
                  size="lg"
                >
                  {offer.cta} →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
