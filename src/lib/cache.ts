import { revalidateTag } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Cache tags shared between the read helpers in `src/lib/payload.js` (which wrap
 * Local API reads in `'use cache'` + `cacheTag(tag)`) and the Payload hooks below
 * (which call `revalidateTag(tag)` on publish). Keep both sides in sync.
 */
export const CACHE_TAGS = {
  media: 'media',
  caseStudies: 'case-studies',
  testimonials: 'testimonials',
  clients: 'clients',
  hero: 'hero',
  stats: 'stats',
  services: 'services',
  industries: 'industries',
  process: 'process',
  offer: 'offer',
  why: 'why',
  faq: 'faq',
} as const

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS]

// `{ expire: 0 }` expires the tag immediately so an editor's published change
// shows on the very next page load, rather than the stale-while-revalidate
// behavior of `profile="max"`. Publishes are infrequent, so the blocking
// revalidate is a fine trade for read-your-writes.
const EXPIRE_NOW = { expire: 0 } as const

/** afterChange hook for a collection or global that busts the given cache tag. */
export const revalidateOnChange =
  (tag: CacheTag): CollectionAfterChangeHook & GlobalAfterChangeHook =>
  ({ doc }) => {
    revalidateTag(tag, EXPIRE_NOW)
    return doc
  }

/** afterDelete hook for a collection that busts the given cache tag. */
export const revalidateOnDelete =
  (tag: CacheTag): CollectionAfterDeleteHook =>
  ({ doc }) => {
    revalidateTag(tag, EXPIRE_NOW)
    return doc
  }
