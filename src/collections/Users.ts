import type { CollectionConfig } from 'payload'

import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields';
import { isSuperAdmin } from '@/lib/access';

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: "tenants",
  tenantsCollectionSlug: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  arrayFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
  tenantFieldAccess: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
})

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: ({ user }) => !isSuperAdmin(user)
  },
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
  },
  auth: true,
  fields: [
    {
      name: "username",
      required: true,
      type: "text",
      unique: true,
      index: true
    },
    {
      name: "phone",
      required: true,
      type: "text",
      unique: true,
      index: true
    },
    {
      admin: {
        position: "sidebar"
      },
      name: "roles",
      type: "select",
      defaultValue: ["user"],
      hasMany: true,
      options: ["super-admin", "user"],
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: "sidebar"
      }
    }
  ],
}
