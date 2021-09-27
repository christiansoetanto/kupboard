import React from "react";
import ScheduleOutfitItem from "./ScheduleOutfitItem";
const DateCell = (props) => {
	const { date, schedule, onClick } = props;

	const dateClickHandler = () => onClick(date);

	return (
		<div className='justify-center border border-gray-300' data-date={date} style={{ minHeight: "6rem" }} onClick={dateClickHandler}>
			<div className='items-center text-center'>{date.getDate()}</div>
			{schedule.map((e, i) => (
				<ScheduleOutfitItem key={i} outfitId={e.outfitId} outfitName={e.outfitName ?? `No name :( ${e.outfitId}`} clothings={e.clothings} />
			))}
		</div>
	);
};

export default DateCell;
