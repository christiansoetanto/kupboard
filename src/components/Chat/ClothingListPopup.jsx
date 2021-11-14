import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import useHttp from "../../hooks/use-http";
import ClothingItemPopup from "./ClothingItemPopup";
const ClothingListPopup = (props) => {
	const { userId, onSelect, clothingList } = props;
	const { isLoading, error, sendRequest } = useHttp();

	// const [clothings, setClothings] = useState([]);
	// useEffect(() => {
	// 	sendRequest({ url: `clothing/${userId}` }, (returnData) => {
	// 		setClothings(returnData);
	// 	});
	// }, []);
	const selectImageHandler = (imageUrl) => {
		onSelect(imageUrl);
	};

	return (
		// <div className='flex flex-row mb-5'>
		<Fragment>
			{clothingList &&
				clothingList.length > 0 &&
				clothingList.map((e) => {
					return (
							<ClothingItemPopup key={e.clothingId} imageUrl={e.imageUrl} name={e.name} onClick={selectImageHandler} />
					);
				})}
		</Fragment>
		// </div>
	);
};

export default ClothingListPopup;
