import type { GlobalConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange } from '@/lib/cache'
import { sectionHeadingFields } from '@/fields/sectionHeading'
import { SERVICE_ICON_OPTIONS } from '@/lib/service-icons'

export const Services: GlobalConfig = {
  slug: 'services',
  access: {
    read: () => true,
  },
  fields: [
    ...sectionHeadingFields(),
    {
      name: 'bands',
      type: 'array',
      labels: { singular: 'Service Band', plural: 'Service Bands' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'headingBefore', type: 'text', admin: { width: '40%' } },
            { name: 'headingAccent', type: 'text', admin: { width: '20%' } },
            { name: 'headingAfter', type: 'text', admin: { width: '40%' } },
          ],
        },
        { name: 'body', type: 'textarea' },
        {
          name: 'cards',
          type: 'array',
          labels: { singular: 'Service Card', plural: 'Service Cards' },
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: SERVICE_ICON_OPTIONS,
            },
            { name: 'title', type: 'text', required: true },
            { name: 'body', type: 'textarea' },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.services)],
  },
}
