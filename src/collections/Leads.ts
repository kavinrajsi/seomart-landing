import type { CollectionConfig } from 'payload'

// Audit-request leads captured by the "Book a Free Audit" form. Submissions
// arrive through the /api/audit route (Local API create), so `create` is open;
// reading/editing stays admin-only via the default access.
export const Leads: CollectionConfig = {
  slug: 'leads',
  access: {
    create: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
    description: 'Audit form submissions. Read-only record — do not edit.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'tracking',
      type: 'group',
      admin: { description: 'Attribution captured at submit time.' },
      fields: [
        { name: 'pageUrl', type: 'text' },
        { name: 'referrer', type: 'text' },
        { name: 'ip', type: 'text' },
        { name: 'userAgent', type: 'text' },
        { name: 'utmSource', type: 'text' },
        { name: 'utmMedium', type: 'text' },
        { name: 'utmCampaign', type: 'text' },
        { name: 'utmTerm', type: 'text' },
        { name: 'utmContent', type: 'text' },
        { name: 'gclid', type: 'text' },
        { name: 'wbraid', type: 'text' },
        { name: 'gbraid', type: 'text' },
        { name: 'fbclid', type: 'text' },
        { name: 'msclkid', type: 'text' },
        {
          name: 'params',
          type: 'json',
          admin: { description: 'All query params present at submit (catch-all).' },
        },
      ],
    },
  ],
}
