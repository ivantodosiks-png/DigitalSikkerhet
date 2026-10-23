import test from 'node:test'
import assert from 'node:assert/strict'
import { courses } from '../src/data/courses'
import { questions } from '../src/data/questions'
import { achievements } from '../src/data/achievements'
import { courseComplete, courseProgress, emptyProgress, overallProgress, scoreAttempt, streak, totalXP } from '../src/services/progress'
import type { Attempt } from '../src/types'

const attempt = (answers: number[], at = '2026-10-20T12:00:00.000Z'): Attempt => ({ id: 'attempt', courseId: 'passord', answers, at })
const right = questions.passord.map(q => q.correct)
test('empty state is truly empty', () => {
  const p = emptyProgress()
  assert.equal(totalXP(p), 0)
  assert.equal(overallProgress(p), 0)
  assert.equal(streak(p), 0)
  assert.ok(achievements.every(a => !a.unlocked(p)))
})
test('quiz scoring rejects incomplete and invalid attempts', () => {
  assert.equal(scoreAttempt(attempt(right)), 100)
  assert.equal(scoreAttempt(attempt(right.slice(1))), 0)
  assert.equal(scoreAttempt(attempt([9, ...right.slice(1)])), 0)
  assert.equal(scoreAttempt(attempt([0, ...right.slice(1)])), 83)
  assert.equal(scoreAttempt(attempt([0, 0, ...right.slice(2)])), 67)
})
test('XP and completion require actual unique activities', () => {
  const p = emptyProgress()
  p.attempts = [attempt(right), attempt(right)]
  assert.equal(totalXP(p), 100)
  assert.equal(courseComplete(p, courses[0]), false)
  assert.equal(courseProgress(p, courses[0]), 25)
  for (const lesson of courses[0].lessons) p.lessons[lesson.id] = '2026-10-20T12:00:00.000Z'
  p.lessons['not-a-lesson'] = '2026-10-20T12:00:00.000Z'
  assert.equal(totalXP(p), 190)
  assert.equal(courseComplete(p, courses[0]), true)
  assert.equal(courseProgress(p, courses[0]), 100)
  assert.ok(achievements[0].unlocked(p))
  assert.ok(achievements[1].unlocked(p))
  assert.equal(achievements[4].unlocked(p), false)
})
test('streak follows local calendar dates and tolerates no activity today', () => {
  const p = emptyProgress()
  p.lessons['passord-1'] = new Date(2026, 9, 19, 12).toISOString()
  p.lessons['passord-2'] = new Date(2026, 9, 20, 12).toISOString()
  assert.equal(streak(p, new Date(2026, 9, 20, 16)), 2)
  assert.equal(streak(p, new Date(2026, 9, 21, 16)), 2)
  assert.equal(streak(p, new Date(2026, 9, 22, 16)), 0)
})
