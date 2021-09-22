import React from 'react';
import GridCalendar from './GridCalendar';
import MonthTitle from './MonthTitle';

const Schedule = (props) => {
    let dates = [];
	for (let i = 1; i <= 31; i++) {
		dates.push(
			<div className='flex items-center justify-center border border-gray-300' data-date={i} style={{minHeight:'6rem'}}>
				{i}
			</div>
		);
	}

    const onDateClick = (e) => {
        alert(`you clicked on ${e.target.getAttribute('data-date')}`);
    }


    return (
        <div className='flex flex-col'>
            <MonthTitle className='mb-8'/>
            <GridCalendar dates={dates} onDateClick={onDateClick}/>
        </div>
    )
}

export default Schedule;