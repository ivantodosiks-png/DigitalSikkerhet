export type CourseId = 'passord' | 'phishing' | 'personvern'
export interface Lesson {
  id: string
  title: string
  minutes: number
  intro: string
  sections: { title: string; text: string }[]
  takeaway: string
  exercise?: 'password' | 'phishing' | 'privacy'
}
export interface Course {
  id: CourseId
  title: string
  shortTitle: string
  description: string
  category: string
  color: string
  minutes: number
  objectives: string[]
  lessons: Lesson[]
  source: { title: string; url: string }
}
export interface Question {
  prompt: string
  options: string[]
  correct: number
  explanation: string
}
export interface Attempt {
  id: string
  courseId: CourseId
  answers: number[]
  at: string
}
export interface Progress {
  lessons: Record<string, string>
  attempts: Attempt[]
}
export interface Profile {
  id: string
  name: string
  email: string
  createdAt: string
  progress: Progress
}
export interface Preferences {
  theme: 'dark' | 'light'
  reducedMotion: boolean
  notifications: boolean
}
export interface Snapshot {
  version: 1
  profiles: Profile[]
  sessionId: string | null
  preferences: Preferences
}
