import { ProgramWeek, ScheduleItem } from './types'
import { DateTime } from 'luxon'

const DAYS_IN_WEEK = 7

const dayToNum: Record<string, number> = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7
}

export const range = (start: number, end: number) =>
  Array(end - start + 1)
    .fill(undefined)
    .map((_, idx) => start + idx)

export function getSchedule(now: DateTime) {
  const firstDay = now.startOf('month')
  const lastDay = now.endOf('month')
  const datesInCurrentMonth = range(firstDay.day, lastDay.day)

  return datesInCurrentMonth.map((dayNum) => {
    const date = now.set({ day: dayNum })

    return {
      date,
      day: date.weekday,
      task: ''
    }
  })
}

export function fillWeekdaysThatAreNotInMonth(scheduleItems: ScheduleItem[]): ScheduleItem[] {
  if (scheduleItems.length < 0) {
    return []
  }

  const firstDay: ScheduleItem = scheduleItems.at(0)!
  const lastDay: ScheduleItem = scheduleItems.at(-1)!

  if (firstDay.day === 1) {
    return scheduleItems
  }

  const fillStart = [...Array(firstDay.day - 1).keys()].map((dayNum) => ({
    date: null,
    day: dayNum + 1, // add one as it starts with 0
    task: ''
  }))

  const fillEnd = [...Array(DAYS_IN_WEEK - lastDay.day).keys()].map((dayNum) => ({
    date: null,
    day: lastDay.day + dayNum + 1, // add one as it starts with 0
    task: ''
  }))

  return [...fillStart, ...scheduleItems, ...fillEnd]
}

function createBatches(scheduleItems: ScheduleItem[], batches: ScheduleItem[][]) {
  let week: ScheduleItem[] = []
  scheduleItems.forEach((day, index) => {
    // start batching again once week is full
    if (week.at(-1)?.day === DAYS_IN_WEEK) {
      batches.push(week)
      week = []
    }

    week.push(day)

    // if its the last item in array push the batch
    if (index + 1 === scheduleItems.length) {
      batches.push(week)
    }
  })
}

export function addTasks(scheduleItems: ScheduleItem[], taskList: ProgramWeek): ScheduleItem[] {
  const batches: ScheduleItem[][] = []
  // divide days into weeks, nested array
  createBatches(scheduleItems, batches)

  const tasksScheduled = batches.map((week, index) => {
    const currWeek = taskList[`week${index}`]

    if (!currWeek) {
      return week
    }

    return week.map((scheduleItem) => {
      const dayProgram = currWeek.map((dayTask) => {
        // no date means that item is outside of current month
        if (!scheduleItem.date) {
          return scheduleItem
        }

        if (dayToNum[dayTask.weekday] === scheduleItem.day) {
          return {
            ...scheduleItem,
            task: dayTask.title,
            completed: dayTask.completed
          }
        }

        return scheduleItem
      })
      // if day program has a task, return it by filtering others out
      if (dayProgram.some(({ task }) => task)) {
        // remove nulls and duplicates before return
        const uniqueItems = [...new Set(dayProgram)]
        return uniqueItems.filter(({ task }) => task)[0]
      }

      // remove nulls and duplicates before return
      return [...new Set(dayProgram)][0]
    })
  })
  // "un-batch" array, by dissolving nested arrays
  return tasksScheduled.flatMap((it) => it)
}
