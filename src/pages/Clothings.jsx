import React, { useState, useEffect, useContext } from "react";
import ClothingList from "../components/Clothing/ClothingList";
import Card from "../components/UI/Card";
import TagFilter from "../components/Filter/TagFilter";
import useHttp from "../hooks/use-http";
import CategoryFilter from "../components/Filter/CategoryFilter";
import AuthContext from "../contexts/auth-context";
const Clothings = () => {
	const [tags, setTags] = useState([]);
	const [clothings, setClothings] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [filteretedClothings, setFilteredClothings] = useState([]);
	const { fetchClothings_isLoading, fetchClothings_error, sendRequest: fetchClothings } = useHttp();
	const { fetchCategories_isLoading, fetchCategories_error, sendRequest: fetchCategories } = useHttp();

	const ctx = useContext(AuthContext);

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
			console.log(uniqueTags);
		};

		// ini di comment untuk keperluan developing
		// fetchClothings({ url: "clothing/" + ctx.user.uid}, transformClothings);
		fetchClothings({ url: "clothing/" + "xu7Di7YPp4hvrN250XWwqcy7YVLY" }, transformClothings);
		console.log("use effect FETCH clothing jalan");

		fetchCategories({ url: "category" }, (returnData) => {
			setCategories(returnData);
		});
		console.log("use effect FETCH CATEGORIES jalan");
	}, [fetchClothings, fetchCategories]);

	useEffect(() => {
		const filterClothings = () => {
			const filteredClothingList = clothings
				.filter((item) => {
					if (selectedCategory.toString() === (0).toString()) return true;
					else return item.category.categoryId.toString() === selectedCategory.toString();
				})
				.filter((item) => {
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
	}, [clothings, tags, selectedCategory]);

	//nanti ganti aja jadi apa kek
	// .sort(function (a, b) {
	// 	return a.tagId - b.tagId;
	// });
	const changedFilterHandler = (params) => {
		setTags(params);
	};

	const changedCategoryHandler = (selectedCategory) => {
		setSelectedCategory(selectedCategory);
	};

	return (
		<div className='py-4 px-8'>
			<CategoryFilter categories={categories} onChangedCategory={changedCategoryHandler} />
			<TagFilter tags={tags} onChangedFilter={changedFilterHandler} />
			<ClothingList clothingList={filteretedClothings} />
		</div>
	);
};

export default Clothings;
