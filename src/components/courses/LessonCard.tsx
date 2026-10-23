import { Check, Circle, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { Lesson } from '../../types'
export function LessonCard({ lesson, index, active, completed, onClick }: { lesson: Lesson; index: number; active: boolean; completed: boolean; onClick: () => void }) {
  return <button className={cn('lesson-card', active && 'active', completed && 'completed')} onClick={onClick} aria-current={active ? 'step' : undefined}><span className="lesson-number">{completed ? <Check size={15} /> : String(index + 1).padStart(2, '0')}</span><span><strong>{lesson.title}</strong><small>{lesson.minutes} min · {completed ? 'Fullført' : 'Leksjon'}</small></span>{active ? <ChevronRight size={15} /> : <Circle size={12} />}</button>
}
