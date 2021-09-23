import React from 'react';
import range from 'lodash/range';

const GridCalendar = (props) => {
	const { dateCells, onDateClick } = props;

	const daysOfWeek = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	]


	return (
		<div className='flex flex-col gap-y-4'>
			<div className='grid grid-cols-7'>
				{daysOfWeek.map(e => {
					return (<div className={`text-center ${e === 'Sunday' && 'text-red-600'}`}>
						{e}
					</div>)
				})}
			</div>
			<div className='grid grid-cols-7' onClick={onDateClick}>
				{dateCells}
			</div>
		</div>
	);
};

export default GridCalendar;
