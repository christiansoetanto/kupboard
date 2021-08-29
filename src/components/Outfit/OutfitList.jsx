import React from "react";
import OutfitItem from "./OutfitItem";
import { Link } from "react-router-dom";
const OutfitList = (props) => {
	const { outfitList } = props;
	if (outfitList.length === 0) return <h2 className=''>No Outfit found.</h2>;
	else
		return (
			<div className='grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3'>
				<div className='rounded shadow-xl bg-white border p-1'>
					<Link to='/add-outfit'>Add more Outfit?</Link>
				</div>

				{outfitList.map((item) => (
					<OutfitItem key={item.outfitId} outfit={item} />
				))}
			</div>
		);
};

export default OutfitList;
