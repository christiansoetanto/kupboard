import React from 'react';
import range from 'lodash/range';

const GridCalendar = (props) => {
	const { dates, onDateClick } = props;
	return (
		<div className='grid grid-cols-7' onClick={onDateClick}>
			{dates}
		</div>
	);
};

export default GridCalendar;
