import React from "react";
import { useParams } from "react-router-dom";
import AddClothing from "./AddClothing";

const ClothingDetail = (props) => {
	let { id } = useParams();
	return (
		<div className='flex flex-col'>
			<AddClothing clothingId={id} />
			<div>Statistik</div>
		</div>
	);
};

export default ClothingDetail;
