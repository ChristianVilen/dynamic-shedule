import React from 'react';
import styles from "../css/calendar.module.css"
import {ScheduleItem} from "../types";
import {DateTime} from "luxon";
import {useUpdateSchedule} from "../useUpdateSchedule";
import {WeekHeader} from "./WeekHeader";
import {CalendarItem} from "./CalendarItem";

type CalendarProps = {
	scheduleItems: ScheduleItem[]
}

export const Calendar = ({scheduleItems}: CalendarProps) => {
	const {updateSchedule, getIncompleteTasks} = useUpdateSchedule();
	const incompleteTasks = getIncompleteTasks(scheduleItems)
	const updatedSchedule = updateSchedule(scheduleItems, incompleteTasks)

	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<h1 className={styles.h1}>Weekly Program</h1>
			</div>
			<div className={styles.calendar}>
				<WeekHeader/>
				{updatedSchedule.map((item, index) => <CalendarItem item={item} key={index} />)}
			</div>
		</div>
	)
}
