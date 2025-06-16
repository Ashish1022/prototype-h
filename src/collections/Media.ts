import { isSuperAdmin } from '@/lib/access';
import { Tenant } from '@/payload-types';
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;

      if (req.user) {
        const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
        return Boolean(tenant?.subscription?.subscriptionDetailsSubmitted);
      }

      return false;
    },
    read: () => true,
    delete: () => true,
  },
  admin: {
    description: "Upload and manage media files. Supported formats: images, videos, documents.",
    useAsTitle: 'filename',
    hidden: ({ user }) => !isSuperAdmin(user)
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Alternative text for accessibility and SEO. Describe what the image shows.'
      },
      validate: (value?: string | null) => {
        if (!value || value.length < 3) {
          return 'Alt text must be at least 3 characters long';
        }
        if (value.length > 200) {
          return 'Alt text must be less than 200 characters';
        }
        return true;
      }
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Product Images', value: 'product' },
        { label: 'Category Images', value: 'category' },
        { label: 'Marketing', value: 'marketing' },
        { label: 'Blog Content', value: 'blog' },
        { label: 'User Uploads', value: 'user' },
        { label: 'System', value: 'system' },
        { label: 'Other', value: 'other' }
      ],
      defaultValue: 'other',
      admin: {
        description: 'Categorize your media for better organization',
        position: 'sidebar'
      }
    },
  ],
  upload: true,
}
