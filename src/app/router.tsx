import { lazy, Suspense, useEffect } from 'react'
import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom'
import { MotionConfig, useReducedMotion } from 'motion/react'
import { Toaster, toast } from 'sonner'
import { AppLayout, Navbar, Footer, ProtectedRoute } from '../components/layout/Layout'
import { LoadingSkeleton } from '../components/ui/common'
import { useAppStore } from '../stores/useAppStore'
import { getStorageWarning } from '../services/persistence'
const LandingPage = lazy(() => import('../pages/LandingPage'))
const AuthPage = lazy(() => import('../pages/AuthPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const CoursesPage = lazy(() => import('../pages/CoursesPage'))
const CoursePage = lazy(() => import('../pages/CoursePage'))
const QuizPage = lazy(() => import('../pages/QuizPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const SettingsPage = lazy(() => import('../pages/SettingsPage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
function Root() {
  const preferences = useAppStore(s => s.preferences)
  const systemReducedMotion = useReducedMotion()
  const location = useLocation()
  useEffect(() => {
    document.documentElement.dataset.theme = preferences.theme
    document.documentElement.dataset.reducedMotion = String(preferences.reducedMotion || systemReducedMotion)
    document.documentElement.style.colorScheme = preferences.theme
  }, [preferences, systemReducedMotion])
  useEffect(() => {
    const names: Record<string, string> = { dashboard: 'Oversikt', courses: 'Kurs', profile: 'Min profil', settings: 'Innstillinger', login: 'Logg inn', register: 'Opprett demoprofil' }
    document.title = `${names[location.pathname.split('/')[1]] ?? 'Tryggere for hvert steg'} · Digital Sikkerhet`
    if (location.hash) { requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView()) }
    else { window.scrollTo(0, 0); document.getElementById('main')?.focus({ preventScroll: true }) }
  }, [location.pathname, location.hash])
  useEffect(() => { const warning = getStorageWarning(); if (warning) toast.warning(warning) }, [])
  return <MotionConfig reducedMotion={preferences.reducedMotion ? 'always' : 'user'}><Suspense fallback={<LoadingSkeleton />}><Outlet /></Suspense><Toaster containerAriaLabel="Varsler" position="bottom-right" theme={preferences.theme} richColors closeButton toastOptions={{ className: 'app-toast', closeButtonAriaLabel: 'Lukk varsel' }} /></MotionConfig>
}
function PublicCourses() { return <><Navbar /><main className="public-courses page-container"><CoursesPage /></main><Footer /></> }
function CoursesRoute() {
  const session = useAppStore(s => s.sessionId)
  return session ? <AppLayout /> : <PublicCourses />
}
export const router = createBrowserRouter([{ element: <Root />, children: [
  { index: true, element: <LandingPage /> },
  { path: 'login', element: <AuthPage /> },
  { path: 'register', element: <AuthPage registerMode /> },
  { path: 'courses', element: <CoursesRoute />, children: [{ index: true, element: <CoursesPage /> }] },
  { element: <ProtectedRoute />, children: [{ element: <AppLayout />, children: [
    { path: 'dashboard', element: <DashboardPage /> },
    { path: 'courses/:courseId', element: <CoursePage /> },
    { path: 'courses/:courseId/quiz', element: <QuizPage /> },
    { path: 'profile', element: <ProfilePage /> },
    { path: 'settings', element: <SettingsPage /> },
  ] }] },
  { path: '*', element: <NotFoundPage /> },
] }])
