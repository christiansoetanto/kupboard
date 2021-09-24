import React from 'react';
import range from 'lodash/range';
import DateCell from './DateCell';

const GridCalendar = (props) => {
	const { currentMonth, currentYear, onDateClick } = props;

	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];


	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
		const lastDateOfMonth = new Date(
			currentYear,
			currentMonth + 1,
			0
		).getDate();

		const tempDateCells = [];
		let firstDate = 1;
		for (let index = 1; index <= 35; index++) {
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

	return (
		<div className='flex flex-col gap-y-4'>
			<div className='grid grid-cols-7'>
				{daysOfWeek.map((e) => {
					return (
						<div
							className={`text-center ${
								e === 'Sunday' && 'text-red-600'
							}`}
						>
							{e}
						</div>
					);
				})}
			</div>
			<div className='grid grid-cols-7' onClick={onDateClick}>
				{tempDateCells.map((e, index) => {
					if (e.showDate) {
						return (
							<DateCell
								className='flex items-center justify-center border border-gray-300'
								style={{ minHeight: '6rem' }}
								date={e.date}
								key={e.key}
							/>
						);
					} else {
						return <div key={index + 100}></div>;
					}
				})}
			</div>
		</div>
	);
};

export default GridCalendar;
