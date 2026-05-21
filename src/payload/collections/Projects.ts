import type { CollectionConfig } from 'payload'

import { canManagePlatformData, isAdmin, isAuthenticated } from '../access'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    defaultColumns: ['name', 'agency', 'projectType', 'websiteStatus'],
    group: 'People and Experience',
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
    { name: 'agency', type: 'relationship', relationTo: 'agencies' },
    { name: 'client', type: 'text' },
    { name: 'projectType', type: 'text' },
    { name: 'budget', type: 'number' },
    { name: 'disciplines', type: 'array', fields: [{ name: 'discipline', type: 'text', required: true }] },
    {
      name: 'websiteStatus',
      type: 'select',
      defaultValue: 'not-reviewed',
      options: [
        { label: 'Not Reviewed', value: 'not-reviewed' },
        { label: 'Ready for Website', value: 'ready' },
        { label: 'On Website', value: 'on-website' },
        { label: 'Needs Update', value: 'needs-update' },
      ],
    },
    { name: 'summary', type: 'textarea' },
  ],
}
