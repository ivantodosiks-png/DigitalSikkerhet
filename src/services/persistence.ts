import { z } from 'zod'
import type { Snapshot } from '../types'

export const STORAGE_KEY = 'digital-sikkerhet:v1'
const SESSION_KEY = 'digital-sikkerhet:session:v1'
const date = z.string().datetime()
const schema = z.object({
  version: z.literal(1),
  profiles: z.array(z.object({
    id: z.string(), name: z.string().min(1).max(80), email: z.email(),
    createdAt: date,
    progress: z.object({
      lessons: z.record(z.string(), date),
      attempts: z.array(z.object({ id: z.string(), courseId: z.enum(['passord', 'phishing', 'personvern']), answers: z.array(z.number().int().min(0).max(3)).length(6), at: date })),
    }),
  })),
  sessionId: z.string().nullable(),
  preferences: z.object({ theme: z.enum(['dark', 'light']), reducedMotion: z.boolean(), notifications: z.boolean() }),
})
export const defaults = (): Snapshot => ({
  version: 1, profiles: [], sessionId: null,
  preferences: { theme: 'dark', reducedMotion: false, notifications: true },
})
export interface DataRepository {
  load(): Snapshot
  save(data: Snapshot): boolean
  setSession(id: string | null, remember: boolean): boolean
  clear(): boolean
}
let storageWarning = ''
export const getStorageWarning = () => storageWarning
export const localRepository: DataRepository = {
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const data = raw ? schema.parse(JSON.parse(raw)) : defaults()
      data.sessionId = data.sessionId ?? sessionStorage.getItem(SESSION_KEY)
      if (!data.profiles.some(p => p.id === data.sessionId)) data.sessionId = null
      return data
    } catch {
      storageWarning = 'Lagrede demodata kunne ikke leses. Du kan fortsette med en ny lokal økt.'
      return defaults()
    }
  },
  save(data) {
    try {
      const persisted = schema.parse(data)
      if (sessionStorage.getItem(SESSION_KEY) === persisted.sessionId) persisted.sessionId = null
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted))
      return true
    } catch { storageWarning = 'Nettleseren kunne ikke lagre endringene. Fremgangen beholdes bare i denne økten.'; return false }
  },
  setSession(id, remember) {
    try {
      sessionStorage.removeItem(SESSION_KEY)
      if (id && !remember) sessionStorage.setItem(SESSION_KEY, id)
      return true
    } catch { return false }
  },
  clear() {
    try { localStorage.removeItem(STORAGE_KEY); sessionStorage.removeItem(SESSION_KEY); return true } catch { return false }
  },
}
