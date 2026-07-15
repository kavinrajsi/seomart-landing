import AccentHeading from "./accent-heading";
import { getIndustries } from "@/lib/payload";

export default async function Industries() {
  const data = await getIndustries();
  if (!data) return null;
  const industries = data.items ?? [];

  return (
    <section id="industries" className="section-industries mx-4 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <h2 className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl">
          <AccentHeading
            before={data.headingBefore}
            accent={data.headingAccent}
            after={data.headingAfter}
          />
        </h2>
        <ul>
          {industries.map((industry) => (
            <li key={industry.id ?? industry.name} className="group border-t last:border-b">
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
