// TODO: replace placeholder proof points with approved copy
const points = [
  {
    title: "Everything under one roof",
    body: "Search, paid media, design, and development work as one team — no agency hand-offs, no mixed signals.",
  },
  {
    title: "1000+ brands served",
    body: "From family-run stores to national institutions, we have built growth systems across industries.",
  },
  {
    title: "Performance-first builds",
    body: "Every website ships fast, ranks well, and is measured against Core Web Vitals from day one.",
  },
  {
    title: "Transparent reporting",
    body: "Monthly reports tie every rupee spent to rankings, leads, and revenue — no vanity metrics.",
  },
];

export default function Why() {
  return (
    <section id="why" className="mx-4 scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t-[4px] pt-10 lg:pt-16">
        <p

          className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground"
        >
          Why SearchMadarth®
        </p>
        <h2

          className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl"
        >
          Built for <span className="serif-accent">real</span> results.
        </h2>
        <div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div key={point.title} className="bg-background p-6 lg:p-8">
              <h3 className="mb-2 text-lg font-semibold">{point.title}</h3>
              <p className="text-base text-muted-foreground">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
