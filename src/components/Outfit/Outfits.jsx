import React, { useState, useEffect, useContext } from "react";
import FilterTag from "../Filter/FilterTag";
import useHttp from "../../hooks/use-http";
import OutfitList from "./OutfitList";
import AuthContext from "../../contexts/auth-context";
import { Link } from "react-router-dom";

const Outfits = () => {
	const ctx = useContext(AuthContext);

	const [tags, setTags] = useState([]);
	const [outfits, setOutfits] = useState([]);
	const [filteretedOutfits, setFilteredOutfits] = useState([]);
	const { isLoading: fetchOutfits_isLoading, fetchOutfits_error, sendRequest: fetchOutfits } = useHttp();

	useEffect(() => {
		const transformOutfits = (returnData) => {
			const allTags = [];
			for (const outfit of returnData) {
				for (const tag of outfit.tags) {
					allTags.push({ ...tag, isSelected: false });
				}
			}

			const uniqueTags = [];

			allTags.map((x) => (uniqueTags.filter((a) => a.tagId === x.tagId).length > 0 ? null : uniqueTags.push(x)));
			setTags(uniqueTags);
			setOutfits(returnData);
		};

		fetchOutfits({ url: "outfit/" + ctx.user.userId }, transformOutfits);
	}, [fetchOutfits]);

	useEffect(() => {
		const filterOutfits = () => {
			const filteredOutfitList = outfits.filter((item) => {
				let selectedTags = tags
					.filter((i) => {
						return i.isSelected === true;
					})
					.map((i) => i.tagId);

				if (selectedTags.length === 0) return true;
				else return selectedTags.every((t) => item.tags.map((e) => e.tagId).indexOf(t) >= 0);
			});
			setFilteredOutfits(filteredOutfitList);
		};
		filterOutfits();
	}, [outfits, tags]);

	const changedFilterHandler = (params) => {
		setTags(params);
	};

	return (
		<div className=''>
			<FilterTag tags={tags} onChangedFilter={changedFilterHandler} isLoading={fetchOutfits_isLoading} />

			<div className='grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3'>
				<Link className='rounded shadow-xl bg-white border p-1 flex items-center justify-center w-full' to='/add-outfit'>
					<div className='text-center font-semibold'>Add More Outfit?</div>
				</Link>

				<OutfitList outfitList={filteretedOutfits} isLoading={fetchOutfits_isLoading} />
			</div>
		</div>
	);
};

export default Outfits;
