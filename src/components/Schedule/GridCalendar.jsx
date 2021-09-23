import React from 'react';
import range from 'lodash/range';

const GridCalendar = (props) => {
	const { dateCells, onDateClick } = props;
	return (
		<div className='grid grid-cols-7' onClick={onDateClick}>
			{dateCells}
		</div>
	);
};

export default GridCalendar;
