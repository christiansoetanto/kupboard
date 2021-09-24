import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import PrimaryClothingImages from "./PrimaryClothingImages";
import Card from "../UI/Card";
const OutfitItem = (props) => {
	const history = useHistory();

	const { clothings, tags, outfitId } = props.outfit;

	const handleCardClick = () => {
		history.push(`/outfits/${outfitId}`);
	};

	return (
		<div className='rounded shadow-xl bg-white border p-1' onClick={handleCardClick}>
			<div className='flex items-center justify-center'>
				<div style={{ maxWidth: "13rem" }} className='flex flex-col space-y-1 items-center justify-center'>
					<PrimaryClothingImages
						hat={clothings.filter((e) => e.category.categoryId == 3)[0]?.imageUrl}
						shirt={clothings.filter((e) => e.category.categoryId == 2)[0]?.imageUrl}
						pants={clothings.filter((e) => e.category.categoryId == 1)[0]?.imageUrl}
						footwear={clothings.filter((e) => e.category.categoryId == 4)[0]?.imageUrl}
					/>
				</div>
			</div>
		</div>
	);
};

export default OutfitItem;
