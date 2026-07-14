// TODO: review drafted one-liners with the team
const industries = [
  {
    name: "Manufacturing",
    line: "B2B lead engines for plants, OEMs, and exporters.",
  },
  {
    name: "Education",
    line: "Admissions funnels that fill batches faster.",
  },
  {
    name: "Fashion / Jewellery",
    line: "Heritage brands selling to digital-first buyers.",
  },
  {
    name: "Real Estate",
    line: "Site-visit pipelines from search and social.",
  },
  {
    name: "Banking & Financial Services",
    line: "Trust-led acquisition within compliance.",
  },
  {
    name: "Retail",
    line: "Footfall and e-commerce growth in one system.",
  },
  {
    name: "Logistics",
    line: "Scalable platforms with streamlined UX.",
  },
  {
    name: "Healthcare",
    line: "Patient acquisition that respects regulation.",
  },
  {
    name: "SMEs & Startups",
    line: "Growth systems sized for real budgets.",
  },
];

export default function Industries() {
  return (
    <section className="mx-4 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <p

          className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground"
        >
          Industry Expertise
        </p>
        <h2

          className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl"
        >
          Industries we have <span className="serif-accent">worked</span> with.
        </h2>
        <ul>
          {industries.map((industry) => (
            <li key={industry.name} className="group border-t last:border-b">
              <div className="grid grid-cols-1 items-baseline gap-1 py-5 sm:grid-cols-[1.2fr_1fr] sm:gap-6 lg:py-6">
                <h3 className="text-2xl font-light transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl lg:text-4xl">
                  {industry.name}
                </h3>
                <p className="text-base text-muted-foreground">{industry.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
