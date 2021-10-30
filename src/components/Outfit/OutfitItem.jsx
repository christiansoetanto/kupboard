import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PrimaryClothingImages from "./PrimaryClothingImages";
import Card from "../UI/Card";
const OutfitItem = (props) => {
	const history = useHistory();

	const { clothings, tags, outfitId, name } = props.outfit;

	const handleCardClick = () => {
		history.push(`/outfits/${outfitId}`);
	};

	return (
		<div className={'rounded shadow-xl bg-white border p-1 cursor-pointer hover:bg-orange-200 transition duration-500 ease-in-out'} onClick={handleCardClick}>
			<div className=' text-center center items-center justify-center text-xl font-bold'>{name}</div>
			<div className={'flex items-center justify-center '}>
				<div style={{ maxWidth: "13rem" }} className={'flex flex-col space-y-1 items-center justify-center rounded-lg p-4'}>
					<PrimaryClothingImages clothings={clothings} />
				</div>
			</div>
		</div>
	);
};

export default OutfitItem;
