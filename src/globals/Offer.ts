import type { GlobalConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange } from '@/lib/cache'
import { sectionHeadingFields } from '@/fields/sectionHeading'

export const Offer: GlobalConfig = {
  slug: 'offer',
  access: {
    read: () => true,
  },
  fields: [
    ...sectionHeadingFields(),
    {
      name: 'offers',
      type: 'array',
      labels: { singular: 'Offer', plural: 'Offers' },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Item', plural: 'Items' },
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        {
          type: 'row',
          fields: [
            { name: 'cta', type: 'text', admin: { width: '50%', description: 'Button label.' } },
            { name: 'href', type: 'text', admin: { width: '50%' } },
          ],
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Highlighted (primary background) card.' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.offer)],
  },
}
