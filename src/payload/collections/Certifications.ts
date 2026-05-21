import type { CollectionConfig } from 'payload'

import { canManagePlatformData, isAdmin, isAuthenticated } from '../access'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    defaultColumns: ['name', 'certificationType', 'expirationDate', 'status'],
    group: 'Subconsultants',
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
    {
      name: 'certificationType',
      type: 'select',
      options: [
        { label: 'MBE', value: 'mbe' },
        { label: 'WBE', value: 'wbe' },
        { label: 'SDVOB', value: 'sdvob' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
    },
    { name: 'issuer', type: 'text' },
    { name: 'expirationDate', type: 'date' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'current',
      options: [
        { label: 'Current', value: 'current' },
        { label: 'Expiring Soon', value: 'expiring-soon' },
        { label: 'Expired', value: 'expired' },
        { label: 'Needs Verification', value: 'needs-verification' },
      ],
    },
    { name: 'document', type: 'relationship', relationTo: 'documents' },
  ],
}
