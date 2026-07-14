// TODO: review drafted answers with the team
// Exported for the FAQPage JSON-LD in structured-data.js — schema content
// must exactly match the FAQ rendered on the page.
export const faqs = [
  {
    q: "How long does SEO take?",
    a: "Most sites see early movement in 8–12 weeks, with meaningful ranking and traffic gains in 4–6 months. Timelines depend on your starting point, competition, and how quickly technical and content fixes go live. We share a milestone roadmap upfront so you always know what to expect.",
  },
  {
    q: "What budget is required for Google Ads?",
    a: "There is no fixed minimum — budgets are built backwards from your target cost per lead and market competition. We typically recommend starting with a test budget for the first month, then scaling what converts. You get full visibility into where every rupee goes.",
  },
  {
    q: "Can you redesign my website without affecting rankings?",
    a: "Yes. We follow an SEO-safe migration process: full URL mapping, redirect planning, content parity checks, and pre/post-launch monitoring, so your existing rankings and traffic are protected during the revamp.",
  },
  {
    q: "Do you provide monthly reporting?",
    a: "Yes. Every engagement includes a monthly report covering rankings, traffic, leads, and spend, plus a review call to walk through results and the plan for the next month.",
  },
  {
    q: "Which industries do you specialise in?",
    a: "We have deep experience across manufacturing, education, fashion and jewellery, real estate, banking and financial services, retail, logistics, healthcare, and SMEs and startups.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="mx-4 scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <p

          className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground"
        >
          FAQ
        </p>
        <h2

          className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl"
        >
          Frequently asked <span className="serif-accent">questions</span>.
        </h2>
        <div className="flex flex-col">
          {faqs.map((f) => (
            <details key={f.q} name="faq" className="group border-t last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium sm:text-lg [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="shrink-0 transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="max-w-3xl pb-6 text-base leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
