import { DateTime } from 'luxon'

export type ScheduleItem = {
  id: number | null
  date: DateTime | null
  task: string
  day: number
  completed?: boolean
}

export type ProgramWeek = {
  id: number
  week: number
  tasks: Task[]
}

type Task = {
  id: number
  weekday: string
  title: string
  completed: boolean
}

type TaskIn = {
  weekday: string
  title: string
  completed: boolean
  weekId: number
  id: number
  updatedAt: Date
  createdAt: Date
  deletedAt: Date
}

export type WeekIn = {
  weekNumber: number
  tasks: TaskIn[]
  id: number
  updatedAt: Date
  createdAt: Date
  deletedAt: Date
}
