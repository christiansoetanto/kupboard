import React from 'react';
import ClothingItem from './ClothingItem';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
const ClothingList = (props) => {
	const { clothingList, isLoading } = props;

	if (isLoading)
		return (
			<Fragment>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
				<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'></div>
			</Fragment>
		);

	if (clothingList && clothingList.length > 0) {
		return clothingList.map((c) => (
			<ClothingItem key={c.clothingId} clothing={c} />
		));
	} else {
		return (
			<div className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-full h-72'>
				NO CLOTHING FOUND
			</div>
		);
	}
};

export default ClothingList;
