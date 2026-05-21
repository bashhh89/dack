import type { CollectionConfig } from 'payload'

import { canManagePlatformData, isAdmin, isAuthenticated } from '../access'

export const ContentBlocks: CollectionConfig = {
  slug: 'content-blocks',
  admin: {
    defaultColumns: ['title', 'category', 'status', 'organization'],
    group: 'Templates and Content',
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
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Company Boilerplate', value: 'company-boilerplate' },
        { label: 'Technical Approach', value: 'technical-approach' },
        { label: 'Discipline Section', value: 'discipline-section' },
        { label: 'Cover Letter', value: 'cover-letter' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
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
  ],
}
