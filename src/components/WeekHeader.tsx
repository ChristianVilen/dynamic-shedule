import React from 'react';
import styles from '../css/calendar.module.css'

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]

export const WeekHeader = () => (
    <>
        {weekdays.map((it, index) => <div className={styles.weekdayItem} key={index}>{it}</div>)}
    </>
);
