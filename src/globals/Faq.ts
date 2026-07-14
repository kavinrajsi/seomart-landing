import type { GlobalConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange } from '@/lib/cache'
import { sectionHeadingFields } from '@/fields/sectionHeading'

export const Faq: GlobalConfig = {
  slug: 'faq',
  access: {
    read: () => true,
  },
  fields: [
    ...sectionHeadingFields(),
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Question', plural: 'Questions' },
      fields: [
        { name: 'q', type: 'text', required: true },
        { name: 'a', type: 'textarea', required: true },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.faq)],
  },
}
