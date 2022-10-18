import './css/App.css'
import {DateTime} from "luxon";
import {Calendar} from "./components/Calendar";
import {ScheduleItem} from "./types";
import {addTasks, fillWeekdays, range} from "./utils";

function App() {
	const now = new Date()
	const firstDay = DateTime.local().startOf('month')
	const lastDay = DateTime.local().endOf('month')
	const datesInCurrentMonth = range(firstDay.day, lastDay.day)

	const createSchedule: ScheduleItem[] = datesInCurrentMonth.map(it => {
		const jsDate = new Date(now.setDate(it))
		const luxonDate = DateTime.fromJSDate(jsDate)

		return {
			date: luxonDate,
			day: luxonDate.weekday,
			task: ""
		}
	})

	const scheduleWithWeekdays = fillWeekdays(createSchedule)
	const scheduleWithTasks = addTasks(scheduleWithWeekdays)

	return (
		<main>
			<Calendar scheduleItems={scheduleWithTasks}/>
		</main>
	)
}

export default App
