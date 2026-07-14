import { faqs } from "./faq";

const SITE_URL = "https://searchmadarth-landing.vercel.app";

const SERVICES = [
  "Search Engine Optimisation (SEO)",
  "Answer Engine Optimisation (AEO)",
  "Generative Engine Optimisation (GEO)",
  "Technical & Content Excellence",
  "Google Ads Management",
  "Meta Advertising",
  "Conversion & Tracking",
  "Landing Page Optimisation",
  "Corporate Websites",
  "Landing Pages",
  "E-commerce Development",
  "Website Revamp & Development",
  "UI/UX Design",
];

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
        itemListElement: SERVICES.map((name) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
