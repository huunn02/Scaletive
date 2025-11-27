export interface QuotaState {
  used: number
  limit: number
  resetAt: number
}

const STORAGE_KEY = 'scaletive-quota-v1'

export function loadQuota(limit = 20): QuotaState {
  if (typeof window === 'undefined') {
    return { used: 0, limit, resetAt: endOfDay() }
  }

  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return { used: 0, limit, resetAt: endOfDay() }
  }

  try {
    const parsed = JSON.parse(raw) as QuotaState
    if (Date.now() > parsed.resetAt) {
      return { used: 0, limit, resetAt: endOfDay() }
    }
    return { ...parsed, limit }
  } catch (err) {
    console.warn('Failed to parse quota, resetting', err)
    return { used: 0, limit, resetAt: endOfDay() }
  }
}

export function persistQuota(quota: QuotaState) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quota))
}

export function consumeQuota(current: QuotaState, count = 1): QuotaState {
  const used = Math.min(current.limit, current.used + count)
  const next = { ...current, used }
  persistQuota(next)
  return next
}

export function endOfDay() {
  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)
  return end.getTime()
}
