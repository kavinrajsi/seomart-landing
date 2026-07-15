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
    {
      name: 'searchPairs',
      type: 'array',
      labels: { singular: 'Search Pair', plural: 'Search Pairs' },
      admin: {
        description:
          'Query/result groups cycled by the hero search animation. Leave empty to use the built-in defaults.',
      },
      fields: [
        { name: 'query', type: 'text', required: true },
        {
          name: 'results',
          type: 'array',
          labels: { singular: 'Result', plural: 'Results' },
          admin: { description: 'First result is shown as "Top result".' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.hero)],
  },
}
