import React, { Fragment, useContext, useEffect, useState } from "react";
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

	const [randomGeneratedColorHex, setRandomGeneratedColorHex] = useState("#efefef");

	const { error, isLoading, sendRequest } = useHttp();
	const deleteHandler = () => {
		onDelete(scheduleId, scheduleDate);
	};

	// generatedColorHex = '#' + crypto.createHash('md5').update(outfitId).digest('hex').substr(0, 6);
	// console.log(generatedColorHex);
	// setRandomGeneratedColorHex(generatedColorHex);

	const openModal = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<PopUp title={outfitName} onClose={onClose}>
						<PrimaryClothingImages clothings={clothings} />
						<div
							className='text-xs text-justify hover:underline hover:text-red-500 flex items-center font-semibold cursor-pointer'
							onClick={() => {
								deleteHandler();
								onClose();
							}}>
							<DeleteSvg />
							Remove
						</div>
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
					<div className='bg-yellow-300 m-2 whitespace-nowrap overflow-hidden overflow-ellipsis rounded-md px-2 text-gray-800 cursor-pointer font-semibold'>
						{outfitName}
					</div>
				</a>
			</div>

			<ReactTooltip id={tooltip_id} type='light' effect='solid' className={"bg-white opacity-100 shadow-md rounded-xl"}>
				<div>{outfitName}</div>
				<div>
					<PrimaryClothingImages clothings={clothings} />
				</div>
			</ReactTooltip>
		</Fragment>
	);
};

export default ScheduleOutfitItem;
