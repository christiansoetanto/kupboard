import React, { Fragment, useContext } from "react";
import ReactTooltip from "react-tooltip";
import PrimaryClothingImages from "../Outfit/PrimaryClothingImages";
import { confirmAlert } from "react-confirm-alert";
import PopUp from "../UI/PopUp";
import DeleteSvg from "../UI/DeleteSvg";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../contexts/auth-context";

const ScheduleOutfitItem = (props) => {
	const { scheduleId, outfitId, outfitName, clothings, scheduleDate, onDelete } = props;
	const tooltip_id = `${outfitId}`;
	const ctx = useContext(AuthContext);

	const { error, isLoading, sendRequest } = useHttp();
	const deleteHandler = () => {
		onDelete(scheduleId, scheduleDate);
	};

	const openModal = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<PopUp title={outfitName} onClose={onClose}>
						<PrimaryClothingImages clothings={clothings} />
						<button
							type='button'
							onClick={() => {
								deleteHandler();
								onClose();
							}}
							className={"border-black bg-green-500"}>
							DELETE THIS
						</button>
					</PopUp>
				);
			},
		});
	};

	return (
		<Fragment>
			<div
				onClick={(event) => {
					event.stopPropagation();
					openModal();
				}}>
				<a data-tip data-for={tooltip_id}>
					<div className='bg-green-500 m-2 whitespace-nowrap overflow-hidden overflow-ellipsis'>{outfitName}</div>
				</a>
			</div>

			<ReactTooltip id={tooltip_id} type='light' effect='solid' className={"bg-white opacity-100"}>
				<div>{outfitName}</div>
				<div>
					<PrimaryClothingImages clothings={clothings} />
				</div>
			</ReactTooltip>
		</Fragment>
	);
};

export default ScheduleOutfitItem;
