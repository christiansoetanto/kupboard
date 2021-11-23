import React, { useEffect, useState, useContext } from "react";
import useHttp from "../../hooks/use-http";
import GridCalendar from "./GridCalendar";
import MonthTitle from "./MonthTitle";
import AuthContext from "../../contexts/auth-context";
import PrimaryClothingImages from "../Outfit/PrimaryClothingImages";
import { confirmAlert } from "react-confirm-alert";
import CancelSvg from "../UI/CancelSvg";
import PopUp from "../UI/PopUp";
const Schedule = (props) => {
	const ctx = useContext(AuthContext);

	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
	const [dateCell, setDateCell] = useState([]);
	const [outfitList, setOutfitList] = useState(null);
	const [outfitScheduleList, setOutfitScheduleList] = useState([]);

	const { isLoading, error, sendRequest } = useHttp();
	const { sendRequest: getOutfits } = useHttp();
	const { sendRequest: insertNewSchedule } = useHttp;

	function WithoutTime(dateTime) {
		var date = new Date(dateTime.getTime());
		date.setHours(0, 0, 0, 0);
		return date;
	}


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
		await sendRequest(
			{
				url: `schedule/${ctx.user.userId}/${currentMonth + 1}/${currentYear}`,
			},
			(returnData) => {
				// console.log(WithoutTime(new Date(returnData[0].scheduleDate)))
				// console.log(WithoutTime(new Date()))
				// console.log(returnData)
				setOutfitScheduleList(returnData);
				

				returnData.map((rd) => {
					let idx = calendar.findIndex((c) => {
						// if (new Date(c.date) == 1637625600000) {
						// console.log(WithoutTime(new Date(c.date)))
						// }
						return new Date(c.date).getDate() == new Date(rd.scheduleDate).getDate();
					});
					console.log(idx)
					if (idx !== -1) {
						calendar[idx].schedule.map((scheduleItem) => scheduleItem.outfitId).includes(rd.outfitId) || calendar[idx].schedule.push(rd);
					}
				});
				setDateCell(calendar);
			}
		);
	};

	useEffect(async () => {
		buildCalendar();
	}, [currentMonth, currentYear]);

	useEffect(() => {
		getOutfits(
			{
				url: `outfit/${ctx.user.userId}/`,
			},
			(returnData) => {
				setOutfitList(returnData);
			}
		);
	}, []);

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

	const addOutfitToSchedule = (date, outfit) => {
		const newOutfitToBeAdded = {
			outfitId: outfit.outfitId,
			outfitName: outfit.name,
			scheduleDate: new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}Z`),
			clothings: outfit.clothings,
		};

		sendRequest(
			{
				url: `schedule/${ctx.user.userId}/`,
				method: "POST",
				body: newOutfitToBeAdded,
			},
			() => {
				buildCalendar();
			}
		);
	};
	const deleteHandler = async (scheduleId, scheduleDate) => {
		await sendRequest({ url: `schedule/${ctx.user.userId}/${scheduleId}`, method: "DELETE" }, () => {
			buildCalendar();
		});
	};

	const dateClickHandler = (date) => {
		if (!outfitList) {
			confirmAlert({
				customUI: ({ onClose }) => {
					return <PopUp title={`Loading Your Outfit`} onClose={onClose}></PopUp>;
				},
			});
		} else if (outfitList.length == 0) {
			confirmAlert({
				customUI: ({ onClose }) => {
					return <PopUp title={`You don't have any outfit yet, try creating one`} onClose={onClose}></PopUp>;
				},
			});
		} else if (outfitList.length > 0) {
			confirmAlert({
				customUI: ({ onClose }) => {
					return (
						<PopUp title={"Pick Your Outfit"} onClose={onClose}>
							<div className='flex space-x-4 flex-wrap px-12 py-4'>
								{outfitList.map((e) => {
									let idxCalendar = dateCell.findIndex((c) => +new Date(c.date) === +new Date(date));

									if (!dateCell[idxCalendar].schedule.map((scheduleItem) => scheduleItem.outfitId).includes(e.outfitId)) {
										return (
											<div
												data-outfitid={e.outfitId}
												key={e.outfitId}
												onClick={() => {
													addOutfitToSchedule(date, e);
													onClose();
												}}
												className='border-2 cursor-pointer hover:bg-orange-200 border-gray-400 rounded px-8'>
												<PrimaryClothingImages key={e.outfitId} clothings={e.clothings} />
											</div>
										);
									}
								})}
							</div>
						</PopUp>
					);
				},
			});
		}
	};

	return (
		<div className='flex flex-col'>
			<MonthTitle className='mb-8' currentMonth={currentMonth} currentYear={currentYear} decreaseMonth={decreaseMonth} increaseMonth={increaseMonth} />
			<GridCalendar dateCell={dateCell} onClick={dateClickHandler} onDelete={deleteHandler} />
		</div>
	);
};

export default Schedule;
