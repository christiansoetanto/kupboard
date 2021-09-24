import React, { useEffect, useState } from "react";
import DateCell from "./DateCell";
import GridCalendarCS from "./GridCalendarCS";
import MonthTitle from "./MonthTitle";

const ScheduleCS = (props) => {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
	const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

	const [dateCell, setDateCell] = useState([]);

	useEffect(() => {
		let firstDate = 1;
		var tempDateCells = [];

		for (let index = 1; index <= 35; index++) {
			if (index == 1) console.log("loopnya jalan");
			if (index >= firstDayOfMonth && firstDate <= lastDateOfMonth) {
				tempDateCells.push({
					date: new Date(currentYear, currentMonth, firstDate),
					key: new Date(currentYear, currentMonth, firstDate),
					showDate: true,
				});
				firstDate++;
			} else {
				tempDateCells.push({
					showDate: false,
				});
			}
		}

		setDateCell(tempDateCells);
	}, [currentMonth, currentYear]);

	const decreaseMonth = () => setCurrentMonth((prevState) => (prevState -= 1));

	const increaseMonth = () => setCurrentMonth((prevState) => (prevState += 1));

	return (
		<div className='flex flex-col'>
			<MonthTitle className='mb-8' currentMonth={currentMonth} currentYear={currentYear} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} />
			<GridCalendarCS dateCell={dateCell} />
		</div>
	);
};

export default ScheduleCS;
