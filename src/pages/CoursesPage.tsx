import { useState } from 'react'
import { Search, BookOpen } from 'lucide-react'
import { courses } from '../data/courses'
import { useProfile } from '../stores/useAppStore'
import { emptyProgress, courseComplete, courseProgress } from '../services/progress'
import { CourseCard } from '../components/courses/CourseCard'
import { EmptyState, PageHeader } from '../components/ui/common'
import { cn } from '../lib/utils'
export default function CoursesPage() {
  const progress = useProfile()?.progress ?? emptyProgress()
  const [filter, setFilter] = useState('Alle kurs')
  const [query, setQuery] = useState('')
  const filtered = courses.filter(c => `${c.title} ${c.description}`.toLocaleLowerCase('nb').includes(query.toLocaleLowerCase('nb')) && (filter === 'Alle kurs' || (filter === 'Fullført' ? courseComplete(progress, c) : courseProgress(progress, c) > 0 && !courseComplete(progress, c))))
  return <><PageHeader eyebrow="KUNNSKAP ER DITT BESTE FORSVAR" title="Finn din neste superkraft." description="Tre praktiske kurs. Gode vaner du kan ta med deg videre." /><div className="courses-intro"><span className="icon-tile violet"><BookOpen /></span><div><h3>Din læringsreise, ditt tempo</h3><p>Hvert kurs inneholder tre leksjoner, en praktisk øvelse og en quiz. Begynn der du er nysgjerrig.</p></div><span className="tag">9 leksjoner · 48 minutter</span></div><div className="course-toolbar"><div className="tabs" aria-label="Filtrer kurs">{['Alle kurs', 'Påbegynt', 'Fullført'].map(f => <button key={f} className={cn(filter === f && 'selected')} aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}{f === 'Alle kurs' && <span>3</span>}</button>)}</div><label className="search-input"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Søk i kursene …" aria-label="Søk i kursene" /></label></div>{filtered.length ? <div className="course-grid">{filtered.map(c => <CourseCard key={c.id} course={c} progress={progress} index={courses.indexOf(c)} />)}</div> : <EmptyState title="Ingen kurs her ennå" description="Prøv et annet søk eller velg «Alle kurs»." />}<div className="course-endnote"><ShieldCheckIcon /> Litt kunnskap kan gjøre en stor forskjell. Du er på rett vei.</div></>
}
function ShieldCheckIcon() { return <BookOpen size={17} /> }
