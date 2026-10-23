import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, ShieldCheck, Check, LoaderCircle, FlaskConical } from 'lucide-react'
import { toast } from 'sonner'
import { Logo } from '../components/layout/Layout'
import { Button } from '../components/ui/button'
import { ThemeToggle } from '../components/ui/common'
import { useAppStore, useProfile } from '../stores/useAppStore'
import { DEMO_EMAIL } from '../services/auth'
const authSchema = z.object({
  name: z.string(),
  email: z.email('Skriv inn en gyldig e-postadresse.'),
  password: z.string().min(8, 'Bruk minst 8 tegn i demopassordet.'),
  confirm: z.string(),
  terms: z.boolean(),
  remember: z.boolean(),
})
type FormData = z.infer<typeof authSchema>
export default function AuthPage({ registerMode = false }: { registerMode?: boolean }) {
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const profile = useProfile()
  const { login, register: registerAccount } = useAppStore()
  const schema = authSchema.superRefine((v, ctx) => {
    if (!registerMode) return
    if (v.name.trim().length < 2 || v.name.length > 80) ctx.addIssue({ code: 'custom', path: ['name'], message: 'Skriv et navn med 2–80 tegn.' })
    if (v.password !== v.confirm) ctx.addIssue({ code: 'custom', path: ['confirm'], message: 'Passordene må være like.' })
    if (!v.terms) ctx.addIssue({ code: 'custom', path: ['terms'], message: 'Bekreft at du forstår hvordan demoen virker.' })
  })
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { name: '', email: '', password: '', confirm: '', terms: false, remember: true } })
  const password = watch('password')
  const destination = typeof location.state?.from === 'string' && location.state.from.startsWith('/courses') ? location.state.from : '/dashboard'
  if (profile) return <Navigate to={destination} replace />
  const onSubmit = async (data: FormData) => {
    setError('')
    try {
      if (registerMode) { registerAccount(data.name.trim(), data.email); toast.success('Demoprofilen din er klar. Velkommen!') } else login(data.email, data.remember)
      navigate(destination, { replace: true })
    } catch (e) { setError((e as Error).message) }
  }
  const field = (name: 'name' | 'email' | 'password' | 'confirm', label: string, placeholder: string) => <div className="form-field"><label htmlFor={name}>{label}</label><div className="input-wrap"><input id={name} {...register(name)} placeholder={placeholder} type={name === 'email' ? 'email' : name === 'password' || name === 'confirm' ? show ? 'text' : 'password' : 'text'} autoComplete={name === 'password' || name === 'confirm' ? 'new-password' : name === 'email' ? 'email' : 'name'} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} />{name === 'password' && <button type="button" aria-label={show ? 'Skjul passord' : 'Vis passord'} onClick={() => setShow(!show)}>{show ? <EyeOff size={17} /> : <Eye size={17} />}</button>}</div>{errors[name] && <p className="field-error" id={`${name}-error`}>{errors[name]?.message}</p>}</div>
  return <div className="auth-page"><div className="auth-header"><Logo /><ThemeToggle /></div><aside className="auth-story"><div className="eyebrow">LITT KUNNSKAP. STØRRE TRYGGHET.</div><h1>Din digitale hverdag<br />fortjener et<br /><span>sterkere forsvar.</span></h1><p>Lær å ta smarte valg på nett. Én liten seier om gangen.</p><div className="auth-shield"><ShieldCheck size={130} strokeWidth={1} /></div><div className="auth-checks"><span><Check size={17} /> Tre praktiske læringsmoduler</span><span><Check size={17} /> Interaktive øvelser og quizer</span><span><Check size={17} /> Din fremgang, i ditt eget tempo</span></div><div className="auth-note">Ingen forkunnskaper. Bare litt nysgjerrighet.</div></aside><main className="auth-main"><div className="auth-form"><span className="form-eyebrow">{registerMode ? 'ET GODT STED Å STARTE' : 'KLAR FOR ET NYTT STEG?'}</span><h2>{registerMode ? 'Din læringsreise starter her.' : 'Hyggelig å se deg igjen.'}</h2><p>{registerMode ? 'Opprett en lokal demoprofil og kom i gang.' : 'Fortsett der du slapp i ditt eget læringsrom.'}</p><div className="demo-notice"><FlaskConical size={19} /><div><strong>Dette er en lokal demo</strong><p>Bruk oppdiktede opplysninger og et demopassord. Passord lagres eller kontrolleres ikke. Alle profiler i denne nettleseren er tilgjengelige uten ekte autentisering.</p></div></div><form onSubmit={handleSubmit(onSubmit)} noValidate>{registerMode && field('name', 'Fullt navn', 'For eksempel Alex Nordmann')}{field('email', 'E-postadresse', 'deg@eksempel.no')}{field('password', 'Demopassord', 'Minst 8 tegn – aldri ditt ekte passord')}{registerMode && password && <div className="password-hint"><div className="strength-bars">{[8, 12, 16].map(n => <span key={n} className={password.length >= n ? 'filled' : ''} />)}</div><small>{password.length < 8 ? 'Bruk minst 8 tegn i demoen' : password.length < 16 ? 'Mer lengde er et godt neste steg' : 'God lengde for en øvelse'}</small></div>}{registerMode && field('confirm', 'Gjenta demopassord', 'Skriv demopassordet en gang til')}<label className="checkbox-label"><input type="checkbox" {...register(registerMode ? 'terms' : 'remember')} /><span>{registerMode ? 'Jeg forstår at data lagres lokalt og at dette ikke er en sikker brukerkonto.' : 'Husk demoøkten i denne nettleseren'}</span></label>{errors.terms && <p className="field-error">{errors.terms.message}</p>}{error && <div role="alert" className="error-banner">{error}</div>}<Button className="w-full" type="submit" disabled={isSubmitting}>{isSubmitting ? <LoaderCircle className="animate-spin" size={18} /> : registerMode ? 'Opprett demoprofil' : 'Logg inn i demoen'}<ArrowRight size={17} /></Button></form><div className="or-divider"><span>eller utforsk først</span></div><Button variant="secondary" className="w-full" onClick={() => { login(DEMO_EMAIL); navigate(destination) }}><FlaskConical size={17} /> Prøv med demoprofil</Button><p className="auth-switch">{registerMode ? 'Har du en lokal profil?' : 'Første gang her?'} <Link to={registerMode ? '/login' : '/register'}>{registerMode ? 'Logg inn' : 'Opprett demoprofil'}</Link></p><Link to="/" className="auth-back">← Tilbake til forsiden</Link></div></main></div>
}
