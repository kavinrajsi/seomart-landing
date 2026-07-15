import { getTestimonials } from "@/lib/payload";

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
                <blockquote className="text-base leading-normal text-foreground">
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
