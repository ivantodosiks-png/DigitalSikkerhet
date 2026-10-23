import { courses } from './courses'
import { courseComplete, lessonCount } from '../services/progress'
import type { Progress } from '../types'
export const achievements = [
  { id: 'first', title: 'Første steg', description: 'Fullfør din første leksjon', unlocked: (p: Progress) => lessonCount(p) > 0 },
  { id: 'passord', title: 'Passordekspert', description: 'Fullfør passordmodulen', unlocked: (p: Progress) => courseComplete(p, courses[0]) },
  { id: 'phishing', title: 'Svindeldetektiv', description: 'Fullfør svindelmodulen', unlocked: (p: Progress) => courseComplete(p, courses[1]) },
  { id: 'personvern', title: 'Personvernmester', description: 'Fullfør personvernmodulen', unlocked: (p: Progress) => courseComplete(p, courses[2]) },
  { id: 'expert', title: 'Digital sikkerhet-ekspert', description: 'Fullfør alle tre modulene', unlocked: (p: Progress) => courses.every(c => courseComplete(p, c)) },
]
