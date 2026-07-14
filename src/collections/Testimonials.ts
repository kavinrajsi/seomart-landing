import type { CollectionConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange, revalidateOnDelete } from '@/lib/cache'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order', 'updatedAt'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'initials',
      type: 'text',
      maxLength: 3,
      admin: { description: 'Monogram shown in the avatar, e.g. "BG".' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.testimonials)],
    afterDelete: [revalidateOnDelete(CACHE_TAGS.testimonials)],
  },
}
