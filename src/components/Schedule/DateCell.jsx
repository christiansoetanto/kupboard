import React from 'react';

const DateCell = (props) => {
	const { date } = props;

	const onDateClick = () => {
		alert(`you clicked on ${date}`);
	};

	return (
		<div
			className='flex items-start justify-center border border-gray-300'
			data-date={date}
			style={{ minHeight: '6rem' }}
            onClick={onDateClick}
		>
			{date.getDate()}
		</div>
	);
};

export default DateCell;
