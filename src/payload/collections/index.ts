import type { CollectionConfig } from 'payload'

import { Agencies } from './Agencies'
import { AuditEvents } from './AuditEvents'
import { Certifications } from './Certifications'
import { ContentBlocks } from './ContentBlocks'
import { Documents } from './Documents'
import { Organizations } from './Organizations'
import { Projects } from './Projects'
import { Proposals } from './Proposals'
import { Rates } from './Rates'
import { Requirements } from './Requirements'
import { RFPs } from './RFPs'
import { Staff } from './Staff'
import { Subconsultants } from './Subconsultants'
import { Templates } from './Templates'
import { Users } from './Users'

export const collections: CollectionConfig[] = [
  Users,
  Organizations,
  Agencies,
  Proposals,
  RFPs,
  Requirements,
  Documents,
  Staff,
  Projects,
  Rates,
  Subconsultants,
  Certifications,
  ContentBlocks,
  Templates,
  AuditEvents,
]
