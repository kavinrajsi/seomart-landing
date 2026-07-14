import type { GlobalConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange } from '@/lib/cache'
import { sectionHeadingFields } from '@/fields/sectionHeading'

export const Stats: GlobalConfig = {
  slug: 'stats',
  access: {
    read: () => true,
  },
  fields: [
    ...sectionHeadingFields(),
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Stat', plural: 'Stats' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'prefix', type: 'text', admin: { width: '25%', description: 'e.g. "₹"' } },
            { name: 'value', type: 'number', required: true, admin: { width: '25%' } },
            { name: 'decimals', type: 'number', admin: { width: '25%', description: 'Decimal places to animate to.' } },
            { name: 'suffix', type: 'text', admin: { width: '25%', description: 'e.g. "%", "x", " days"' } },
          ],
        },
        { name: 'label', type: 'textarea', required: true },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.stats)],
  },
}
