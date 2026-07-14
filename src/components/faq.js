import FaqList from "./faq-list";
import AccentHeading from "./accent-heading";
import { getFaq } from "@/lib/payload";

export default async function Faq() {
  const data = await getFaq();
  if (!data) return null;
  const faqs = data.items ?? [];

  return (
    <section id="faq" className="mx-4 scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
          {data.eyebrow}
        </p>
        <h2 className="mb-12 max-w-3xl text-4xl font-semibold sm:text-5xl lg:mb-16 lg:text-6xl">
          <AccentHeading
            before={data.headingBefore}
            accent={data.headingAccent}
            after={data.headingAfter}
          />
        </h2>
        <FaqList faqs={faqs} />
      </div>
    </section>
  );
}
