import { useState } from 'react'
import { Link, NavLink, Outlet, Navigate, useLocation } from 'react-router-dom'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as Dialog from '@radix-ui/react-dialog'
import { ShieldCheck, LayoutDashboard, BookOpen, UserRound, Settings, LogOut, ChevronDown, Menu, X, ArrowUpRight, Sparkles, CircleHelp } from 'lucide-react'
import { motion } from 'motion/react'
import { useAppStore, useProfile } from '../../stores/useAppStore'
import { initials, cn } from '../../lib/utils'
import { totalXP } from '../../services/progress'
import { Button } from '../ui/button'
import { ProgressBar, ThemeToggle } from '../ui/common'
import { useMobile } from '../../hooks/useMobile'

export function Logo({ compact = false }: { compact?: boolean }) {
  return <Link to="/" className="logo" aria-label="Digital Sikkerhet – forsiden"><span className="logo-mark"><ShieldCheck size={23} strokeWidth={1.8} /></span>{!compact && <span>Digital<span className="logo-light">Sikkerhet<span className="logo-dot">.</span></span></span>}</Link>
}
export function Navbar() {
  const [open, setOpen] = useState(false)
  const profile = useProfile()
  return <header className="public-header"><div className="public-nav"><Logo /><nav className={cn('public-links', open && 'is-open')} aria-label="Hovedmeny"><a href="/#kurs" onClick={() => setOpen(false)}>Våre kurs</a><a href="/#slik-fungerer-det" onClick={() => setOpen(false)}>Slik fungerer det</a><a href="/#sporsmal" onClick={() => setOpen(false)}>Spørsmål og svar</a></nav><div className="nav-actions"><ThemeToggle /><Link className="login-link" to={profile ? '/dashboard' : '/login'}>{profile ? 'Mitt læringsrom' : 'Logg inn'}</Link><Button asChild size="sm"><Link to={profile ? '/dashboard' : '/register'}>Kom i gang <ArrowUpRight size={15} /></Link></Button><Button variant="ghost" size="icon" className="mobile-toggle" aria-label="Åpne navigasjon" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></div></div></header>
}
export function Footer() {
  return <footer className="footer"><div><Logo /><p>Litt mer kunnskap. En tryggere digital hverdag.</p></div><div><a href="/#kurs">Utforsk kurs</a><a href="/#sporsmal">Spørsmål og svar</a><span>En lokal læringsdemo · Norsk bokmål</span></div><span className="footer-bottom">Laget for nysgjerrige mennesker. Ingen forkunnskaper nødvendig.</span></footer>
}
export function ProfileDropdown() {
  const profile = useProfile()!
  const logout = useAppStore(s => s.logout)
  return <DropdownMenu.Root><DropdownMenu.Trigger className="profile-trigger"><span className="avatar">{initials(profile.name)}</span><span className="profile-trigger-name">{profile.name}<small>Demoprofil</small></span><ChevronDown size={15} /></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="dropdown-content" sideOffset={8} align="end"><DropdownMenu.Item asChild><Link to="/profile"><UserRound size={16} /> Min profil</Link></DropdownMenu.Item><DropdownMenu.Item asChild><Link to="/settings"><Settings size={16} /> Innstillinger</Link></DropdownMenu.Item><DropdownMenu.Separator className="dropdown-separator" /><DropdownMenu.Item onSelect={logout}><LogOut size={16} /> Logg ut</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>
}
const navItems = [
  { to: '/dashboard', label: 'Oversikt', icon: LayoutDashboard },
  { to: '/courses', label: 'Mine kurs', icon: BookOpen },
  { to: '/profile', label: 'Min profil', icon: UserRound },
  { to: '/settings', label: 'Innstillinger', icon: Settings },
]
export function Sidebar({ open, close }: { open: boolean; close: () => void }) {
  const profile = useProfile()!
  const xp = totalXP(profile.progress)
  const mobile = useMobile()
  const content = <>
    <div className="sidebar-brand"><Logo /><Button className="mobile-toggle" variant="ghost" size="icon" onClick={close} aria-label="Lukk meny"><X /></Button></div>
    <div className="workspace-label"><span className="workspace-icon">DS</span><div>Ditt læringsrom<small>Personlig arbeidsområde</small></div><span className="tiny-dot" /></div>
    <div className="nav-section-label">LÆR OG UTFORSK</div>
    <nav aria-label="Læringsmeny">{navItems.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} onClick={close} className={({ isActive }) => cn('sidebar-link', isActive && 'active')}><Icon size={19} /><span>{label}</span>{to === '/courses' && <span className="nav-count">3</span>}</NavLink>)}</nav>
    <div className="sidebar-bottom"><div className="level-box"><div><span className="level-star"><Sparkles size={18} /></span><strong>Nivå {Math.floor(xp / 150) + 1}</strong><span>{xp} XP</span></div><ProgressBar value={(xp % 150) / 150 * 100} label="Fremgang til neste nivå" /><p>{150 - xp % 150} XP til neste nivå</p></div><Link className="help-link" to="/#sporsmal" onClick={close}><CircleHelp size={17} /> Litt hjelp på veien <ArrowUpRight size={15} /></Link><div className="sidebar-note"><span className="tiny-dot" /> Lokal demo · Din egen læringsreise</div></div>
  </>
  if (!mobile) return <aside className="sidebar">{content}</aside>
  return <Dialog.Root open={open} onOpenChange={value => { if (!value) close() }}><Dialog.Portal><Dialog.Overlay className="sidebar-backdrop" /><Dialog.Content className="sidebar sidebar-open" onCloseAutoFocus={event => { event.preventDefault(); document.getElementById('learning-menu-trigger')?.focus() }}><Dialog.Title className="sr-only">Læringsmeny</Dialog.Title><Dialog.Description className="sr-only">Naviger til oversikt, kurs, profil og innstillinger.</Dialog.Description>{content}</Dialog.Content></Dialog.Portal></Dialog.Root>
}
export function ProtectedRoute() {
  const profile = useProfile()
  const location = useLocation()
  return profile ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />
}
export function AppLayout() {
  const [menu, setMenu] = useState(false)
  const location = useLocation()
  const current = navItems.find(item => location.pathname.startsWith(item.to))
  return <div className="app-layout"><a href="#main" className="skip-link">Hopp til innhold</a><Sidebar open={menu} close={() => setMenu(false)} /><div className="app-body"><header className="app-header"><div className="flex items-center gap-3"><Button className="mobile-toggle" size="icon" variant="ghost" id="learning-menu-trigger" aria-label="Åpne læringsmeny" aria-expanded={menu} onClick={() => setMenu(true)}><Menu size={20} /></Button><span className="breadcrumb-brand">Læringsrom</span><span className="muted">/</span><span>{current?.label ?? 'Mine kurs'}</span></div><div className="flex items-center gap-4"><span className="local-badge"><span className="tiny-dot" /> Demomodus</span><ThemeToggle /><span className="header-divider" /><ProfileDropdown /></div></header><motion.main id="main" tabIndex={-1} key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="page-container"><Outlet /></motion.main><div className="app-bottom"><span>Små steg. Sterkere digital trygghet.</span><span><ShieldCheck size={13} /> Lær i ditt eget tempo</span></div></div></div>
}
