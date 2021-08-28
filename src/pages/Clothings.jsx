import React, { useState, useEffect } from "react";
import ClothingList from "../components/Clothing/ClothingList";
import Card from "../components/UI/Card";
import TagFilter from "../components/Filter/TagFilter";
import useHttp from "../hooks/use-http";
const Clothings = () => {
	const [tags, setTags] = useState([]);
	const [clothings, setClothings] = useState([]);
	const [filteretedClothings, setFilteredClothings] = useState([]);
	const { isLoading, error, sendRequest: fetchClothings } = useHttp();

	useEffect(() => {
		const transformClothings = (returnData) => {
			const allTags = [];
			for (const c of returnData) {
				c.tags.forEach((element) => {
					allTags.push({ ...element, isSelected: false });
				});
			}
			const uniqueTags = [];

			allTags.map((x) => (uniqueTags.filter((a) => a.tagId === x.tagId).length > 0 ? null : uniqueTags.push(x)));
			setTags(uniqueTags);
			setClothings(returnData);
		};

		fetchClothings({ url: "clothing/1" }, transformClothings);
		console.log("use effect FETCH clothing jalan");
	}, [fetchClothings]);

	useEffect(() => {
		const filterClothings = () => {
			const filteredClothingList = clothings.filter((item) => {
				let selectedTags = tags
					.filter((i) => {
						return i.isSelected === true;
					})
					.map((i) => i.tagId);

				if (selectedTags.length === 0) return true;
				else return selectedTags.some((t) => item.tags.map((e) => e.tagId).indexOf(t) >= 0);
			});
			setFilteredClothings(filteredClothingList);
		};
		filterClothings();
		console.log("use effect FILTER clothing jalan");
	}, [clothings, tags]);

	//nanti ganti aja jadi apa kek
	// .sort(function (a, b) {
	// 	return a.tagId - b.tagId;
	// });
	const changedFilterHandler = (params) => {
		setTags(params);
	};

	return (
		<Card className=''>
			<TagFilter tags={tags} onChangedFilter={changedFilterHandler} />
			<ClothingList clothingList={filteretedClothings} />
		</Card>
	);
};

export default Clothings;
