import { describe, expect, test } from 'vitest'
import { ProgramWeek, ScheduleItem } from '../src/types'
import { addTasks, fillWeekdaysThatAreNotInMonth, getSchedule, range } from '../src/utils'
import { DateTime } from 'luxon'
// @ts-ignore
import tasks from '../examples/program.json'

const programTasks: ProgramWeek = tasks
const DAYS_IN_MONTH = 30

const resultExample: ScheduleItem = {
  date: DateTime.fromObject({ day: 1, month: 9, year: 2022 }),
  day: 4,
  task: ''
}

describe('test functions in utils', () => {
  const now = DateTime.fromObject({ day: 1, month: 9, year: 2022 })
  const createSchedule: ScheduleItem[] = getSchedule(now)

  test('should return the whole month and have items with days', () => {
    expect(createSchedule.length).toEqual(DAYS_IN_MONTH)
    expect(createSchedule.at(0).day).toEqual(resultExample.day)
  })

  const scheduleWithWeekdays = fillWeekdaysThatAreNotInMonth(createSchedule)
  const dayWithWeekDay = scheduleWithWeekdays.find((it) => it.date)
  test('should have been filled with blanc day', () => {
    // Septembers first weekday is thursday so monday, tuesday and wednesday has been filled
    expect(dayWithWeekDay.day).toEqual(4)
    expect(dayWithWeekDay.date.day).toEqual(resultExample.date.day)
  })
  const scheduleWithTasks = addTasks(scheduleWithWeekdays, programTasks)
  test('should have tasks in day items', () => {
    const firstTask = scheduleWithTasks.find((it) => it.task.length > 0)
    expect(firstTask.task).toEqual('The Health Program')
  })
})
