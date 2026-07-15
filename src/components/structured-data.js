import { getFaq, getServices } from "@/lib/payload";

const SITE_URL = "http://seomart.vercel.app";

export default async function StructuredData() {
  const [faqData, servicesData] = await Promise.all([getFaq(), getServices()]);
  const faqs = faqData?.items ?? [];
  // Flatten every service card title across all bands so the schema's offer
  // catalog always matches the services rendered on the page.
  const services = (servicesData?.bands ?? []).flatMap((band) =>
    (band.cards ?? []).map((card) => card.title)
  );

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: "SearchMadarth®",
        url: SITE_URL,
        slogan: "We Search. We Build. We Grow Your Business.",
        telephone: "+91 86677 67447",
        areaServed: "IN",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "SearchMadarth®",
        publisher: { "@id": `${SITE_URL}/#org` },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: "SearchMadarth® Digital Growth Services",
        url: SITE_URL,
        parentOrganization: { "@id": `${SITE_URL}/#org` },
        areaServed: "IN",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital Marketing & Web Services",
          itemListElement: services.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
