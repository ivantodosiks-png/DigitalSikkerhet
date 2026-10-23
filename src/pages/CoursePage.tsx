import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Flag, Lightbulb, Clock3, BookOpen, Trophy, ExternalLink } from 'lucide-react'
import { courses } from '../data/courses'
import { useAppStore, useProfile } from '../stores/useAppStore'
import { courseComplete, courseProgress, nextLessonIndex } from '../services/progress'
import { Button } from '../components/ui/button'
import { ProgressBar, courseIcons } from '../components/ui/common'
import { LessonCard } from '../components/courses/LessonCard'
import { PasswordExercise, DecisionExercise } from '../components/courses/Exercises'
import NotFoundPage from './NotFoundPage'
export default function CoursePage() {
  const { courseId } = useParams()
  const [params, setParams] = useSearchParams()
  const course = courses.find(c => c.id === courseId)
  const profile = useProfile()!
  const complete = useAppStore(s => s.completeLesson)
  if (!course) return <NotFoundPage />
  const parsed = Number(params.get('lesson'))
  const index = params.has('lesson') && Number.isInteger(parsed) && parsed >= 0 && parsed < course.lessons.length ? parsed : nextLessonIndex(profile.progress, course)
  const lesson = course.lessons[index]
  const completed = !!profile.progress.lessons[lesson.id]
  const allRead = course.lessons.every(l => profile.progress.lessons[l.id])
  const done = courseComplete(profile.progress, course)
  const Icon = courseIcons[course.id]
  const select = (i: number) => { setParams({ lesson: String(i) }); window.scrollTo({ top: 0, behavior: 'instant' }) }
  return <><Link to="/courses" className="back-link"><ArrowLeft size={15} /> Tilbake til kurs</Link><div className="course-page-title"><span className={`icon-tile ${course.color}`}><Icon /></span><div><div className="eyebrow">LÆRINGSMODUL · NYBEGYNNER</div><h1>{course.title}</h1></div></div><div className="learning-layout"><aside className="lesson-sidebar"><div className="lesson-sidebar-heading"><h3>Din læringssti</h3><span>{courseProgress(profile.progress, course)} %</span></div><ProgressBar value={courseProgress(profile.progress, course)} /><div className="lesson-list">{course.lessons.map((l, i) => <LessonCard key={l.id} lesson={l} index={i} completed={!!profile.progress.lessons[l.id]} active={index === i} onClick={() => select(i)} />)}</div><Link to={`/courses/${course.id}/quiz`} className="lesson-quiz-link"><Flag size={18} /><span>Test det du har lært<small>6 spørsmål · 70 % for å bestå</small></span><ArrowRight size={16} /></Link><div className="objectives"><h4>Etter kurset kan du</h4>{course.objectives.map(o => <p key={o}><Check size={14} />{o}</p>)}</div></aside><article className="lesson-content" key={lesson.id}>{done && <div className="course-complete-banner"><Trophy size={26} /><div><strong>Du har fullført kurset!</strong><p>Merket ditt er låst opp. Du kan alltid komme tilbake og repetere.</p></div><Link to="/profile">Se merket <ArrowRight size={16} /></Link></div>}<div className="lesson-meta"><span>LEKSJON {index + 1} AV {course.lessons.length}</span><span><Clock3 size={14} /> {lesson.minutes} min lesing</span></div><h2>{lesson.title}</h2><p className="lesson-intro">{lesson.intro}</p><div className="lesson-divider" />{lesson.sections.map(s => <section className="reading-section" key={s.title}><h3>{s.title}</h3><p>{s.text}</p></section>)}{lesson.exercise === 'password' && <PasswordExercise />}{lesson.exercise === 'phishing' && <DecisionExercise kind="phishing" />}{lesson.exercise === 'privacy' && <DecisionExercise kind="privacy" />}<div className="takeaway"><Lightbulb size={22} /><div><strong>Ta med deg dette</strong><p>{lesson.takeaway}</p></div></div><a className="source-link" href={course.source.url} target="_blank" rel="noreferrer"><BookOpen size={14} /> Les mer: {course.source.title}<ExternalLink size={12} /></a><div className="lesson-completion"><div><span className="xp-label">+30 XP</span><p>{completed ? 'Denne leksjonen er lagret som fullført.' : 'Ferdig med lesingen? Ta vare på fremgangen din.'}</p></div><Button onClick={() => complete(lesson.id)} disabled={completed}>{completed ? <><CheckCircle2 size={17} /> Fullført</> : <><Check size={17} /> Marker som fullført</>}</Button></div>{allRead && !done && <div className="quiz-ready"><Trophy size={22} /><div><strong>Alle leksjonene er fullført!</strong><p>Nå er du klar til å teste kunnskapen din.</p></div><Button asChild size="sm"><Link to={`/courses/${course.id}/quiz`}>Ta quizen <ArrowRight size={16} /></Link></Button></div>}<nav className="lesson-navigation" aria-label="Bla mellom leksjoner"><Button variant="ghost" disabled={index === 0} onClick={() => select(index - 1)}><ArrowLeft size={16} /> Forrige leksjon</Button>{index < course.lessons.length - 1 ? <Button variant="secondary" onClick={() => select(index + 1)}>Neste leksjon <ArrowRight size={16} /></Button> : <Button asChild variant="secondary"><Link to={`/courses/${course.id}/quiz`}>Gå til quizen <ArrowRight size={16} /></Link></Button>}</nav></article></div></>
}
