import type { Field } from 'payload'

/**
 * Shared fields for a section header: a three-part heading (before + accent +
 * after). Parts are joined with a single space when rendered.
 */
export const sectionHeadingFields = ({
  headingBefore,
  headingAccent,
  headingAfter,
}: {
  headingBefore?: string
  headingAccent?: string
  headingAfter?: string
} = {}): Field[] => [
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
