import type { Access, FieldAccess } from 'payload'

export type DackRole = 'admin' | 'proposal-manager' | 'contributor' | 'viewer'

type DackUser = {
  financeAccess?: boolean
  role?: DackRole
}

const getUser = (user: unknown): DackUser | null => {
  if (!user || typeof user !== 'object') {
    return null
  }

  return user as DackUser
}

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => getUser(user)?.role === 'admin'

export const isAdminOrProposalManager: Access = ({ req: { user } }) => {
  const role = getUser(user)?.role
  return role === 'admin' || role === 'proposal-manager'
}

export const canManagePlatformData: Access = ({ req: { user } }) => {
  const role = getUser(user)?.role
  return role === 'admin' || role === 'proposal-manager' || role === 'contributor'
}

export const canReadFinance: Access = ({ req: { user } }) => {
  const dackUser = getUser(user)
  return dackUser?.role === 'admin' || dackUser?.financeAccess === true
}

export const canReadFinanceField: FieldAccess = ({ req: { user } }) => {
  const dackUser = getUser(user)
  return dackUser?.role === 'admin' || dackUser?.financeAccess === true
}

export const canCreateFirstUserOrAdmin: Access = ({ req: { user } }) => {
  if (!user) {
    return true
  }

  return getUser(user)?.role === 'admin'
}
