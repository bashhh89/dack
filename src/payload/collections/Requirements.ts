import type { CollectionConfig } from 'payload'

import { canManagePlatformData, isAdmin, isAuthenticated } from '../access'

export const Requirements: CollectionConfig = {
  slug: 'requirements',
  admin: {
    defaultColumns: ['title', 'rfp', 'category', 'evidenceState', 'reviewStatus'],
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
    { name: 'rfp', type: 'relationship', relationTo: 'rfps', required: true },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Scope', value: 'scope' },
        { label: 'Submission', value: 'submission' },
        { label: 'Evaluation', value: 'evaluation' },
        { label: 'Form', value: 'form' },
        { label: 'Timeline', value: 'timeline' },
        { label: 'Compliance', value: 'compliance' },
      ],
      required: true,
    },
    {
      name: 'evidenceState',
      type: 'select',
      defaultValue: 'partial',
      options: [
        { label: 'Strong Evidence', value: 'strong' },
        { label: 'Partial Evidence', value: 'partial' },
        { label: 'No Evidence', value: 'none' },
      ],
      required: true,
    },
    {
      name: 'reviewStatus',
      type: 'select',
      defaultValue: 'needs-review',
      options: [
        { label: 'Needs Review', value: 'needs-review' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Rejected', value: 'rejected' },
      ],
      required: true,
    },
    { name: 'sourceCitation', type: 'textarea' },
    { name: 'notes', type: 'textarea' },
  ],
}
