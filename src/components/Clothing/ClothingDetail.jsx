import React from "react";
import { useParams } from "react-router-dom";
import AddClothing from "./AddClothing";
import ClothingStatistics from "./ClothingStatistics";

const ClothingDetail = (props) => {
	let { id } = useParams();
	return (
		<div className='flex flex-col space-y-10'>
			<AddClothing clothingId={id} />
			<ClothingStatistics />
		</div>
	);
};

export default ClothingDetail;
