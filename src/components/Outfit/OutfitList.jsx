import React from "react";
import OutfitItem from "./OutfitItem";
import { Link } from "react-router-dom";
const OutfitList = (props) => {
	const { outfitList, isLoading } = props;
	if (isLoading)
		return (
			<div className='grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3'>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
			</div>
		);
	if (outfitList && outfitList.length > 0) {
		return (
			<div className='grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3'>
				{outfitList.map((item) => (
					<OutfitItem key={item.outfitId} outfit={item} />
				))}
			</div>
		);
	} else {
		return (
			<div className='grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3'>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'>NO OUTFIT FOUND</div>
			</div>
		);
	}
};

export default OutfitList;
