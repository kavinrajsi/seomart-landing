import CountUp from "./count-up";

// Revenue stats from sme.searchmadarth.com
const stats = [
  {
    value: 340,
    suffix: "%",
    label: "Average increase in qualified inbound leads within 90 days",
  },
  {
    prefix: "₹",
    value: 48,
    suffix: "Cr+",
    label: "Incremental revenue generated for Indian SMEs across our portfolio",
  },
  {
    value: 60,
    suffix: " days",
    label: "Median time from onboarding to measurable ROI impact",
  },
  {
    value: 4.1,
    decimals: 1,
    suffix: "x",
    label: "Average return on investment reported after the first year",
  },
];

export default function Stats() {
  return (
    <section className="mx-4 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <p

          className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground"
        >
          Revenue Impact
        </p>
        <h2

          className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl"
        >
          Numbers that <span className="serif-accent">actually</span> matter to
          your business.
        </h2>
        <div

          className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="mb-3 text-6xl font-semibold tracking-tight lg:text-7xl">
                {stat.prefix}
                <CountUp value={stat.value} decimals={stat.decimals} />
                {stat.suffix}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
