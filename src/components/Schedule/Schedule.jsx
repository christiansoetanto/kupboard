import React, { useState } from 'react';
import DateCell from './DateCell';
import GridCalendar from './GridCalendar';
import MonthTitle from './MonthTitle';

const Schedule = (props) => {
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(new Date(currentYear, currentMonth, 1).getDay());
    const [lastDateOfMonth, setLastDateOfMonth] = useState(new Date(currentYear, currentMonth + 1, 0).getDate());

    console.log(firstDayOfMonth);
    console.log(lastDateOfMonth);
    
    let dates = [];
    let firstDate = 1;
    for (let index = 1; index <= 35; index++) {
        if (index >= firstDayOfMonth && firstDate <= lastDateOfMonth){
            dates.push(
                <DateCell
                    className='flex items-center justify-center border border-gray-300'
                    data-date={index}
                    style={{ minHeight: '6rem' }}
                    date={new Date(currentYear, currentMonth, firstDate)}
                />
            );
            firstDate++;
        }
        else
            dates.push(
                <div>
                </div>
            )
        
            
    }



	// for (let i = 1; i <= 31; i++) {
	// 	dates.push(
	// 		<div
	// 			className='flex items-center justify-center border border-gray-300'
	// 			data-date={i}
	// 			style={{ minHeight: '6rem' }}
	// 		>
	// 			{i}
	// 		</div>
	// 	);
	// }

	// const onDateClick = (e) => {
	// 	alert(`you clicked on ${e.target.getAttribute('data-date')}`);
	// };

	return (
		<div className='flex flex-col'>
			<MonthTitle className='mb-8' />
			<GridCalendar dates={dates} />
		</div>
	);
};

export default Schedule;
