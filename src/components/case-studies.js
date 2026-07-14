import { getCaseStudies } from "@/lib/payload";
import CaseStudiesClient from "./case-studies-client";

// Static fallback if Sanity is unreachable or env vars are missing
const IMG_DIR = "/images/searchmadarth/sanity";

const FALLBACK_CASES = [
  {
    client: "Sundari Silks",
    image: `${IMG_DIR}/74377cc4efa1e2fc9e094f95d755785d3a99789a-1920x1080.webp`,
    summary:
      "Seamlessly integrating the digital realm for a traditional textile brand by creating great experiences.",
    tag: "E-commerce · SEO",
  },
  {
    client: "Veranda IAS",
    image: `${IMG_DIR}/128530192202dcd8cb28d10416d4c9c6d5c8d1d8-428x250.webp`,
    summary:
      "Built a conversion-focused admissions funnel with landing pages and lead campaigns.",
    tag: "Performance · Web",
  },
  {
    client: "Frankfinn",
    image: `${IMG_DIR}/ba8a409e1417892bbfa5b9778e3b3335406ad336-1320x454.png`,
    summary:
      "Scaled qualified admissions enquiries for a national training institute with search and social campaigns.",
    tag: "Lead Gen · SEO",
  },
];

export default async function CaseStudies() {
  let cases;
  try {
    cases = await getCaseStudies();
  } catch (error) {
    console.error("Failed to fetch case studies:", error);
    cases = null;
  }
  cases = cases ?? FALLBACK_CASES;
  return (
    <section id="work" className="scroll-mt-24 pb-10 lg:pb-30">
      <div className="mx-4">
        <div className="mx-auto max-w-6xl border-t pt-10 lg:pt-16">
          <h2

            className="mb-4 max-w-3xl text-4xl font-semibold sm:text-5xl lg:text-6xl"
          >
            Work that moves the <span className="serif-accent">numbers</span>.
          </h2>
          <p className="mb-12 max-w-screen-md text-lg text-muted-foreground">
            A few of the brands we have helped grow through search, performance,
            and design.
          </p>
        </div>
      </div>
      <CaseStudiesClient cases={cases} />
    </section>
  );
}
