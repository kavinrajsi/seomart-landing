const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export async function sanityFetch(query) {
  const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`);
  return (await res.json()).result;
}

const CASE_STUDIES_QUERY = `*[_type == "caseStudy" && defined(slug.current)]
  | order(order asc, _createdAt desc) {
    "client": title,
    "slug": slug.current,
    "image": listingImage.asset->url + "?w=800&auto=format",
    "alt": coalesce(listingImage.alt, title),
    "tag": coalesce(industry->title, "Case Study"),
    "summary": pt::text(sections[0].sectionContent[style == "normal"][0]),
    "cover": coverImage.asset->url + "?w=1600&auto=format",
    "sections": sections[]{
      _key,
      "media": sectionMedia.asset->url,
      "content": sectionContent[]{
        ...,
        _type == "image" => { "url": asset->url + "?w=1200&auto=format" },
        _type == "video" => { "url": asset->url }
      }
    }
  }`;

export async function getCaseStudies() {
  try {
    const result = await sanityFetch(CASE_STUDIES_QUERY);
    return result?.length ? result : null;
  } catch {
    return null;
  }
}
