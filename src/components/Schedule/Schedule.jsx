import React, { useEffect, useState } from 'react';
import GridCalendar from './GridCalendar';
import MonthTitle from './MonthTitle';

const Schedule = (props) => {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

	const [dateCell, setDateCell] = useState([]);

	useEffect(() => {
		const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
		const lastDateOfMonth = new Date(
			currentYear,
			currentMonth + 1,
			0
		).getDate();
		let firstDate = 1;
		var tempDateCells = [];

		for (let index = 0; index < 35; index++) {
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

	const decreaseMonth = () => {
		setCurrentMonth((prevState) => {
			console.log(prevState);
			if (prevState == 0) {
				prevState = 12;
				setCurrentYear((prevState) => --prevState);
			}
			return --prevState;
		});
	};

	const increaseMonth = () => {
		setCurrentMonth((prevState) => {
			console.log(prevState);
			if (prevState == 11) {
				prevState = -1;
				setCurrentYear((prevState) => ++prevState);
			}
			return ++prevState;
		});
	};

	const dateClickHandler = (date) => {
		alert(`you clicked on ${date}`);
	};

	return (
		<div className='flex flex-col'>
			<MonthTitle
				className='mb-8'
				currentMonth={currentMonth}
				currentYear={currentYear}
				decreaseMonth={decreaseMonth}
				increaseMonth={increaseMonth}
			/>
			<GridCalendar dateCell={dateCell} onClick={dateClickHandler}/>
		</div>
	);
};

export default Schedule;
