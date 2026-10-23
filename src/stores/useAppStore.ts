import { create } from 'zustand'
import { toast } from 'sonner'
import { courses } from '../data/courses'
import { achievements } from '../data/achievements'
import { questions } from '../data/questions'
import { localRepository, defaults } from '../services/persistence'
import { DEMO_EMAIL, makeProfile, findDemoProfile } from '../services/auth'
import { emptyProgress, totalXP } from '../services/progress'
import type { Snapshot, Profile, Preferences, CourseId, Progress } from '../types'

interface AppStore extends Snapshot {
  login: (email: string, remember?: boolean) => void
  register: (name: string, email: string) => void
  logout: () => void
  editProfile: (name: string, email: string) => void
  completeLesson: (id: string) => void
  submitQuiz: (courseId: CourseId, answers: number[]) => void
  setPreferences: (preferences: Partial<Preferences>) => void
  resetProgress: () => void
  clearData: () => void
}
function persist(data: Snapshot) {
  if (!localRepository.save(data)) toast.error('Lagring er utilgjengelig. Fremgangen varer bare i denne økten.')
}
export const useAppStore = create<AppStore>((set, get) => {
  const commit = (update: Partial<Snapshot>) => { set(update); persist(get()) }
  const changeProfile = (fn: (profile: Profile) => Profile) => {
    const state = get()
    commit({ profiles: state.profiles.map(p => p.id === state.sessionId ? fn(p) : p) })
  }
  const updateProgress = (fn: (p: Progress) => Progress) => {
    const before = get().profiles.find(p => p.id === get().sessionId)?.progress
    if (!before) return
    const after = fn(before)
    changeProfile(p => ({ ...p, progress: after }))
    if (get().preferences.notifications) {
      const xp = totalXP(after) - totalXP(before)
      if (xp > 0) toast.success(`Godt jobbet! +${xp} XP`)
      achievements.filter(a => !a.unlocked(before) && a.unlocked(after)).forEach(a => toast.success(`Nytt merke: ${a.title}`))
    }
  }
  return {
    ...localRepository.load(),
    login(email, remember = true) {
      let profiles = get().profiles
      let profile = findDemoProfile(profiles, email)
      if (!profile && email.toLowerCase() === DEMO_EMAIL) {
        profile = makeProfile('Alex Nordmann', DEMO_EMAIL)
        profiles = [...profiles, profile]
      }
      if (!profile) throw new Error('Denne demoprofilen finnes ikke i nettleseren. Opprett en profil eller prøv demoen.')
      localRepository.setSession(profile.id, remember)
      commit({ profiles, sessionId: profile.id })
    },
    register(name, email) {
      if (findDemoProfile(get().profiles, email)) throw new Error('E-postadressen har allerede en lokal demoprofil.')
      const profile = makeProfile(name, email)
      localRepository.setSession(profile.id, true)
      commit({ profiles: [...get().profiles, profile], sessionId: profile.id })
    },
    logout() { localRepository.setSession(null, true); commit({ sessionId: null }) },
    editProfile(name, email) {
      if (get().profiles.some(p => p.id !== get().sessionId && p.email === email.toLowerCase())) throw new Error('E-postadressen brukes av en annen demoprofil.')
      changeProfile(p => ({ ...p, name, email: email.toLowerCase() }))
    },
    completeLesson(id) {
      if (!courses.some(c => c.lessons.some(l => l.id === id))) return
      updateProgress(p => p.lessons[id] ? p : { ...p, lessons: { ...p.lessons, [id]: new Date().toISOString() } })
    },
    submitQuiz(courseId, answers) {
      const qs = questions[courseId]
      if (answers.length !== qs.length || answers.some((a, i) => !Number.isInteger(a) || a < 0 || a >= qs[i].options.length)) throw new Error('Svar på alle spørsmål før du leverer.')
      updateProgress(p => ({ ...p, attempts: [...p.attempts, { id: crypto.randomUUID(), courseId, answers: [...answers], at: new Date().toISOString() }] }))
    },
    setPreferences(preferences) { commit({ preferences: { ...get().preferences, ...preferences } }) },
    resetProgress() { changeProfile(p => ({ ...p, progress: emptyProgress() })); toast.success('Fremgangen er nullstilt.') },
    clearData() {
      if (!localRepository.clear()) { toast.error('Nettleseren tillater ikke sletting av demodata.'); return }
      set(defaults())
      toast.success('Alle lokale demodata er slettet.')
    },
  }
})
export const useProfile = () => useAppStore(s => s.profiles.find(p => p.id === s.sessionId))
