import type { CollectionConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange, revalidateOnDelete } from '@/lib/cache'

export const Clients: CollectionConfig = {
  slug: 'clients',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'updatedAt'],
    description: 'Logos shown in the "Trusted by" marquee. No logo → the name renders as a text wordmark.',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. When empty, the name renders as a text wordmark.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.clients)],
    afterDelete: [revalidateOnDelete(CACHE_TAGS.clients)],
  },
}
