import React from "react";
import ClothingItem from "./ClothingItem";
import { Link } from "react-router-dom";
const ClothingList = (props) => {
	const { clothingList, isLoading } = props;

	if (isLoading)
		return (
			<div className='grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3'>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
			</div>
		);

	if (clothingList && clothingList.length > 0) {
		return clothingList.map((c) => {
			<ClothingItem key={c.clothingId} clothing={c} />;
		});
	} else {
		return (
			<div className='grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3'>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'>NO CLOTHING FOUND</div>
			</div>
		);
	}
};

export default ClothingList;
