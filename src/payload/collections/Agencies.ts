import type { CollectionConfig } from 'payload'

import { canManagePlatformData, isAdmin, isAuthenticated } from '../access'

export const Agencies: CollectionConfig = {
  slug: 'agencies',
  admin: {
    defaultColumns: ['name', 'agencyCode', 'organization'],
    group: 'Business Intelligence',
    useAsTitle: 'name',
  },
  access: {
    create: canManagePlatformData,
    delete: isAdmin,
    read: isAuthenticated,
    update: canManagePlatformData,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'agencyCode', type: 'text', required: true },
    { name: 'organization', type: 'relationship', relationTo: 'organizations', required: true },
    {
      name: 'recurringRequirements',
      type: 'array',
      fields: [{ name: 'requirement', type: 'text', required: true }],
    },
    {
      name: 'strategyNotes',
      type: 'textarea',
    },
  ],
}
