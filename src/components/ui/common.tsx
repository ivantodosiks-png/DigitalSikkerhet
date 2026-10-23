import { Award, Check, Moon, Sun, BookOpen, KeyRound, ScanLine, Fingerprint, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useAppStore } from '../../stores/useAppStore'
import { Button } from './button'
import { cn } from '../../lib/utils'
export const courseIcons = { passord: KeyRound, phishing: ScanLine, personvern: Fingerprint }
export function ProgressBar({ value, label = 'Fremgang' }: { value: number; label?: string }) {
  return <div className="progress-track" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><div style={{ width: `${value}%` }} /></div>
}
export function ThemeToggle() {
  const { preferences, setPreferences } = useAppStore()
  return <Button size="icon" variant="ghost" aria-label={preferences.theme === 'dark' ? 'Bruk lyst tema' : 'Bruk mørkt tema'} onClick={() => setPreferences({ theme: preferences.theme === 'dark' ? 'light' : 'dark' })}>{preferences.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</Button>
}
export function StatCard({ icon, value, label, detail, color = 'violet' }: { icon: ReactNode; value: string | number; label: string; detail: string; color?: string }) {
  return <div className="stat-card"><div className="flex items-center justify-between"><span className={cn('stat-icon', color)}>{icon}</span><ArrowUpRight size={16} className="muted" /></div><strong>{value}</strong><div className="stat-label">{label}</div><p>{detail}</p></div>
}
export function AchievementBadge({ title, description, unlocked }: { title: string; description: string; unlocked: boolean }) {
  return <div className={cn('achievement', unlocked && 'unlocked')}><div className="achievement-medal"><Award size={27} />{unlocked && <Check className="medal-check" size={12} />}</div><div><strong>{title}</strong><p>{description}</p><span>{unlocked ? 'Låst opp' : 'Ikke oppnådd ennå'}</span></div></div>
}
export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="empty-state"><BookOpen size={26} /><strong>{title}</strong><p>{description}</p></div>
}
export function LoadingSkeleton() { return <div aria-label="Laster innhold" role="status" className="page-container"><div className="skeleton h-10 w-1/3 mb-6" /><div className="skeleton h-64" /></div> }
export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1><p>{description}</p></div>{action}</div>
}
