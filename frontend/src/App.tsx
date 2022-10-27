import './css/App.css'
import { DateTime } from 'luxon'
import { Calendar } from './components/Calendar'
import { ScheduleItem } from './types'
import { addTasks, fillWeekdays, range } from './utils'

function App() {
  const now = DateTime.fromObject({ day: 10, month: 9, year: 2022 })
  const firstDay = DateTime.local().startOf('month')
  const lastDay = DateTime.local().endOf('month')
  const datesInCurrentMonth = range(firstDay.day, lastDay.day)

  const createSchedule: ScheduleItem[] = datesInCurrentMonth.map((dayNum) => {
    const date = now.set({ day: dayNum })

    return {
      date,
      day: date.weekday,
      task: ''
    }
  })

  const scheduleWithWeekdays = fillWeekdays(createSchedule)
  const scheduleWithTasks = addTasks(scheduleWithWeekdays)

  return (
    <main>
      <Calendar scheduleItems={scheduleWithTasks} currentDateTime={now} />
    </main>
  )
}

export default App
