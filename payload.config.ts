import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { collections } from './src/payload/collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: {
      titleSuffix: ' - DACK Command Center',
    },
    user: 'users',
  },
  collections,
  db: postgresAdapter({
    idType: 'uuid',
    pool: {
      connectionString:
        process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:55432/dack_proposal_command_center',
    },
  }),
  editor: lexicalEditor(),
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'src/generated-schema.graphql'),
  },
  secret: process.env.PAYLOAD_SECRET || 'dev-only-change-me-before-live-data',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
