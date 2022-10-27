import React from 'react'
import styles from '../css/calendar.module.css'
import { ScheduleItem } from '../types'
import { useUpdateSchedule } from '../useUpdateSchedule'
import { WeekHeader } from './WeekHeader'
import { CalendarItem } from './CalendarItem'
import { DateTime } from 'luxon'

type CalendarProps = {
  scheduleItems: ScheduleItem[]
  currentDateTime: DateTime
}

export const Calendar = ({ scheduleItems, currentDateTime }: CalendarProps) => {
  const { updateSchedule, getIncompleteTasks } = useUpdateSchedule()
  const incompleteTasks = getIncompleteTasks(scheduleItems, currentDateTime)
  const updatedSchedule = updateSchedule(scheduleItems, incompleteTasks, currentDateTime)

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1 className={styles.h1}>Weekly Program</h1>
      </div>
      <div className={styles.calendar}>
        <WeekHeader />
        {updatedSchedule.map((item, index) => (
          <CalendarItem item={item} currentDateTime={currentDateTime} key={index} />
        ))}
      </div>
    </div>
  )
}
