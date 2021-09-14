import React, { useRef, useState, useEffect } from "react";
import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { v4 as uuidv4 } from "uuid";
import SelectTagList from "../Clothing/SelectTagList";
/*
topi = 3
baju = 2
celana = 1
alas kaki = 4
*/

const AddOutfit = (props) => {
	const { isLoading, error, sendRequest } = useHttp();
	const [selectedSecondaryClothings, setSelectedSecondaryClothings] = useState([]);
	const [selectedTopi, setSelectedTopi] = useState(null);
	const [selectedBaju, setSelectedBaju] = useState(null);
	const [selectedCelana, setSelectedCelana] = useState(null);
	const [selectedAlasKaki, setSelectedAlasKaki] = useState(null);
	const [clothingOptions, setClothingOptions] = useState([]);
	const [secondaryClothings, setSecondaryClothings] = useState([]);
	const [tags, setTags] = useState([]);
	const primaryCategories = [
		{ categoryId: 3, categoryName: "Topi", state: selectedTopi, updateState: setSelectedTopi },
		{ categoryId: 2, categoryName: "Baju", state: selectedBaju, updateState: setSelectedBaju },
		{ categoryId: 1, categoryName: "Celana", state: selectedCelana, updateState: setSelectedCelana },
		{ categoryId: 4, categoryName: "Alas Kaki", state: selectedAlasKaki, updateState: setSelectedAlasKaki },
	];

	const openPopupNoClothing = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='custom-ui'>
						no clothings
						<button
							onClick={() => {
								onClose();
							}}>
							Close
						</button>
					</div>
				);
			},
		});
	};

	const getClothing = (categoryId) => {
		sendRequest({ url: "clothing/" + "xu7Di7YPp4hvrN250XWwqcy7YVLY" + "/category/" + categoryId }, (returnData) => {
			const clothings = [];
			returnData.forEach((e) => {
				clothings.push({ clothingId: e.clothingId, imageUrl: e.imageUrl, categoryId: categoryId });
			});
			if (clothings.length > 0) setClothingOptions(clothings);
			else openPopupNoClothing();
		});
	};

	const selectClothing = (categoryId, clothingId, imageUrl, id) => {
		if (primaryCategories.map((e) => e.categoryId).includes(categoryId)) {
			primaryCategories.filter((e) => e.categoryId === categoryId)[0].updateState({ clothingId: clothingId, imageUrl: imageUrl, categoryId: categoryId });
		} else {
			if (id) {
				setSelectedSecondaryClothings((prev) => {
					let secondaryClothings = [];
					secondaryClothings = prev.map((obj) => (obj.id === id ? { ...obj, imageUrl: imageUrl, clothingId: clothingId, categoryId: categoryId } : obj));

					return secondaryClothings;
				});
			} else {
				setSelectedSecondaryClothings((prev) => [...prev, { id: uuidv4(), imageUrl: imageUrl, clothingId: clothingId, categoryId: categoryId }]);
			}
		}
	};

	const openPopup = (clothings, id = null, isSecondary = false) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='custom-ui'>
						{clothings.map((e) => {
							return (
								<div
									key={e.clothingId}
									className='w-16 h-16'
									onClick={() => {
										selectClothing(e.categoryId, e.clothingId, e.imageUrl, id);
										onClose();
									}}>
									<img src={e.imageUrl}></img>
								</div>
							);
						})}
						<button
							onClick={() => {
								onClose();
							}}>
							close
						</button>
					</div>
				);
			},
			afterClose: () => {
				if (!isSecondary) setClothingOptions([]);
			},
		});
	};

	useEffect(() => {
		if (clothingOptions.length > 0) openPopup(clothingOptions, null, false);
	}, [clothingOptions, openPopup]);

	useEffect(() => {
		sendRequest({ url: "clothing/" + "xu7Di7YPp4hvrN250XWwqcy7YVLY" + "/secondary" }, (returnData) => {
			const clothings = [];
			returnData.forEach((e) => {
				clothings.push({ clothingId: e.clothingId, imageUrl: e.imageUrl, categoryId: e.category.categoryId });
			});
			setSecondaryClothings(clothings);
		});
	}, []);

	useEffect(async () => {
		await sendRequest({ url: "tag/xu7Di7YPp4hvrN250XWwqcy7YVLY" }, (returnData) => {
			const allTags = [];
			for (const e of returnData) {
				allTags.push({ ...e, isSelected: false, isEdit: false });
			}
			const uniqueTags = [];

			allTags.map((x) => (uniqueTags.filter((a) => a.tagId === x.tagId).length > 0 ? null : uniqueTags.push(x)));
			setTags(uniqueTags);
		});
	}, [sendRequest]);

	const getSecondaryClothings = (id) => {
		if (secondaryClothings.length > 0) openPopup(secondaryClothings, id, true);
		else openPopupNoClothing();
	};

	return (
		<Card>
			<SelectTagList
				tags={tags}
				onSetTags={(tags) => {
					setTags(tags);
				}}
			/>
			<div className='grid grid-cols-2 '>
				<div className='grid grid-rows gap-x-1 gap-y-3 border-8 p-3 m-3'>
					utama
					<div
						className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-96 h-96'
						onClick={() => {
							getClothing(3);
						}}>
						{selectedTopi ? <img src={selectedTopi.imageUrl} className='w-32 h-32'></img> : <div>add topi</div>}
					</div>
					<div
						className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-96 h-96'
						onClick={() => {
							getClothing(2);
						}}>
						{selectedBaju ? <img src={selectedBaju.imageUrl} className='w-32 h-32'></img> : <div>add baju</div>}
					</div>
					<div
						className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-96 h-96'
						onClick={() => {
							getClothing(1);
						}}>
						{selectedCelana ? <img src={selectedCelana.imageUrl} className='w-32 h-32'></img> : <div>add celana</div>}
					</div>
					<div
						className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-96 h-96'
						onClick={() => {
							getClothing(4);
						}}>
						{selectedAlasKaki ? <img src={selectedAlasKaki.imageUrl} className='w-32 h-32'></img> : <div>add alas kaki</div>}
					</div>
				</div>
				<div className='grid grid-rows gap-x-1 gap-y-3 border-8 p-3 m-3'>
					opsional
					{selectedSecondaryClothings.length > 0 &&
						selectedSecondaryClothings.map((e) => {
							return (
								<div
									key={e.id}
									className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-96 h-96'
									onClick={() => {
										getSecondaryClothings(e.id);
									}}>
									<img src={e.imageUrl} className='w-32 h-32'></img>
								</div>
							);
						})}
					<div
						className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-96 h-96'
						onClick={() => {
							getSecondaryClothings();
						}}>
						<div>add</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default AddOutfit;
