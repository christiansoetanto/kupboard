import React, { useRef, useState, useEffect, useContext } from 'react';
import Card from '../UI/Card';
import useHttp from '../../hooks/use-http';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { v4 as uuidv4 } from 'uuid';
import SelectTagList from '../Clothing/SelectTagList';
import AuthContext from '../../contexts/auth-context';
import CancelSvg from '../UI/CancelSvg';
import AddSvg from '../UI/AddSvg';
/*
topi = 3
baju = 2
celana = 1
alas kaki = 4
*/

const AddOutfit = (props) => {
	const { isLoading, error, sendRequest } = useHttp();
	const [selectedSecondaryClothings, setSelectedSecondaryClothings] =
		useState([]);
	const [selectedTopi, setSelectedTopi] = useState(null);
	const [selectedBaju, setSelectedBaju] = useState(null);
	const [selectedCelana, setSelectedCelana] = useState(null);
	const [selectedAlasKaki, setSelectedAlasKaki] = useState(null);
	const [clothingOptions, setClothingOptions] = useState([]);
	const [secondaryClothings, setSecondaryClothings] = useState([]);
	const [tags, setTags] = useState([]);
	const primaryCategories = [
		{
			categoryId: 3,
			categoryName: 'Topi',
			state: selectedTopi,
			updateState: setSelectedTopi,
			defaultImage: 'https://img.icons8.com/dotty/80/000000/trilby.png',
		},
		{
			categoryId: 2,
			categoryName: 'Baju',
			state: selectedBaju,
			updateState: setSelectedBaju,
			defaultImage:
				'https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-shirt-hygiene-kiranshastry-lineal-kiranshastry-2.png',
		},
		{
			categoryId: 1,
			categoryName: 'Celana',
			state: selectedCelana,
			updateState: setSelectedCelana,
			defaultImage:
				'https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/000000/external-pants-clothes-vitaliy-gorbachev-lineal-vitaly-gorbachev-1.png',
		},
		{
			categoryId: 4,
			categoryName: 'Alas Kaki',
			state: selectedAlasKaki,
			updateState: setSelectedAlasKaki,
			defaultImage: 'https://img.icons8.com/ios/50/000000/mens-shoe.png',
		},
	];

	const ctx = useContext(AuthContext);

	const openPopupNoClothing = () => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='custom-ui'>
						no clothings
						<button
							onClick={() => {
								onClose();
							}}
						>
							Close
						</button>
					</div>
				);
			},
		});
	};

	const getClothing = (categoryId) => {
		sendRequest(
			{ url: `clothing/${ctx.user.userId}/category/${categoryId}` },
			(returnData) => {
				const clothings = [];
				returnData.forEach((e) => {
					clothings.push({
						clothingId: e.clothingId,
						imageUrl: e.imageUrl,
						categoryId: categoryId,
					});
				});
				if (clothings.length > 0) setClothingOptions(clothings);
				else openPopupNoClothing();
			}
		);
	};

	const selectClothing = (categoryId, clothingId, imageUrl, id) => {
		if (primaryCategories.map((e) => e.categoryId).includes(categoryId)) {
			primaryCategories
				.filter((e) => e.categoryId === categoryId)[0]
				.updateState({
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

	const openPopup = (clothings, id = null, isSecondary = false) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='flex flex-col relative bg-white rounded border border-gray-900 py-2 px-4'>
						<div className='flex flex-row justify-between items-center mb-8 border-b-2 border-gray-200'>
							<div className='text-2xl font-semibold '>
								Pick your clothing
							</div>
							<div
								className='hover:text-gray-500'
								onClick={onClose}
							>
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
											selectClothing(
												e.categoryId,
												e.clothingId,
												e.imageUrl,
												id
											);
											onClose();
										}}
									>
										<img src={e.imageUrl}></img>
									</div>
								);
							})}
						</div>
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
		sendRequest(
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
	}, []);

	useEffect(async () => {
		await sendRequest({ url: `tag/${ctx.user.userId}` }, (returnData) => {
			const allTags = [];
			for (const e of returnData) {
				allTags.push({ ...e, isSelected: false, isEdit: false });
			}
			const uniqueTags = [];

			allTags.map((x) =>
				uniqueTags.filter((a) => a.tagId === x.tagId).length > 0
					? null
					: uniqueTags.push(x)
			);
			setTags(uniqueTags);
		});
	}, [sendRequest]);

	const getSecondaryClothings = (id) => {
		if (secondaryClothings.length > 0)
			openPopup(secondaryClothings, id, true);
		else openPopupNoClothing();
	};

	return (
		<div>
			<div className='flex flex-col md:flex-row md:justify-between'>
				<div className='flex w-3/5'>
					<div className='flex flex-col items-center justify-start  gap-x-1 gap-y-3 border-8 p-3 m-3 w-full'>
						<div className='text-lg md:text-2xl border-b-2 w-full text-center'>
							Main Outfit
						</div>
						{primaryCategories.map((e) => {
							return (
								<div
									className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-28 cursor-pointer'
									style={{ minHeight: '5rem' }}
									onClick={() => {
										getClothing(e.categoryId);
									}}
								>
									{e.state ? (
										<img
											src={e.state.imageUrl}
											className='w-28'
										></img>
									) : (
										<img src={e.defaultImage} alt='' />
									)}
								</div>
							);
						})}
					</div>
					<div className='flex flex-col items-center justify-start w-full gap-x-1 gap-y-3 border-8 p-3 m-3'>
						<div className='text-lg md:text-2xl border-b-2 w-full text-center'>
							Optional
						</div>
						{selectedSecondaryClothings.length > 0 &&
							selectedSecondaryClothings.map((e) => {
								return (
									<div
										key={e.id}
										className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-28 cursor-pointer'
										style={{ minHeight: '5rem' }}
										onClick={() => {
											getSecondaryClothings(e.id);
										}}
									>
										<img
											src={e.imageUrl}
											className='w-32 h-32'
										></img>
									</div>
								);
							})}
						<div
							className='rounded shadow-xl bg-gray-300 border p-1 flex items-center justify-center w-28 cursor-pointer text-gray-500 hover:text-gray-700'
							style={{ minHeight: '5rem' }}
							onClick={() => {
								getSecondaryClothings();
							}}
						>
							<AddSvg />
						</div>
					</div>
				</div>
				<div className='flex flex-col space-y-4 w-full md:w-1/3 mt-4 md:mt-10'>
					<span className=''>
						<label htmlFor='outfit-name'>Outfit Name</label>
						<br />
						<input
							type='text'
							name=''
							id='outfit-name'
							className='form-input rounded w-full'
						/>
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
						<label
							htmlFor='chbx-set-date'
							className='cursor-pointer'
						>
							<input
								type='checkbox'
								id='chbx-set-date'
								className='cursor-pointer'
							/>
							<span className='ml-2'>Set a date for this outfit?							</span>
						</label>
					</div>

					<div className='w-full h-32 bg-indigo-500 flex items-center justify-center text-white border rounded border-blue-400'>
						<p>Ini calendar</p>
					</div>

					<button className='p-4 rounded border-2 border-blue-200 hover:bg-blue-500 hover:text-white'>
						Submit
					</button>

				</div>
			</div>
		</div>
	);
};

export default AddOutfit;
