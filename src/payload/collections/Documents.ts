import type { CollectionConfig } from 'payload'

import { canManagePlatformData, canReadFinanceField, isAdmin, isAuthenticated } from '../access'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: {
    defaultColumns: ['title', 'documentType', 'sensitivity', 'proposal', 'updatedAt'],
    group: 'Document Control',
    useAsTitle: 'title',
  },
  access: {
    create: canManagePlatformData,
    delete: isAdmin,
    read: isAuthenticated,
    update: canManagePlatformData,
  },
  upload: true,
  versions: true,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'organization', type: 'relationship', relationTo: 'organizations', required: true },
    { name: 'proposal', type: 'relationship', relationTo: 'proposals' },
    {
      name: 'documentType',
      type: 'select',
      options: [
        { label: 'RFP', value: 'rfp' },
        { label: 'Addendum', value: 'addendum' },
        { label: 'Proposal Draft', value: 'proposal-draft' },
        { label: 'Rate Sheet', value: 'rate-sheet' },
        { label: 'Subconsultant Contract', value: 'subconsultant-contract' },
        { label: 'Certification', value: 'certification' },
        { label: 'Project Sheet', value: 'project-sheet' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'sensitivity',
      type: 'select',
      defaultValue: 'internal',
      options: [
        { label: 'General', value: 'general' },
        { label: 'Internal', value: 'internal' },
        { label: 'Finance Restricted', value: 'finance-restricted' },
        { label: 'Contract Restricted', value: 'contract-restricted' },
      ],
      required: true,
    },
    {
      name: 'restrictedNotes',
      type: 'textarea',
      access: {
        read: canReadFinanceField,
        update: canReadFinanceField,
      },
    },
    { name: 'tags', type: 'array', fields: [{ name: 'tag', type: 'text', required: true }] },
  ],
}
