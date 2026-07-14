import { unstable_cache } from 'next/cache'
import { getPayload, type Payload } from 'payload'
import config from '@payload-config'
import { CACHE_TAGS, type CacheTag } from '@/lib/cache'

// Match the previous Sanity behavior: cache reads for an hour, and additionally
// bust them on-demand via `revalidateTag` from the Payload afterChange hooks in
// `src/lib/cache.ts`. We deliberately use `unstable_cache` (the pre-Cache-
// Components model) instead of the `'use cache'` directive so we don't have to
// enable `cacheComponents` app-wide, which would complicate the Payload admin.
const REVALIDATE_SECONDS = 3600

// Reuse a single Payload instance across requests (Local API, no HTTP).
let clientPromise: Promise<Payload> | null = null

export const getPayloadClient = (): Promise<Payload> => {
  if (!clientPromise) {
    clientPromise = getPayload({ config })
  }
  return clientPromise
}

/** Cached reader for a single-instance global; returns null on any error. */
function cachedGlobal<T = unknown>(slug: string, tag: CacheTag) {
  return unstable_cache(
    async (): Promise<T | null> => {
      try {
        const payload = await getPayloadClient()
        // slug is a literal from CACHE_TAGS callers; cast keeps TS happy before
        // payload-types.ts is generated.
        return (await payload.findGlobal({ slug: slug as never, depth: 1 })) as T
      } catch (error) {
        console.error(`Failed to load "${slug}" global:`, error)
        return null
      }
    },
    ['global', slug],
    { tags: [tag], revalidate: REVALIDATE_SECONDS },
  )
}

export const getHero = cachedGlobal('hero', CACHE_TAGS.hero)
export const getStats = cachedGlobal('stats', CACHE_TAGS.stats)
export const getServices = cachedGlobal('services', CACHE_TAGS.services)
export const getIndustries = cachedGlobal('industries', CACHE_TAGS.industries)
export const getProcess = cachedGlobal('process', CACHE_TAGS.process)
export const getOffer = cachedGlobal('offer', CACHE_TAGS.offer)
export const getWhy = cachedGlobal('why', CACHE_TAGS.why)
export const getFaq = cachedGlobal('faq', CACHE_TAGS.faq)

/** Testimonials, ordered. Returns [] on error. */
export const getTestimonials = unstable_cache(
  async () => {
    try {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'testimonials',
        sort: 'order',
        limit: 100,
        depth: 0,
      })
      return docs
    } catch (error) {
      console.error('Failed to load testimonials:', error)
      return []
    }
  },
  ['testimonials'],
  { tags: [CACHE_TAGS.testimonials], revalidate: REVALIDATE_SECONDS },
)

/** Marquee clients, ordered. Returns [] on error. */
export const getClients = unstable_cache(
  async () => {
    try {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'clients',
        sort: 'order',
        limit: 200,
        depth: 1,
      })
      return docs.map((client: Record<string, unknown>) => ({
        name: client.name as string,
        logo:
          client.logo && typeof client.logo === 'object'
            ? ((client.logo as { url?: string }).url ?? null)
            : null,
      }))
    } catch (error) {
      console.error('Failed to load clients:', error)
      return []
    }
  },
  ['clients'],
  { tags: [CACHE_TAGS.clients], revalidate: REVALIDATE_SECONDS },
)

type CaseStudyCard = {
  client: string
  slug: string
  tag: string
  summary: string
  image: string | null
  alt: string
  cover: string | null
  sections: { _key: string; media: string | null; content: unknown }[]
}

const mediaUrl = (value: unknown): string | null =>
  value && typeof value === 'object' ? ((value as { url?: string }).url ?? null) : null

const mediaAlt = (value: unknown): string | null =>
  value && typeof value === 'object' ? ((value as { alt?: string }).alt ?? null) : null

/**
 * Case studies mapped to the shape the card/drawer components expect. Returns
 * null when there are none, so the component keeps its static fallback.
 */
export const getCaseStudies = unstable_cache(
  async (): Promise<CaseStudyCard[] | null> => {
    try {
      const payload = await getPayloadClient()
      const { docs } = await payload.find({
        collection: 'case-studies',
        sort: 'order',
        limit: 100,
        depth: 2,
      })
      if (!docs.length) return null
      return docs.map((doc: Record<string, any>) => ({
        client: doc.title,
        slug: doc.slug,
        tag: doc.tag ?? 'Case Study',
        summary: doc.summary ?? '',
        image: mediaUrl(doc.listingImage),
        alt: mediaAlt(doc.listingImage) ?? doc.title,
        cover: mediaUrl(doc.coverImage),
        sections: (doc.sections ?? []).map((section: Record<string, any>, index: number) => ({
          _key: section.id ?? String(index),
          media: mediaUrl(section.media),
          content: section.content ?? null,
        })),
      }))
    } catch (error) {
      console.error('Failed to load case studies:', error)
      return null
    }
  },
  ['case-studies'],
  { tags: [CACHE_TAGS.caseStudies], revalidate: REVALIDATE_SECONDS },
)
