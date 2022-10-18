import {ProgramWeek, ScheduleItem} from "./types";
import tasks from "../examples/program.json";

const programTasks: ProgramWeek = tasks

const dayToNum: Record<string, number> = {
	MONDAY: 1,
	TUESDAY: 2,
	WEDNESDAY: 3,
	THURSDAY: 4,
	FRIDAY: 5,
	SATURDAY: 6,
	SUNDAY: 7
}

export const range = (start: number, end: number) => Array(end - start + 1)
	.fill(undefined)
	.map((_, idx) => start + idx)

export function fillWeekdays(scheduleItems: ScheduleItem[]): ScheduleItem[] {
	const firstDay = scheduleItems.at(0) as ScheduleItem
	const lastDay = scheduleItems.at(-1) as ScheduleItem

	if (firstDay.day === 1) {
		return scheduleItems
	}

	const fillStart = [...Array(firstDay.day - 1).keys()].map(it => ({
		date: null,
		day: it + 1, // add one as it starts with 0
		task: ""
	}))

	const fillEnd = [...Array(7 - lastDay.day).keys()].map(it => ({
		date: null,
		day: lastDay.day + it + 1, // add one as it starts with 0
		task: ""
	}))

	return [...fillStart, ...scheduleItems, ...fillEnd]
}

export function createBatches(scheduleItems: ScheduleItem[], batches: ScheduleItem[][]) {
	let week: ScheduleItem[] = []
	scheduleItems.forEach((day, index) => {
		// start batching again once week is full
		if (week.at(-1)?.day === 7) {
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

export function addTasks(scheduleItems: ScheduleItem[]) {
	const batches: ScheduleItem[][] = []
	// divide days into weeks, nested array
	createBatches(scheduleItems, batches);

	const tasksScheduled = batches.map((week, index) => {
		const currWeek = programTasks[`week${index}`];

		if (!currWeek) {
			return week
		}

		return week.map(scheduleItem => {
			// fixme: when looping current week which has 3 tasks, we get a arr with 3 objects, when we would want one
			const dayProgram = currWeek.map(it => {
				// no date means that item is outside of current month
				if (!scheduleItem.date) {
					return scheduleItem
				}

				if (dayToNum[it.weekday] === scheduleItem.day) {
					return {
						...scheduleItem,
						task: it.title,
						completed: it.completed
					}
				}

				return scheduleItem
			})
			// if day program has a task, return it by filtering others out
			if (dayProgram.some(it => it.task)) {
				// remove nulls and duplicates before return
				const uniqueItems = [...new Set(dayProgram)]
				return uniqueItems.filter(it => it.task)[0]
			}

			// remove nulls and duplicates before return
			return [...new Set(dayProgram)][0]
		})
	})
	// "un-batch" array, by dissolving nested arrays
	return tasksScheduled.flatMap(it => it)
}