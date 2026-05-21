import type { CollectionConfig } from 'payload'

import { canManagePlatformData, isAdmin, isAuthenticated } from '../access'

export const Staff: CollectionConfig = {
  slug: 'staff',
  admin: {
    defaultColumns: ['name', 'role', 'availability', 'organization'],
    group: 'People and Experience',
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
    { name: 'organization', type: 'relationship', relationTo: 'organizations', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'yearsExperience', type: 'number' },
    {
      name: 'availability',
      type: 'select',
      defaultValue: 'available',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Limited', value: 'limited' },
        { label: 'Needs Confirmation', value: 'needs-confirmation' },
      ],
    },
    { name: 'certifications', type: 'relationship', relationTo: 'certifications', hasMany: true },
    { name: 'projectHistory', type: 'relationship', relationTo: 'projects', hasMany: true },
  ],
}
