import React, { useEffect, useState } from 'react';
import DateCell from './DateCell';
import GridCalendar from './GridCalendar';
import MonthTitle from './MonthTitle';

const Schedule = (props) => {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [dateCells, setDateCells] = useState(null);

	useEffect(() => {


        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

		const tempDateCells = [];
		let firstDate = 1;
		for (let index = 1; index <= 35; index++) {
			if (index >= firstDayOfMonth && firstDate <= lastDateOfMonth) {
				tempDateCells.push(
					<DateCell
						className='flex items-center justify-center border border-gray-300'
						data-date={index}
						style={{ minHeight: '6rem' }}
						date={new Date(currentYear, currentMonth, firstDate)}
						key={new Date(currentYear, currentMonth, firstDate)}
					/>
				);
				firstDate++;
			} else {
				tempDateCells.push(<div key={index + 100}></div>);
			}
            setDateCells(tempDateCells);
		}

        console.log('hahahaha')

	}, [currentMonth, currentYear]);



	const decreaseMonth = () =>
		setCurrentMonth((prevState) => (prevState -= 1));

	const increaseMonth = () =>
		setCurrentMonth((prevState) => (prevState += 1));

	return (
		<div className='flex flex-col'>
			<MonthTitle
				className='mb-8'
				currentMonth={currentMonth}
				decreaseMonth={decreaseMonth}
				increaseMonth={increaseMonth}
			/>
			<GridCalendar dateCells={dateCells} />
		</div>
	);
};

export default Schedule;
