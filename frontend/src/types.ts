import { DateTime } from 'luxon'

export type ScheduleItem = {
  date: DateTime | null
  task: string
  day: number
  completed?: boolean
}

export type ProgramWeek = Record<string, week[]>

type week = {
  weekday: string
  title: string
  completed: boolean
}
