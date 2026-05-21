import type { CollectionConfig } from 'payload'

import { canManagePlatformData, isAdmin, isAuthenticated } from '../access'

export const Subconsultants: CollectionConfig = {
  slug: 'subconsultants',
  admin: {
    defaultColumns: ['name', 'status', 'organization'],
    group: 'Subconsultants',
    useAsTitle: 'name',
  },
  access: {
    create: canManagePlatformData,
    delete: isAdmin,
    read: isAuthenticated,
    update: canManagePlatformData,
  },
  versions: true,
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'organization', type: 'relationship', relationTo: 'organizations', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Needs Review', value: 'needs-review' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    { name: 'capabilities', type: 'array', fields: [{ name: 'capability', type: 'text', required: true }] },
    { name: 'disciplines', type: 'array', fields: [{ name: 'discipline', type: 'text', required: true }] },
    { name: 'certifications', type: 'relationship', relationTo: 'certifications', hasMany: true },
    { name: 'contractDocuments', type: 'relationship', relationTo: 'documents', hasMany: true },
    { name: 'notes', type: 'textarea' },
  ],
}
