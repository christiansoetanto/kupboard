import React from 'react';

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
	const { currentMonth = new Date().getMonth(), className } = props;

	return (
		<div
			className={`flex w-full text-3xl items-center justify-center ${className}`}
		>
			{m_names[currentMonth]}
		</div>
	);
};

export default MonthTitle;
