import React from "react";
import ScheduleOutfitItem from "./ScheduleOutfitItem";
const DateCell = (props) => {
  const { date, schedule, onClick, onDelete } = props;

  const dateClickHandler = () => {
    onClick(
      // Karna di js datenya aneh
      date
    );
  };

  const deleteHandler = (scheduleId, scheduleDate) => {
    onDelete(scheduleId, scheduleDate);
  };

  return (
    <div
      className={`justify-center border border-gray-300 h-auto pb-8 ${
        +new Date().setHours(0, 0, 0, 0) === +new Date(date) && "bg-amber-100"
      }`}
      data-date={date}
      style={{ minHeight: "6rem" }}
      onClick={dateClickHandler}
    >
      <div className='items-center text-center text-sm'>{date.getDate()}</div>
      {schedule.map((e, i) => (
        <ScheduleOutfitItem
          key={i}
          scheduleId={e.scheduleId}
          outfitId={e.outfitId}
          outfitName={e.outfitName ?? `No name :( ${e.outfitId}`}
          clothings={e.clothings}
          scheduleDate={e.scheduleDate}
          onDelete={deleteHandler}
        />
      ))}
    </div>
  );
};

export default DateCell;
