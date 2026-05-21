import type { CollectionConfig } from 'payload'

import { canReadFinance, isAdmin } from '../access'

export const Rates: CollectionConfig = {
  slug: 'rates',
  admin: {
    defaultColumns: ['title', 'firm', 'agency', 'loadedRate', 'expirationDate'],
    group: 'Finance',
    useAsTitle: 'title',
  },
  access: {
    create: canReadFinance,
    delete: isAdmin,
    read: canReadFinance,
    update: canReadFinance,
  },
  versions: true,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'organization', type: 'relationship', relationTo: 'organizations', required: true },
    { name: 'firm', type: 'text', required: true },
    { name: 'agency', type: 'relationship', relationTo: 'agencies' },
    { name: 'bareRate', type: 'number', required: true },
    { name: 'multiplier', type: 'number' },
    { name: 'loadedRate', type: 'number', required: true },
    { name: 'effectiveDate', type: 'date' },
    { name: 'expirationDate', type: 'date' },
    { name: 'contractReference', type: 'text' },
  ],
}
