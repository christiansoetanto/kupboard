import React, { useState, useEffect } from "react";
import DateCell from "./DateCell";
import ReactTooltip from "react-tooltip";
const GridCalendar = (props) => {
	const { dateCell, onClick, onDelete } = props;

	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

	const dateClickHandler = (date) => {
		onClick(date);
	};

	const deleteHandler = (scheduleId, scheduleDate) => {
		onDelete(scheduleId, scheduleDate);
	};

	return (
		<div className='flex flex-col gap-y-4'>
			<div className='grid grid-cols-7'>
				{daysOfWeek.map((e, i) => {
					return (
						<div key={i} className={`text-center ${e === "Sunday" && "text-red-600"}`}>
							{e}
						</div>
					);
				})}
			</div>
			<div className='grid grid-cols-7'>
				{dateCell.map((e, index) => {
					if (e.showDate) {
						return (
							<DateCell
								className='flex items-center justify-center border border-gray-300'
								style={{ minHeight: "6rem" }}
								date={e.date}
								key={index}
								schedule={e.schedule}
								onClick={dateClickHandler}
								onDelete={deleteHandler}
							/>
						);
					} else {
						return <div key={index} className='bg-gray-500 w-full h-full'></div>;
					}
				})}
			</div>
		</div>
	);
};

export default GridCalendar;
