import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import ClothingItemPopup from "./ClothingItemPopup";
const ClothingListPopup = (props) => {
	const { userId, onSelect } = props;
	const { isLoading, error, sendRequest } = useHttp();

	const [clothings, setClothings] = useState([]);
	useEffect(() => {
		sendRequest({ url: `clothing/${userId}` }, (returnData) => {
			setClothings(returnData);
		});
	}, []);
	const selectImageHandler = (imageUrl) => {
		onSelect(imageUrl);
	};

	return (
		<div className='flex flex-row mb-5'>
			{clothings &&
				clothings.length > 0 &&
				clothings.map((e) => {
					return (
						<div key={e.clothingId}>
							<ClothingItemPopup imageUrl={e.imageUrl} name={e.name} onClick={selectImageHandler}></ClothingItemPopup>
						</div>
					);
				})}
		</div>
	);
};

export default ClothingListPopup;
