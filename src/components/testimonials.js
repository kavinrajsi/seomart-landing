import { getTestimonials } from "@/lib/payload";

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

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="section-testimonials mx-4 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <h2 className="mb-4 max-w-3xl text-4xl font-semibold sm:text-5xl lg:text-6xl">
          Businesses that took the leap.
        </h2>
        <p className="mb-12 max-w-screen-md text-lg text-muted-foreground">
          Real owners. Real results. Measured in revenue, not vanity metrics.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id ?? testimonial.name}
              className="flex flex-col justify-between rounded-[4px] border border-border bg-background p-6 lg:p-8"
            >
              <div>
                <Stars />
                <blockquote className="mt-6 text-base leading-normal text-foreground">
                  {testimonial.quote}
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                {testimonial.logo ? (
                  <img
                    src={testimonial.logo}
                    alt={testimonial.name}
                    className="h-8 w-auto shrink-0 object-contain"
                  />
                ) : null}
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{testimonial.name}</span>
                  <span className="font-mono text-[11px] uppercase text-muted-foreground">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
