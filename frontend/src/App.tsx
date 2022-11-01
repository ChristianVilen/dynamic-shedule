import './css/App.css'
import { DateTime } from 'luxon'
import { Calendar } from './components/Calendar'
import { ProgramWeek, ScheduleItem } from './types'
import { addTasks, fillWeekdaysThatAreNotInMonth, getSchedule } from './utils'
import { useGetWeeks } from './hooks/useGetWeeks'

function App() {
  const { data, loading, error } = useGetWeeks('http://localhost:3000/api/week')

  if (loading) {
    return <div>loading</div>
  }

  if (!data) {
    return <div>Error getting data</div>
  }
  const mapped: ProgramWeek[] = data.map((week) => {
    return {
      id: week.id,
      week: week.weekNumber,
      tasks: week.tasks.map(({ id, weekday, title, completed }) => {
        return {
          id,
          weekday,
          title,
          completed
        }
      })
    }
  })

  const now = DateTime.now()

  const createSchedule: ScheduleItem[] = getSchedule(now)
  const scheduleWithWeekdays = fillWeekdaysThatAreNotInMonth(createSchedule)
  const scheduleWithTasks = addTasks(scheduleWithWeekdays, mapped)

  return (
    <main>
      <Calendar scheduleItems={scheduleWithTasks} currentDateTime={now} />
    </main>
  )
}

export default App
