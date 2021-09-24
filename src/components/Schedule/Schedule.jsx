import React, { useEffect, useState } from 'react';
import DateCell from './DateCell';
import GridCalendar from './GridCalendar';
import MonthTitle from './MonthTitle';

const Schedule = (props) => {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

	const decreaseMonth = () =>
		setCurrentMonth((prevState) => (prevState -= 1));

	const increaseMonth = () =>
		setCurrentMonth((prevState) => (prevState += 1));

	return (
		<div className='flex flex-col'>
			<MonthTitle
				className='mb-8'
				currentMonth={currentMonth}
				currentYear={currentYear}
				decreaseMonth={decreaseMonth}
				increaseMonth={increaseMonth}
			/>
			<GridCalendar
				currentMonth={currentMonth}
				currentYear={currentYear}
			/>
		</div>
	);
};

export default Schedule;
