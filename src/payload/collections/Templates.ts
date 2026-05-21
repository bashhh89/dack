import type { CollectionConfig } from 'payload'

import { isAdmin, isAuthenticated } from '../access'

export const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    defaultColumns: ['title', 'templateType', 'status', 'organization'],
    group: 'Templates and Content',
    useAsTitle: 'title',
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: isAuthenticated,
    update: isAdmin,
  },
  versions: true,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'organization', type: 'relationship', relationTo: 'organizations', required: true },
    {
      name: 'templateType',
      type: 'select',
      options: [
        { label: 'Proposal', value: 'proposal' },
        { label: 'Resume', value: 'resume' },
        { label: 'Project Sheet', value: 'project-sheet' },
      ],
      required: true,
    },
    { name: 'agency', type: 'relationship', relationTo: 'agencies' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Approved', value: 'approved' },
        { label: 'Retired', value: 'retired' },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
}
