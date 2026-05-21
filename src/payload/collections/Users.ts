import type { CollectionConfig } from 'payload'

import { canCreateFirstUserOrAdmin, isAdmin, isAuthenticated } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    defaultColumns: ['email', 'name', 'role', 'organization', 'financeAccess'],
    group: 'Platform',
    useAsTitle: 'email',
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: canCreateFirstUserOrAdmin,
    delete: isAdmin,
    read: isAuthenticated,
    update: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data, req }) => {
        if (!req.user && data) {
          return {
            ...data,
            financeAccess: true,
            role: 'admin',
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'viewer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Proposal Manager', value: 'proposal-manager' },
        { label: 'Contributor', value: 'contributor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      required: true,
    },
    {
      name: 'financeAccess',
      type: 'checkbox',
      admin: {
        description: 'Allows viewing finance-sensitive rate fields and financial documents.',
      },
      defaultValue: false,
    },
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
    },
  ],
}
