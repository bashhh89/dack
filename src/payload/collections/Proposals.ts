import type { CollectionConfig } from 'payload'

import { canManagePlatformData, isAdmin, isAuthenticated } from '../access'

export const Proposals: CollectionConfig = {
  slug: 'proposals',
  admin: {
    defaultColumns: ['title', 'agency', 'pursuitStatus', 'dueDate', 'riskLevel'],
    group: 'Proposal Operations',
    useAsTitle: 'title',
  },
  access: {
    create: canManagePlatformData,
    delete: isAdmin,
    read: isAuthenticated,
    update: canManagePlatformData,
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'organization', type: 'relationship', relationTo: 'organizations', required: true },
    { name: 'agency', type: 'relationship', relationTo: 'agencies' },
    {
      name: 'pursuitStatus',
      type: 'select',
      defaultValue: 'planning',
      options: [
        { label: 'Planning', value: 'planning' },
        { label: 'RFP Intake', value: 'rfp-intake' },
        { label: 'Drafting', value: 'drafting' },
        { label: 'Internal Review', value: 'internal-review' },
        { label: 'Submitted', value: 'submitted' },
        { label: 'Awarded', value: 'awarded' },
        { label: 'Not Selected', value: 'not-selected' },
      ],
      required: true,
    },
    {
      name: 'riskLevel',
      type: 'select',
      defaultValue: 'medium',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
      required: true,
    },
    { name: 'dueDate', type: 'date' },
    { name: 'estimatedValue', type: 'number' },
    { name: 'lead', type: 'relationship', relationTo: 'users' },
    { name: 'summary', type: 'textarea' },
  ],
}
