import type { CollectionConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange, revalidateOnDelete } from '@/lib/cache'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: true,
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Alternative text for screen readers and SEO.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.media)],
    afterDelete: [revalidateOnDelete(CACHE_TAGS.media)],
  },
}
