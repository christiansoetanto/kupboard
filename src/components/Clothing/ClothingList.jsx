import React from "react";
import ClothingItem from "./ClothingItem";
import { Link } from "react-router-dom";
const ClothingList = (props) => {
	const { clothingList } = props;
	if (clothingList.length === 0) return <h2 className=''>No clothing found.</h2>;
	else
		return (
			<div className='grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3'>
				<Link className='rounded shadow-xl bg-white border p-1 flex items-center justify-center w-full' to='/add-clothing'>
					<div className='text-center font-semibold'>Add more clothing?</div>
				</Link>
				{clothingList.map((c) => {
					return <ClothingItem key={c.clothingId} clothing={c} />;
				})}
			</div>
		);
};

export default ClothingList;
