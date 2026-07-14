import type { GlobalConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange } from '@/lib/cache'
import { sectionHeadingFields } from '@/fields/sectionHeading'

export const Industries: GlobalConfig = {
  slug: 'industries',
  access: {
    read: () => true,
  },
  fields: [
    ...sectionHeadingFields(),
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Industry', plural: 'Industries' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'line', type: 'text' },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.industries)],
  },
}
