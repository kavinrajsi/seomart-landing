import type { Field } from 'payload'

/**
 * Shared fields for a section header: the mono eyebrow label plus a three-part
 * heading. The middle part (`headingAccent`) is wrapped in the serif-accent
 * styling by the component; before/after are plain. Parts are joined with a
 * single space when rendered.
 */
export const sectionHeadingFields = ({
  eyebrow,
  headingBefore,
  headingAccent,
  headingAfter,
}: {
  eyebrow?: string
  headingBefore?: string
  headingAccent?: string
  headingAfter?: string
} = {}): Field[] => [
  {
    name: 'eyebrow',
    type: 'text',
    defaultValue: eyebrow,
    admin: { description: 'Small uppercase label above the heading.' },
  },
  {
    type: 'row',
    fields: [
      {
        name: 'headingBefore',
        type: 'text',
        defaultValue: headingBefore,
        admin: { width: '40%', description: 'Heading text before the accent word.' },
      },
      {
        name: 'headingAccent',
        type: 'text',
        defaultValue: headingAccent,
        admin: { width: '20%', description: 'Highlighted (serif) word.' },
      },
      {
        name: 'headingAfter',
        type: 'text',
        defaultValue: headingAfter,
        admin: { width: '40%', description: 'Heading text after the accent word.' },
      },
    ],
  },
]
