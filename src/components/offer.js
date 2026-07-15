import Button from "./button";
import ArrowIcon from "./arrow-icon";
import AccentHeading from "./accent-heading";
import { getOffer } from "@/lib/payload";

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-1 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default async function Offer() {
  const data = await getOffer();
  if (!data) return null;
  const offers = data.offers ?? [];

  return (
    <section id="offer" className="section-offer mx-4 scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <h2 className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl">
          <AccentHeading
            before={data.headingBefore}
            accent={data.headingAccent}
            after={data.headingAfter}
          />
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {offers.map((offer) => (
            <div
              key={offer.id ?? offer.title}
              className={`flex flex-col rounded-[4px] p-8 lg:p-10 ${
                offer.featured
                  ? "bg-primary text-primary-foreground"
                  : "border bg-background"
              }`}
            >
              <h3 className="mb-8 text-2xl font-semibold lg:text-3xl">
                {offer.title}
              </h3>
              <ul className="mb-10 flex flex-col gap-3">
                {(offer.items ?? []).map((item) => (
                  <li key={item.id ?? item.text} className="flex items-start gap-2 text-base">
                    <Check />
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <a
                  href={offer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    variant={offer.featured ? "ghost-light" : "ghost"}
                    size="lg"
                    className="gap-2"
                  >
                    {offer.cta} <ArrowIcon />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
