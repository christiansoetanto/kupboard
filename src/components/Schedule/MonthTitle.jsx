import React, { useState } from 'react';
import ChevronLeftSvg from '../UI/ChevronLeftSvg';
import ChevronRightSvg from '../UI/ChevronRightSvg';

const MonthTitle = (props) => {
	var m_names = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	const { currentMonth = new Date().getMonth(), currentYear = new Date().getFullYear(), className, decreaseMonth, increaseMonth } = props;

	// const [currentMonth, setCurrentMonth] = useState(defaultMonth);

	// const decreaseMonth = () =>
	// 	setCurrentMonth((prevState) => (prevState -= 1));

	// const increaseMonth = () =>
	// setCurrentMonth((prevState) => (prevState += 1));

	return (
		<div
			className={`flex w-full text-3xl items-center justify-between ${className}`}
		>
			<ChevronLeftSvg className='cursor-pointer' onClick={decreaseMonth}/>
			<div>{`${m_names[currentMonth]} ${currentYear}`} </div>
			<ChevronRightSvg className='cursor-pointer' onClick={increaseMonth} />
		</div>
	);
};

export default MonthTitle;
