import type { GlobalConfig } from 'payload'
import { CACHE_TAGS, revalidateOnChange } from '@/lib/cache'

export const Showreel: GlobalConfig = {
  slug: 'showreel',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'Homepage showreel. Provide an uploaded video OR a video URL. The section is hidden on the site until one is set.',
  },
  fields: [
    { name: 'heading', type: 'text', admin: { description: 'Section heading (optional).' } },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Uploaded video file (mp4/webm). Takes priority over Video URL.' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: { description: 'Or a video URL — a direct .mp4/.webm link, or a YouTube/Vimeo link.' },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Poster image shown before playback (used for uploaded/direct videos).' },
    },
    {
      name: 'autoplay',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Autoplay muted on loop (uploaded/direct videos only).' },
    },
  ],
  hooks: {
    afterChange: [revalidateOnChange(CACHE_TAGS.showreel)],
  },
}
