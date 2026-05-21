import type { CollectionConfig } from 'payload'

import { isAdmin, isAdminOrProposalManager, isAuthenticated } from '../access'

export const AuditEvents: CollectionConfig = {
  slug: 'audit-events',
  admin: {
    defaultColumns: ['eventType', 'actor', 'targetCollection', 'createdAt'],
    group: 'Governance',
    useAsTitle: 'eventType',
  },
  access: {
    create: isAuthenticated,
    delete: isAdmin,
    read: isAdminOrProposalManager,
    update: isAdmin,
  },
  fields: [
    { name: 'eventType', type: 'text', required: true },
    { name: 'organization', type: 'relationship', relationTo: 'organizations' },
    { name: 'actor', type: 'relationship', relationTo: 'users' },
    { name: 'targetCollection', type: 'text' },
    { name: 'targetId', type: 'text' },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'metadata', type: 'json' },
  ],
}
