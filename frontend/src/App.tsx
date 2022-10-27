import './css/App.css'
import { DateTime } from 'luxon'
import { Calendar } from './components/Calendar'
import { ProgramWeek, ScheduleItem } from './types'
import { addTasks, fillWeekdaysThatAreNotInMonth, getSchedule, range } from './utils'
import tasks from '../examples/program.json'

const programTasks: ProgramWeek = tasks

function App() {
  const now = DateTime.now()

  const createSchedule: ScheduleItem[] = getSchedule(now)
  const scheduleWithWeekdays = fillWeekdaysThatAreNotInMonth(createSchedule)
  const scheduleWithTasks = addTasks(scheduleWithWeekdays, programTasks)

  return (
    <main>
      <Calendar scheduleItems={scheduleWithTasks} currentDateTime={now} />
    </main>
  )
}

export default App
