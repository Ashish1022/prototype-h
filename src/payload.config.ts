// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant';
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { isSuperAdmin } from './lib/access';
import { Tenants } from './collections/Tenants';
import { Templates } from './collections/Templates';
import { TenantTemplates } from './collections/TenantTemplates';
import { Products } from './collections/Products';
import { Tags } from './collections/Tags';
import { Categories } from './collections/Categories';
import { Reviews } from './collections/Reviews';
import { SubscriptionPlans } from './collections/SubscriptionPlans';
import { Subscriptions } from './collections/Subscriptions';

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " - ZERO | HUB",
    },
    components: {
      graphics: {
        Logo: '@/components/payload/login',
      },
      beforeNavLinks: [
        '@/components/payload/razorpay-subscription#SubscriptionVerifyButton',
        '@/components/payload/razorpay-verification#TenantBankVerifyButton'
      ]
    }
  },
  collections: [Users, Media, Tenants, Templates, TenantTemplates, Products, Tags, Categories, Reviews, SubscriptionPlans, Subscriptions],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    idType: 'uuid'
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    multiTenantPlugin({
      collections: {
        categories: {},
        products: {},
        tags: {},
        media: {},
        reviews: {}
      },
      tenantsArrayField: {
        includeDefaultField: false
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN
    })
  ],
})
