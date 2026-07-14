// Testimonials sourced from sme.searchmadarth.com
const testimonials = [
  {
    quote:
      "We've partnered with Madarth for our website, SEO, and digital advertising at Indicus Paints. What stands out is their integrity, transparency, and commitment to results. They deliver on what they promise and consistently go beyond the brief with valuable ideas and insights. It's a partnership built on trust and a genuine focus on growth.",
    name: "B. Gokul",
    role: "Partner, VNC Group",
    initials: "BG",
  },
  {
    quote:
      "As Veranda IAS's digital marketing partner, Madarth has played a key role in expanding our reach, strengthening brand visibility, and generating quality leads. Their strategic approach, data-driven execution, proactive communication, and deep understanding of the education sector have consistently delivered strong results and made them a trusted growth partner.",
    name: "Business Head",
    role: "Veranda IAS",
    initials: "VI",
  },
];

function Stars() {
  return (
    <div className="flex gap-1" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2l2.92 6.26L21.5 9.27l-4.75 4.38 1.17 6.85L12 17.25l-5.92 3.25 1.17-6.85L2.5 9.27l6.58-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="mx-4 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <p

          className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground"
        >
          Testimonials
        </p>
        <h2

          className="mb-4 max-w-3xl text-4xl font-semibold sm:text-5xl lg:text-6xl"
        >
          Businesses that took the <span className="serif-accent">leap</span>.
        </h2>
        <p className="mb-12 max-w-screen-md text-lg text-muted-foreground">
          Real owners. Real results. Measured in revenue, not vanity metrics.
        </p>
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="group flex flex-col justify-between bg-background p-8 transition-colors hover:bg-card lg:p-10"
            >
              <div>
                <span
                  aria-hidden="true"
                  className="serif-accent block select-none text-7xl leading-none text-foreground/15 transition-colors group-hover:text-foreground/30"
                >
                  “
                </span>
                <blockquote className="mb-10 mt-4 text-xl font-light leading-relaxed lg:text-2xl">
                  {t.quote}
                </blockquote>
              </div>
              <figcaption className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center border bg-secondary font-mono text-xs font-medium tracking-[0.1em]"
                >
                  {t.initials}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs uppercase tracking-[0.15em]">
                    {t.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{t.role}</span>
                </span>
                <span className="ml-auto">
                  <Stars />
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
