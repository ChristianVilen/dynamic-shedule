import { ScheduleItem } from '../types'
import { DateTime } from 'luxon'

export const useUpdateSchedule = () => {
  function getIncompleteTasks(scheduleItems: ScheduleItem[], currentDateTime: DateTime) {
    let incompleteTasks: ScheduleItem[] = []

    scheduleItems.forEach((scheduleItem) => {
      if (!scheduleItem.date) {
        return
      }

      const hasTask = scheduleItem.hasOwnProperty('completed')
      const isCompleted = scheduleItem.completed
      const isInFuture = scheduleItem.date.startOf('day') >= currentDateTime.startOf('day')

      const taskInFuture = hasTask && isInFuture
      const hasNotCompletedTask = hasTask && !isCompleted

      if (taskInFuture) {
        // if the future task will not be overridden do not push
        if (incompleteTasks.length < scheduleItem.date?.day - currentDateTime.day) {
          return
        }

        incompleteTasks.push(scheduleItem)
        return
      }
      // add past incomplete to list
      if (hasNotCompletedTask) {
        incompleteTasks.push(scheduleItem)
      }
    })

    return incompleteTasks
  }

  function updateSchedule(
    scheduleItems: ScheduleItem[],
    incompleteTasks: ScheduleItem[],
    currentDateTime: DateTime
  ): ScheduleItem[] {
    if (incompleteTasks.length === 0) {
      return scheduleItems
    }

    const addDatesForWhereItemsShouldBe = incompleteTasks.map((it, index) => {
      const newDate = currentDateTime.plus({ days: index })

      return {
        ...it,
        date: newDate
      }
    })

    const removeIncompleteTasks = scheduleItems.map((item) => {
      if (item?.date && item.date.day <= currentDateTime.day) {
        if (item.completed) {
          return item
        }

        return {
          day: item.day,
          date: item.date,
          task: ''
        }
      }

      return item
    })
    // add overriding items from current day forwards
    return addOverridingTasks(removeIncompleteTasks, addDatesForWhereItemsShouldBe)
  }

  function addOverridingTasks(scheduleItems: ScheduleItem[], overridingItems: ScheduleItem[]) {
    return scheduleItems.map((scheduleItem) => {
      const overridingItem = overridingItems.find((f) => f.date?.day === scheduleItem.date?.day)

      if (!overridingItem?.date || !scheduleItem.date) {
        return scheduleItem
      }

      if (!overridingItem) {
        return scheduleItem
      }

      if (overridingItem.date?.day <= scheduleItem.date?.day) {
        return {
          ...overridingItem,
          day: scheduleItem.day
        }
      }

      return scheduleItem
    })
  }

  return { updateSchedule, getIncompleteTasks }
}
