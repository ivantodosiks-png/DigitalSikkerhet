import { useState } from 'react'
import { FlaskConical, CheckCircle2, AlertTriangle, Mail, Eye, EyeOff } from 'lucide-react'
import { Button } from '../ui/button'
import { ProgressBar } from '../ui/common'
import { cn } from '../../lib/utils'
export function PasswordExercise() {
  const [value, setValue] = useState('')
  const [show, setShow] = useState(false)
  const predictable = /passord|password|qwerty|12345|sommer|alex/i.test(value) || /^(.)\1+$/.test(value)
  const score = !value ? 0 : predictable ? 20 : value.length >= 20 ? 100 : value.length >= 16 ? 80 : value.length >= 12 ? 55 : 25
  return <div className="exercise"><div className="exercise-label"><FlaskConical size={17} /> PRØV SELV</div><h3>Hva gjør lengde med et passord?</h3><p>Skriv et oppdiktet eksempel. Ikke bruk et ekte passord.</p><label htmlFor="practice-password" className="sr-only">Eksempelpassord</label><div className="input-wrap"><input id="practice-password" type={show ? 'text' : 'password'} value={value} onChange={e => setValue(e.target.value)} autoComplete="off" maxLength={120} placeholder="Et oppdiktet passord …" /><button aria-label={show ? 'Skjul eksempel' : 'Vis eksempel'} onClick={() => setShow(!show)}>{show ? <EyeOff size={17} /> : <Eye size={17} />}</button></div><div className="strength-result" aria-live="polite"><ProgressBar value={score} label="Pedagogisk passordindikator" /><strong>{!value ? 'Prøv en kort og en lang variant' : predictable ? 'Et lett gjenkjennelig mønster' : score >= 80 ? 'God lengde – er det også unikt og uforutsigbart?' : 'Prøv å legge til flere tilfeldige ord'}</strong><span>{value.length} tegn</span></div><small>Forenklet læringsøvelse, ingen sikkerhetsgaranti. Eksemplet behandles bare her i nettleseren, sendes ikke og lagres ikke. Måleren sjekker ikke datalekkasjer.</small></div>
}
const scenarios = {
  phishing: [
    { title: 'En pakke venter på deg', text: 'Fra: Nordpakke Kundeservice <pakke@nordpakke-gebyr.example>\n«Levering stoppet. Betal 19 kr innen 30 minutter på nordpakke-gebyr.example, ellers returneres pakken.»', options: ['Betal det lille beløpet', 'Sjekk leveringen i den kjente pakkeappen'], correct: 1, explanation: 'Tidspress, uventet betaling og en ukjent adresse er faresignaler. Sjekk i appen du allerede bruker. Eksemplet og avsenderen er oppdiktet.' },
    { title: 'En viktig beskjed fra en venn', text: '«Hei! Har mistet mobilen. Kan du sende koden du nettopp fikk på SMS? Haster!»', options: ['Ikke del koden; kontakt vennen på en kjent måte', 'Send koden fordi dere er venner'], correct: 0, explanation: 'Engangskoder er personlige. En venns konto kan være overtatt. Bekreft situasjonen gjennom en annen kjent kanal.' },
    { title: 'Ny melding i skoleappen', text: 'Du åpner selv skolens vanlige app. Der står det at morgendagens time starter klokken 09. Ingen ber om betaling, passord eller nedlasting.', options: ['Dette er garantert svindel', 'Det er ingen tydelige svindeltegn i dette eksemplet'], correct: 1, explanation: 'Du åpnet en kjent kanal selv, og beskjeden ber ikke om en risikabel handling. Det er en annen situasjon enn en uventet innloggingslenke. Vurder alltid sammenhengen.' },
  ],
  privacy: [
    { title: 'Et bilde fra vennekvelden', text: 'Du har tatt et morsomt bilde. En venn i bakgrunnen sier at hen ikke vil være med på innlegget.', options: ['Del likevel, kontoen din er privat', 'La være å dele bildet, eller fjern vennen fra bildet med tillatelse'], correct: 1, explanation: 'Respekter vennens grense. En privat profil hindrer ikke videre deling og erstatter ikke tillatelse.' },
    { title: 'Hvor er du akkurat nå?', text: 'En ny app foreslår å dele den nøyaktige posisjonen din offentlig hele tiden.', options: ['Avslå og vurder om begrenset deling er nødvendig', 'Godta, det er sikkert en nyttig standard'], correct: 0, explanation: 'Kontinuerlig offentlig posisjon kan avsløre hverdagsrutiner. Begrens publikum og tidsrom hvis du trenger å dele.' },
    { title: 'Tilgang til alt?', text: 'Et enkelt puslespill ber om mikrofon, kontakter og posisjon selv når appen er lukket.', options: ['Gi tilgang for sikkerhets skyld', 'Avslå unødvendige tilganger og vurder en annen app'], correct: 1, explanation: 'Tillatelser bør ha en tydelig sammenheng med funksjonen. Du kan avslå og senere kontrollere tillatelser i enhetens innstillinger.' },
  ],
}
export function DecisionExercise({ kind }: { kind: 'phishing' | 'privacy' }) {
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const item = scenarios[kind][index]
  const correct = answer === item.correct
  return <div className="exercise"><div className="exercise-label"><FlaskConical size={17} /> PRØV SELV · {index + 1} AV 3</div><h3>{kind === 'phishing' ? 'Er dette svindel?' : 'Hva ville du delt?'}</h3><div className="fictional-message"><div><Mail size={17} /><strong>{item.title}</strong></div><p>{item.text}</p><small>Oppdiktet situasjon for læring</small></div><div className="decision-options">{item.options.map((option, i) => <button key={option} disabled={answer !== null} onClick={() => setAnswer(i)} className={cn(answer === i && (correct ? 'correct' : 'incorrect'))}>{option}</button>)}</div>{answer !== null && <div className={cn('feedback', correct ? 'correct' : 'incorrect')} role="status">{correct ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}<div><strong>{correct ? 'Et godt valg!' : 'Her finnes et tryggere valg.'}</strong><p>{item.explanation}</p><Button size="sm" variant="secondary" onClick={() => { setIndex((index + 1) % 3); setAnswer(null) }}>{index === 2 ? 'Prøv øvelsene igjen' : 'Neste situasjon'}</Button></div></div>}</div>
}
