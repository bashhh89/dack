import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrProposalManager, isAuthenticated } from '../access'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  admin: {
    defaultColumns: ['name', 'status', 'tenantKey'],
    group: 'Platform',
    useAsTitle: 'name',
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: isAuthenticated,
    update: isAdminOrProposalManager,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'tenantKey', type: 'text', required: true, unique: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Implementation', value: 'implementation' },
        { label: 'Archived', value: 'archived' },
      ],
      required: true,
    },
  ],
}
