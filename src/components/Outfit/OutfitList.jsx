import React, { Fragment } from "react";
import OutfitItem from "./OutfitItem";
import { Link } from "react-router-dom";
const OutfitList = (props) => {
	const { outfitList, isLoading } = props;
	if (isLoading)
		return (
			<Fragment>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
			</Fragment>
		);
	if (outfitList && outfitList.length > 0) {
		return (
			<Fragment>
				{outfitList.map((item) => (
					<OutfitItem key={item.outfitId} outfit={item} />
				))}
			</Fragment>
		);
	} else {
		return <div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'>OUTFIT NOT FOUND</div>;
	}
};

export default OutfitList;
