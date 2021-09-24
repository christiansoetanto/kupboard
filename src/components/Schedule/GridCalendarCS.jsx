import React, { useState } from "react";
import range from "lodash/range";
import DateCell from "./DateCell";

const GridCalendarCS = (props) => {
	const { dateCell, currentYear, onDateClick } = props;
	const [state, setstate] = useState(1);

	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	return (
		<div className='flex flex-col gap-y-4'>
			<div
				className='grid grid-cols-7'
				onClick={() => {
					setstate((prev) => prev + 1);
				}}>
				random state = {state}
			</div>
			<div className='grid grid-cols-7'>
				{daysOfWeek.map((e) => {
					return <div className={`text-center ${e === "Sunday" && "text-red-600"}`}>{e}</div>;
				})}
			</div>
			<div className='grid grid-cols-7' onClick={onDateClick}>
				{dateCell.map((e, index) => {
					if (e.showDate) {
						return <DateCell className='flex items-center justify-center border border-gray-300' style={{ minHeight: "6rem" }} date={e.date} key={e.key} />;
					} else {
						return <div key={index + 100} className='bg-gray-500 w-full h-full'></div>;
					}
				})}
			</div>
		</div>
	);
};

export default GridCalendarCS;
