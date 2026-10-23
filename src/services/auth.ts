import type { Profile } from '../types'
import { emptyProgress } from './progress'
export const DEMO_EMAIL = 'demo@digitalsikkerhet.no'
export function makeProfile(name: string, email: string): Profile {
  return { id: crypto.randomUUID(), name, email: email.trim().toLowerCase(), createdAt: new Date().toISOString(), progress: emptyProgress() }
}
// This simulator deliberately never receives or verifies passwords.
export const findDemoProfile = (profiles: Profile[], email: string) => profiles.find(p => p.email === email.trim().toLowerCase())
