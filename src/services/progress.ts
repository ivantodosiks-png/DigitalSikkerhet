import { courses } from '../data/courses'
import { questions } from '../data/questions'
import { localDay } from '../lib/utils'
import type { Attempt, Course, Progress } from '../types'

export const emptyProgress = (): Progress => ({ lessons: {}, attempts: [] })
export const scoreAttempt = (attempt: Attempt) => {
  const qs = questions[attempt.courseId]
  if (attempt.answers.length !== qs.length || attempt.answers.some((a, i) => !Number.isInteger(a) || a < 0 || a >= qs[i].options.length)) return 0
  return Math.round(attempt.answers.filter((a, i) => a === qs[i].correct).length / qs.length * 100)
}
export const passedCourse = (p: Progress, id: string) => p.attempts.some(a => a.courseId === id && scoreAttempt(a) >= 70)
export const lessonCount = (p: Progress) => courses.flatMap(c => c.lessons).filter(l => p.lessons[l.id]).length
export const courseComplete = (p: Progress, c: Course) => c.lessons.every(l => p.lessons[l.id]) && passedCourse(p, c.id)
export const courseProgress = (p: Progress, c: Course) => Math.round((c.lessons.filter(l => p.lessons[l.id]).length + Number(passedCourse(p, c.id))) / (c.lessons.length + 1) * 100)
export const totalXP = (p: Progress) => lessonCount(p) * 30 + courses.filter(c => passedCourse(p, c.id)).length * 100
export const overallProgress = (p: Progress) => Math.round(courses.reduce((sum, c) => sum + courseProgress(p, c), 0) / courses.length)
export const activityDates = (p: Progress) => [...Object.values(p.lessons), ...p.attempts.map(a => a.at)]
export function streak(p: Progress, now = new Date()) {
  const days = new Set(activityDates(p).map(d => localDay(new Date(d))))
  const day = new Date(now)
  if (!days.has(localDay(day))) day.setDate(day.getDate() - 1)
  let count = 0
  while (days.has(localDay(day))) { count++; day.setDate(day.getDate() - 1) }
  return count
}
export const weeklyActivity = (p: Progress) => Array.from({ length: 7 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - 6 + i)
  return { day: date.toLocaleDateString('nb-NO', { weekday: 'short' }), aktiviteter: activityDates(p).filter(d => localDay(new Date(d)) === localDay(date)).length }
})
export const nextCourse = (p: Progress) => courses.find(c => !courseComplete(p, c)) ?? courses[0]
export const nextLessonIndex = (p: Progress, c: Course) => Math.max(0, c.lessons.findIndex(l => !p.lessons[l.id]))
