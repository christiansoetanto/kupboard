import React, { useState, useEffect } from "react";
import OutfitList from "../components/Outfit/OutfitList";
import Card from "../components/UI/Card";
import TagFilter from "../components/Filter/TagFilter";
import useHttp from "../hooks/use-http";
const Outfits = () => {
	const [tags, setTags] = useState([]);
	const [outfits, setOutfits] = useState([]);
	const [filteretedOutfits, setFilteredOutfits] = useState([]);
	const { fetchOutfits_isLoading, fetchOutfits_error, sendRequest: fetchOutfits } = useHttp();

	useEffect(() => {
		const transformOutfits = (returnData) => {
			const allTags = [];
			for (const c of returnData) {
				c.tags.forEach((element) => {
					allTags.push({ ...element, isSelected: false });
				});
			}
			const uniqueTags = [];

			allTags.map((x) => (uniqueTags.filter((a) => a.tagId === x.tagId).length > 0 ? null : uniqueTags.push(x)));
			setTags(uniqueTags);
			setOutfits(returnData);
		};

		fetchOutfits({ url: "outfit/1" }, transformOutfits);
		console.log("use effect FETCH Outfit jalan");
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
				else return selectedTags.some((t) => item.tags.map((e) => e.tagId).indexOf(t) >= 0);
			});
			setFilteredOutfits(filteredOutfitList);
		};
		filterOutfits();
		console.log("use effect FILTER Outfit jalan");
	}, [outfits, tags]);

	const changedFilterHandler = (params) => {
		setTags(params);
	};

	return (
		<Card className=''>
			<TagFilter tags={tags} onChangedFilter={changedFilterHandler} />
			<OutfitList outfitList={filteretedOutfits} />
		</Card>
	);
};

export default Outfits;
