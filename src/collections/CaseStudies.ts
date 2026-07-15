import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { CACHE_TAGS, revalidateOnChange, revalidateOnDelete } from '@/lib/cache'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: {
    singular: 'Case Study',
    plural: 'Case Studies',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tag', 'order', 'updatedAt'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Client / case study name shown on the card and drawer.' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'URL-safe identifier, e.g. "sundari-silks".' },
    },
    {
      name: 'tag',
      type: 'text',
      defaultValue: 'Case Study',
      admin: { description: 'Small label above the title, e.g. "E-commerce · SEO".' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Lower numbers appear first.' },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: { description: 'Short teaser shown on the card and as the drawer fallback.' },
    },
    {
      name: 'listingImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Card thumbnail (16:9).' },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Large image at the top of the drawer. Falls back to the listing image.' },
    },
    {
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      fields: [
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
            ],
          }),
          admin: { description: 'Use the embed block to add iframes (YouTube, Figma, Loom, prototypes). Upload images directly in the editor.' },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.caseStudies)],
    afterDelete: [revalidateOnDelete(CACHE_TAGS.caseStudies)],
  },
}
