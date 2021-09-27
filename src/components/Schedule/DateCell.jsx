import React from 'react';
import ScheduleOutfitItem from './ScheduleOutfitItem';
const DateCell = (props) => {
	const { date, schedule, onClick } = props;

	const dateClickHandler = () => {
		console.log(date)
		onClick(
			// Karna di js datenya aneh
			date
		);
	};

	return (
		<div
			className='justify-center border border-gray-300 h-auto pb-8'
			data-date={date}
			style={{ minHeight: '6rem' }}
			onClick={dateClickHandler}
		>
			<div className='items-center text-center'>{date.getDate()}</div>
			{schedule.map((e, i) => (
				<ScheduleOutfitItem
					key={i}
					outfitId={e.outfitId}
					outfitName={e.outfitName ?? `No name :( ${e.outfitId}`}
					clothings={e.clothings}
				/>
			))}
		</div>
	);
};

export default DateCell;
