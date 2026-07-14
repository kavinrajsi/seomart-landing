import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { CaseStudies } from './src/collections/CaseStudies'
import { Testimonials } from './src/collections/Testimonials'
import { Clients } from './src/collections/Clients'
import { Hero } from './src/globals/Hero'
import { Stats } from './src/globals/Stats'
import { Services } from './src/globals/Services'
import { Industries } from './src/globals/Industries'
import { Process } from './src/globals/Process'
import { Offer } from './src/globals/Offer'
import { Why } from './src/globals/Why'
import { Faq } from './src/globals/Faq'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, CaseStudies, Testimonials, Clients],
  globals: [Hero, Stats, Services, Industries, Process, Offer, Why, Faq],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    // Only route uploads to Cloudflare R2 (S3-compatible) when credentials are
    // present. Locally, without them, Payload falls back to its default on-disk
    // storage so dev works with no cloud dependency. Production must set them,
    // since serverless has no persistent filesystem.
    ...(process.env.R2_BUCKET && process.env.R2_ENDPOINT
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.R2_BUCKET,
            config: {
              endpoint: process.env.R2_ENDPOINT,
              region: 'auto',
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
              },
            },
          }),
        ]
      : []),
  ],
})
