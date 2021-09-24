import React from 'react';

const DateCell = (props) => {
	const { date, onClick } = props;

	const dateClickHandler = () => onClick(date);

	return (
		<div
			className='flex items-start justify-center border border-gray-300'
			data-date={date}
			style={{ minHeight: '6rem' }}
            onClick={dateClickHandler}
		>
			{date.getDate()}
		</div>
	);
};

export default DateCell;
