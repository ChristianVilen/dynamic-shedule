import React from 'react'
import styles from '../css/calendar.module.css'
import { DateTime } from 'luxon'
import { ScheduleItem } from '../types'

export const CalendarItem = ({ item, currentDateTime }: { item: ScheduleItem; currentDateTime: DateTime }) => {
  if (!item.date) {
    return <div className={styles.item} />
  }

  const hasCompletedTask = item.task && item.completed
  const isActive = currentDateTime.day === item.date.day
  const futureTask = item.date.day >= currentDateTime.day && item.hasOwnProperty('completed')

  return (
    <div className={`${styles.item} ${isActive ? styles.activeBackground : ''}`}>
      <h2 className={`${styles.h2} ${hasCompletedTask ? styles.taskDay : ''} ${isActive ? styles.activeText : ''}`}>
        {item.date.day}
      </h2>
      {hasCompletedTask ||
        (futureTask && <h3 className={`${styles.h3} ${isActive ? styles.activeText : ''}`}>{item.task}</h3>)}
    </div>
  )
}
