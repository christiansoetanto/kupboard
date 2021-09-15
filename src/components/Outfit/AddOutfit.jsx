import React, { useRef, useState, useEffect, useContext } from "react";
import Card from "../UI/Card";
import useHttp from "../../hooks/use-http";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { v4 as uuidv4 } from "uuid";
import SelectTagList from "../Clothing/SelectTagList";
import AuthContext from "../../contexts/auth-context";
import CancelSvg from "../UI/CancelSvg";
import AddSvg from "../UI/AddSvg";
/*
Hat = 3
Shirt = 2
Pants = 1
alas kaki = 4
*/

const AddOutfit = (props) => {
	const history = useHistory();
	const { outfitId } = props;

	const isEdit = outfitId != null && outfitId != "";

	const { isLoading, error, sendRequest } = useHttp();

	const [selectedHat, setSelectedHat] = useState(null);
	const [selectedShirt, setSelectedShirt] = useState(null);
	const [selectedPants, setSelectedPants] = useState(null);
	const [selectedFootwear, setSelectedFootwear] = useState(null);

	const [hatList, setHatList] = useState(null);
	const [shirtList, setShirtList] = useState(null);
	const [pantsList, setPantsList] = useState(null);
	const [footwearList, setFootwearList] = useState(null);

	const [secondaryClothings, setSecondaryClothings] = useState([]);
	const [selectedSecondaryClothings, setSelectedSecondaryClothings] = useState([]);

	const [tags, setTags] = useState([]);
	const [defaultSelectedTags, setDefaultSelectedTags] = useState([]);

	const nameRef = useRef("");

	const primaryCategories = [
		{
			categoryId: 3,
			categoryName: "Hat",
			selectedState: selectedHat,
			setSelectedState: setSelectedHat,
			listState: hatList,
			setListState: setHatList,
			defaultImage: "https://img.icons8.com/dotty/80/000000/trilby.png",
		},
		{
			categoryId: 2,
			categoryName: "Shirt",
			selectedState: selectedShirt,
			setSelectedState: setSelectedShirt,
			listState: shirtList,
			setListState: setShirtList,
			defaultImage: "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-shirt-hygiene-kiranshastry-lineal-kiranshastry-2.png",
		},
		{
			categoryId: 1,
			categoryName: "Pants",
			selectedState: selectedPants,
			setSelectedState: setSelectedPants,
			listState: pantsList,
			setListState: setPantsList,
			defaultImage:
				"https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-pants-clothes-vitaliy-gorbachev-lineal-vitaly-gorbachev-1.png",
		},
		{
			categoryId: 4,
			categoryName: "Footwear",
			selectedState: selectedFootwear,
			setSelectedState: setSelectedFootwear,
			listState: footwearList,
			setListState: setFootwearList,
			defaultImage: "https://img.icons8.com/ios/50/000000/mens-shoe.png",
		},
	];

	const ctx = useContext(AuthContext);

	const submitHandler = () => {
		let submitData = {
			clothings: [],
			tags: [],
			name: nameRef.current.value,
		};
		primaryCategories.map((e) => {
			if (e.selectedState) {
				submitData.clothings.push({ clothingId: e.selectedState.clothingId });
			}
		});
		selectedSecondaryClothings.forEach((e) => {
			if (e) submitData.clothings.push({ clothingId: e.clothingId });
		});

		tags
			.filter((e) => e.isSelected === true)
			.map((e) => {
				if (e) submitData.tags.push({ tagId: e.tagId });
			});

		let url = "";
		let method = "";
		if (isEdit) {
			url = `outfit/${ctx.user.userId}/${outfitId}`;
			method = "PUT";
		} else {
			url = `outfit/${ctx.user.userId}`;
			method = "POST";
		}
		sendRequest(
			{
				url: url,
				method: method,
				body: submitData,
			},
			(result) => {
				console.log(result);
				history.push("/outfits");
			}
		);
	};

	const openPopupSelectClothing = (clothings, id = null) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='flex flex-col relative bg-white rounded border border-gray-900 py-2 px-4'>
						<div className='flex flex-row justify-between items-center mb-8 border-b-2 border-gray-200'>
							<div className='text-2xl font-semibold '>Pick your clothing</div>
							<div className='hover:text-gray-500' onClick={onClose}>
								<CancelSvg />
							</div>
						</div>
						<div className='grid grid-cols-3'>
							{clothings.map((e) => {
								return (
									<div
										key={e.clothingId}
										className='w-28'
										onClick={() => {
											selectClothing(e.categoryId, e.clothingId, e.imageUrl, id);
											onClose();
										}}>
										<img src={e.imageUrl}></img>
									</div>
								);
							})}
						</div>
					</div>
				);
			},
		});
	};
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
		const clothings = primaryCategories.filter((e) => e.categoryId === categoryId)[0].listState;
		console.log(clothings);
		if (clothings) {
			console.log("udah pernah ada");
			if (clothings.length > 0) {
				openPopupSelectClothing(clothings, null);
			} else openPopupNoClothing();
		} else {
			console.log("Fetch");
			sendRequest({ url: `clothing/${ctx.user.userId}/category/${categoryId}` }, (returnData) => {
				const clothings = [];
				returnData.forEach((e) => {
					clothings.push({
						clothingId: e.clothingId,
						imageUrl: e.imageUrl,
						categoryId: categoryId,
					});
				});
				if (clothings.length > 0) {
					primaryCategories.filter((e) => e.categoryId === categoryId)[0].setListState(clothings);
					openPopupSelectClothing(clothings, null);
				} else {
					primaryCategories.filter((e) => e.categoryId === categoryId)[0].setListState([]);
					openPopupNoClothing();
				}
			});
		}
	};
	const getSecondaryClothings = (id) => {
		if (secondaryClothings.length > 0) openPopupSelectClothing(secondaryClothings, id);
		else openPopupNoClothing();
	};

	const selectClothing = (categoryId, clothingId, imageUrl, id) => {
		if (primaryCategories.map((e) => e.categoryId).includes(categoryId)) {
			primaryCategories
				.filter((e) => e.categoryId === categoryId)[0]
				.setSelectedState({
					clothingId: clothingId,
					imageUrl: imageUrl,
					categoryId: categoryId,
				});
		} else {
			if (id) {
				setSelectedSecondaryClothings((prev) => {
					let secondaryClothings = [];
					secondaryClothings = prev.map((obj) =>
						obj.id === id
							? {
									...obj,
									imageUrl: imageUrl,
									clothingId: clothingId,
									categoryId: categoryId,
							  }
							: obj
					);

					return secondaryClothings;
				});
			} else {
				setSelectedSecondaryClothings((prev) => [
					...prev,
					{
						id: uuidv4(),
						imageUrl: imageUrl,
						clothingId: clothingId,
						categoryId: categoryId,
					},
				]);
			}
		}
	};

	const removeSecondaryClothing = (id) => {
		setSelectedSecondaryClothings((prev) => {
			let secondaryClothings = [];
			secondaryClothings = prev.filter((e) => e.id !== id).map((e) => e);

			console.log(secondaryClothings);
			return secondaryClothings;
		});
	};

	const deleteHandler = () => {
		sendRequest(
			{
				url: `outfit/${ctx.user.userId}/${outfitId}`,
				method: "DELETE",
			},
			(result) => {
				console.log(result);
				history.push("/outfits");
			}
		);
	};

	useEffect(async () => {
		const loadDefaultOutfit = async () => {
			const transformOutfit = (returnData) => {
				const transformClothing = (clothings) => {
					clothings.map((e) => {
						if (primaryCategories.map((pc) => pc.categoryId).includes(e.category.categoryId)) {
							primaryCategories
								.filter((pc) => pc.categoryId === e.category.categoryId)[0]
								.setSelectedState({ clothingId: e.clothingId, imageUrl: e.imageUrl, categoryId: e.category.categoryId });
						} else {
							setSelectedSecondaryClothings((prev) => [
								...prev,
								{
									id: uuidv4(),
									imageUrl: e.imageUrl,
									clothingId: e.clothingId,
									categoryId: e.categoryId,
								},
							]);
						}
					});
				};

				const transformTags = (tags) => {
					setDefaultSelectedTags(tags);
				};

				transformClothing(returnData.clothings);
				transformTags(returnData.tags);
				nameRef.current.value = returnData.name;
			};

			sendRequest({ url: `outfit/${ctx.user.userId}/${outfitId}` }, transformOutfit);
		};

		const loadTags = async () => {
			await sendRequest({ url: `tag/${ctx.user.userId}` }, (returnData) => {
				const allTags = [];
				for (const e of returnData) {
					allTags.push({ ...e, isSelected: false, isEdit: false });
				}
				const uniqueTags = [];

				allTags.map((x) => (uniqueTags.filter((a) => a.tagId === x.tagId).length > 0 ? null : uniqueTags.push(x)));
				setTags(uniqueTags);
			});
		};

		const loadSecondaryClothings = async () => {
			await sendRequest(
				{
					url: `clothing/${ctx.user.userId}/secondary`,
				},
				(returnData) => {
					const clothings = [];
					returnData.forEach((e) => {
						clothings.push({
							clothingId: e.clothingId,
							imageUrl: e.imageUrl,
							categoryId: e.category.categoryId,
						});
					});
					setSecondaryClothings(clothings);
				}
			);
		};

		await loadTags();
		await loadSecondaryClothings();
		if (isEdit) await loadDefaultOutfit();
	}, []);

	useEffect(() => {
		if (tags && tags.length > 0) {
			const selectedTags = tags.map((e) => {
				return {
					...e,
					isSelected: defaultSelectedTags.map((x) => x.tagId).includes(e.tagId),
				};
			});
			setTags(selectedTags);
		}
	}, [defaultSelectedTags]);

	return (
		<div>
			<div className='flex flex-col md:flex-row md:justify-between'>
				<div className='flex w-3/5'>
					<div className='flex flex-col items-center justify-start  gap-x-1 gap-y-3 border-8 p-3 m-3 w-full'>
						<div className='text-lg md:text-2xl border-b-2 w-full text-center'>Main Outfit</div>
						{primaryCategories.map((e) => {
							return (
								<div
									key={e.categoryId}
									className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-28 cursor-pointer'
									style={{ minHeight: "5rem" }}
									onClick={() => {
										getClothing(e.categoryId);
									}}>
									{e.selectedState ? (
										<div>
											<img src={e.selectedState.imageUrl} className='w-28'></img>
											<button
												onClick={(event) => {
													event.stopPropagation();
													e.setSelectedState(null);
												}}>
												DELETE THIS
											</button>
										</div>
									) : (
										<img src={e.defaultImage} alt='' />
									)}
								</div>
							);
						})}
					</div>
					<div className='flex flex-col items-center justify-start w-full gap-x-1 gap-y-3 border-8 p-3 m-3'>
						<div className='text-lg md:text-2xl border-b-2 w-full text-center'>Optional</div>
						{selectedSecondaryClothings.length > 0 &&
							selectedSecondaryClothings.map((e) => {
								return (
									<div
										key={e.id}
										className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-28 cursor-pointer'
										style={{ minHeight: "5rem" }}
										onClick={() => {
											getSecondaryClothings(e.id);
										}}>
										<img src={e.imageUrl} className='w-32 h-32'></img>
										<button
											onClick={(event) => {
												event.stopPropagation();
												removeSecondaryClothing(e.id);
											}}>
											DELETE THIS
										</button>
									</div>
								);
							})}
						<div
							className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-28 cursor-pointer text-gray-500 hover:text-gray-700'
							style={{ minHeight: "5rem" }}
							onClick={() => {
								getSecondaryClothings();
							}}>
							<AddSvg />
						</div>
					</div>
				</div>
				<div className='flex flex-col space-y-4 w-full md:w-1/3 mt-4 md:mt-10'>
					<span className=''>
						<label htmlFor='outfit-name'>Outfit Name</label>
						<br />
						<input type='text' name='' id='outfit-name' className='form-input rounded w-full' ref={nameRef} />
					</span>

					<div>
						<SelectTagList
							tags={tags}
							onSetTags={(tags) => {
								setTags(tags);
							}}
						/>
					</div>

					<div>
						<label htmlFor='chbx-set-date' className='cursor-pointer'>
							<input type='checkbox' id='chbx-set-date' className='cursor-pointer' />
							<span className='ml-2'>Set a date for this outfit? </span>
						</label>
					</div>

					<div className='w-full h-32 bg-indigo-500 flex items-center justify-center text-white border rounded border-blue-400'>
						<p>Ini calendar</p>
					</div>

					{isEdit && (
						<div onClick={deleteHandler} className='p-4 rounded border-2 border-blue-200 hover:bg-blue-500 hover:text-white'>
							Delete
						</div>
					)}
					<button className='p-4 rounded border-2 border-blue-200 hover:bg-blue-500 hover:text-white' onClick={submitHandler}>
						{isEdit ? "Update Outfit" : "Add Outfit"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AddOutfit;
