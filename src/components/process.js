const steps = [
  { title: "Discover", body: "Understand your business goals." },
  { title: "Strategise", body: "Build a customised growth roadmap." },
  { title: "Execute", body: "Implement campaigns and optimise continuously." },
  { title: "Scale", body: "Improve ROI through data-led decisions." },
];

export default function Process() {
  return (
    <section id="process" className="mx-4 scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <p

          className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground"
        >
          Our Process
        </p>
        <h2

          className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl"
        >
          A clear path to <span className="serif-accent">compounding</span>{" "}
          growth.
        </h2>
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-background p-6 lg:p-8">
              <p className="mb-6 font-mono text-base text-muted-foreground">
                0{i + 1}
              </p>
              <h3 className="mb-2 text-2xl font-semibold">{step.title}</h3>
              <p className="text-base text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
