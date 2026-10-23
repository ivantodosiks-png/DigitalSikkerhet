import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, Clock3, CheckCircle2 } from 'lucide-react'
import type { Course, Progress } from '../../types'
import { courseComplete, courseProgress } from '../../services/progress'
import { ProgressBar, courseIcons } from '../ui/common'
export function CourseCard({ course, progress, index = 0, publicView = false }: { course: Course; progress: Progress; index?: number; publicView?: boolean }) {
  const Icon = courseIcons[course.id]
  const percent = courseProgress(progress, course)
  const done = courseComplete(progress, course)
  return <article className={`course-card ${course.color}`}><div className="course-art"><div className="art-grid" /><span className="module-tag">MODUL 0{index + 1}</span><div className="course-orbit orbit-one" /><div className="course-orbit orbit-two" /><div className="course-art-icon"><Icon size={44} strokeWidth={1.4} /></div><span className="art-spark spark-one">+</span><span className="art-spark spark-two">+</span><span className="course-level">Nybegynner</span></div><div className="course-card-body"><div className="course-category">{course.category}</div><h3>{course.shortTitle}</h3><p>{course.description}</p><div className="course-meta"><span><BookOpen size={14} /> {course.lessons.length} leksjoner</span><span><Clock3 size={14} /> ca. {course.minutes} min</span></div>{!publicView && <div className="course-progress"><div><span>{done ? 'Fullført' : percent ? 'Godt i gang' : 'Klar når du er'}</span><span>{percent}%</span></div><ProgressBar value={percent} label={`Fremgang: ${course.title}`} /></div>}<Link className="course-action" to={`/courses/${course.id}`}><span>{done ? 'Se kurset igjen' : percent ? 'Fortsett kurset' : 'Utforsk kurset'}</span>{done ? <CheckCircle2 size={18} /> : <ArrowUpRight size={19} />}</Link></div></article>
}
