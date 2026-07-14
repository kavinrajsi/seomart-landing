import type { GlobalConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange } from '@/lib/cache'
import { sectionHeadingFields } from '@/fields/sectionHeading'

export const Why: GlobalConfig = {
  slug: 'why',
  access: {
    read: () => true,
  },
  fields: [
    ...sectionHeadingFields(),
    {
      name: 'points',
      type: 'array',
      labels: { singular: 'Point', plural: 'Points' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.why)],
  },
}
