import Button from "./button";
import CalButton from "./cal-button";

export default function FinalCta() {
  return (
    <section id="contact" className="scroll-mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-20 text-center lg:py-32">
        <h2

          className="mb-6 max-w-4xl text-4xl font-semibold sm:text-5xl lg:text-7xl"
        >
          Ready to <span className="serif-accent">grow</span> your business
          online?
        </h2>
        <p className="mb-10 max-w-xl text-lg text-primary-foreground/70">
          Let&apos;s discuss your growth objectives and build a strategy that
          delivers measurable results.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <CalButton variant="inverted" size="lg">
            Book a Free Consultation
          </CalButton>
          <Button href="https://superengine.vercel.app/?utm_source=searchmadarth&utm_medium=website&utm_campaign=free_audit" target="_blank" rel="noopener noreferrer" variant="ghost-light" size="lg">
            Get a Free Audit →
          </Button>
        </div>
      </div>
    </section>
  );
}
