import type { GlobalConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange } from '@/lib/cache'

export const Hero: GlobalConfig = {
  slug: 'hero',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'subhead',
      type: 'textarea',
    },
    {
      type: 'row',
      fields: [
        { name: 'primaryCtaLabel', type: 'text', admin: { width: '50%' } },
        { name: 'primaryCtaHref', type: 'text', admin: { width: '50%', description: 'e.g. "#services" or a full URL.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'secondaryCtaLabel', type: 'text', admin: { width: '50%' } },
        { name: 'secondaryCtaHref', type: 'text', admin: { width: '50%' } },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.hero)],
  },
}
