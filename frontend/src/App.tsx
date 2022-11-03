import './css/App.css'
import { DateTime } from 'luxon'
import { Calendar } from './components/Calendar'
import { ProgramWeek, ScheduleItem } from './types'
import { addTasks, fillWeekdaysThatAreNotInMonth, getSchedule, mapWeekInDataToProgram } from './utils'
import { useGetWeeks } from './hooks/useGetWeeks'
import { CreateTask } from './components/CreateTask'

function App() {
  const now = DateTime.now()

  const { data, loading, error } = useGetWeeks('http://localhost:3000/api/week')

  if (loading) {
    return <div>loading</div>
  }

  if (!data) {
    return (
      <div>
        Error getting data <pre>{error}</pre>
      </div>
    )
  }

  const createSchedule: ScheduleItem[] = getSchedule(now)
  const scheduleWithWeekdays = fillWeekdaysThatAreNotInMonth(createSchedule)
  const programWeeks: ProgramWeek[] = mapWeekInDataToProgram(data)
  const scheduleWithTasks = addTasks(scheduleWithWeekdays, programWeeks)

  return (
    <main>
      <CreateTask />
      <Calendar scheduleItems={scheduleWithTasks} currentDateTime={now} />
    </main>
  )
}

export default App
