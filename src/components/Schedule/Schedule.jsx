import React, { useEffect, useState, useContext } from "react";
import useHttp from "../../hooks/use-http";
import GridCalendar from "./GridCalendar";
import MonthTitle from "./MonthTitle";
import AuthContext from "../../contexts/auth-context";
const Schedule = (props) => {
	const ctx = useContext(AuthContext);

	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

	const [dateCell, setDateCell] = useState([]);
	const { isLoading, error, sendRequest } = useHttp();

	useEffect(async () => {
		const buildCalendar = async () => {
			const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
			const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
			let firstDate = 1;
			var calendar = [];

			for (let index = 0; index < 42; index++) {
				if (index >= firstDayOfMonth && firstDate <= lastDateOfMonth) {
					calendar.push({
						date: new Date(currentYear, currentMonth, firstDate),
						key: new Date(currentYear, currentMonth, firstDate),
						showDate: true,
						schedule: [],
					});
					firstDate++;
				} else {
					calendar.push({
						showDate: false,
					});
				}
			}

			sendRequest({ url: `schedule/${ctx.user.userId}/${currentMonth + 1}/${currentYear}` }, (returnData) => {
				returnData.map((rd) => {
					let idx = calendar.findIndex((c) => new Date(c.date).getTime() == new Date(new Date(rd.scheduleDate).setHours(0, 0, 0, 0)).getTime());
					if (idx !== -1) {
						calendar[idx].schedule.push(rd);
					}
				});
				setDateCell(calendar);
			});
		};

		buildCalendar();
	}, [currentMonth, currentYear]);

	const decreaseMonth = () => {
		setCurrentMonth((prevState) => {
			if (prevState == 0) {
				prevState = 12;
				setCurrentYear((prevState) => --prevState);
			}
			return --prevState;
		});
	};

	const increaseMonth = () => {
		setCurrentMonth((prevState) => {
			if (prevState == 11) {
				prevState = -1;
				setCurrentYear((prevState) => ++prevState);
			}
			return ++prevState;
		});
	};

	const dateClickHandler = (date) => {
		alert(`you clicked on ${date}`);
	};

	return (
		<div className='flex flex-col'>
			<MonthTitle className='mb-8' currentMonth={currentMonth} currentYear={currentYear} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} />
			<GridCalendar dateCell={dateCell} onClick={dateClickHandler} />
		</div>
	);
};

export default Schedule;
