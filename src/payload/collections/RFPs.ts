import type { CollectionConfig } from 'payload'

import { canManagePlatformData, isAdmin, isAuthenticated } from '../access'

export const RFPs: CollectionConfig = {
  slug: 'rfps',
  admin: {
    defaultColumns: ['title', 'proposal', 'reviewStatus', 'dueDate'],
    group: 'RFP Intelligence',
    useAsTitle: 'title',
  },
  access: {
    create: canManagePlatformData,
    delete: isAdmin,
    read: isAuthenticated,
    update: canManagePlatformData,
  },
  versions: true,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'organization', type: 'relationship', relationTo: 'organizations', required: true },
    { name: 'proposal', type: 'relationship', relationTo: 'proposals' },
    { name: 'sourceDocument', type: 'relationship', relationTo: 'documents' },
    { name: 'dueDate', type: 'date' },
    { name: 'questionDeadline', type: 'date' },
    {
      name: 'reviewStatus',
      type: 'select',
      defaultValue: 'uploaded',
      options: [
        { label: 'Uploaded', value: 'uploaded' },
        { label: 'Extracting', value: 'extracting' },
        { label: 'Needs Human Review', value: 'needs-human-review' },
        { label: 'Confirmed', value: 'confirmed' },
      ],
      required: true,
    },
    { name: 'extractedSummary', type: 'textarea' },
  ],
}
