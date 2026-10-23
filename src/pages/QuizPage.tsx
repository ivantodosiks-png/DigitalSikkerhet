import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Flag, ShieldCheck } from 'lucide-react'
import { courses } from '../data/courses'
import { questions } from '../data/questions'
import { useAppStore, useProfile } from '../stores/useAppStore'
import { courseComplete } from '../services/progress'
import { ProgressBar } from '../components/ui/common'
import { Button } from '../components/ui/button'
import { QuizQuestion } from '../components/quiz/QuizQuestion'
import { QuizResults } from '../components/quiz/QuizResults'
import NotFoundPage from './NotFoundPage'
export default function QuizPage() {
  const { courseId } = useParams()
  const course = courses.find(c => c.id === courseId)
  return course ? <QuizSession key={course.id} course={course} /> : <NotFoundPage />
}
function QuizSession({ course }: { course: typeof courses[number] }) {
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [finished, setFinished] = useState(false)
  const [index, setIndex] = useState(0)
  const profile = useProfile()!
  const submit = useAppStore(s => s.submitQuiz)
  const qs = questions[course.id]
  const correct = answers.filter((a, i) => a === qs[i].correct).length
  const advance = () => {
    if (!answered || answers.length !== index + 1) return
    if (index === qs.length - 1) { submit(course.id, answers); setFinished(true) }
    else { setIndex(index + 1); setSelected(null); setAnswered(false) }
  }
  return <div className="quiz-page"><Link to={`/courses/${course.id}`} className="back-link"><ArrowLeft size={15} /> Tilbake til kurset</Link>{finished ? <QuizResults course={course} score={Math.round(correct / qs.length * 100)} correct={correct} count={qs.length} completed={courseComplete(profile.progress, course)} onRetry={() => { setAnswers([]); setIndex(0); setSelected(null); setAnswered(false); setFinished(false) }} /> : <><div className="quiz-heading"><span className="icon-tile violet"><Flag /></span><div className="eyebrow">TEST DET DU HAR LÆRT</div><h1>{course.shortTitle}</h1><p>Seks spørsmål. Ta deg tid – dette handler om å lære.</p></div><section className="quiz-panel"><div className="quiz-progress-label"><span>Spørsmål {index + 1} av {qs.length}</span><span>{Math.round(answers.length / qs.length * 100)} % besvart</span></div><ProgressBar value={answers.length / qs.length * 100} label="Besvarte quizspørsmål" /><div key={index} className="quiz-question"><QuizQuestion question={qs[index]} selected={selected} answered={answered} onSelect={setSelected} /></div><div className="quiz-bottom"><span><ShieldCheck size={15} /> Minst 70 % for å bestå</span>{answered ? <Button onClick={advance}>{index === qs.length - 1 ? 'Se resultatet' : 'Neste spørsmål'}<ArrowRight size={16} /></Button> : <Button disabled={selected === null} onClick={() => { if (selected !== null && !answered) { setAnswers([...answers, selected]); setAnswered(true) } }}>Sjekk svaret <ArrowRight size={16} /></Button>}</div></section><p className="quiz-footnote">Resultatet lagres når du fullfører hele quizen. Et avbrutt forsøk gir ikke poeng.</p></>}</div>
}
