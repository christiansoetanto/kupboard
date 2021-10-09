import React, { useState, useEffect, useContext } from "react";
import ClothingList from "./ClothingList";
import FilterTag from "../Filter/FilterTag";
import useHttp from "../../hooks/use-http";
import CategoryFilter from "../Filter/CategoryFilter";
import AuthContext from "../../contexts/auth-context";
import { Link } from "react-router-dom";

const Clothings = () => {
	const [tags, setTags] = useState([]);
	const [clothings, setClothings] = useState([]);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(0);
	const [filteretedClothings, setFilteredClothings] = useState([]);
	const { isLoading: fetchClothings_isLoading, fetchClothings_error, sendRequest: fetchClothings } = useHttp();
	const { isLoading: fetchCategories_isLoading, fetchCategories_error, sendRequest: fetchCategories } = useHttp();

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
		};

		// ini di comment untuk keperluan developing
		// fetchClothings({ url: "clothing/" + ctx.user.uid}, transformClothings);
		fetchClothings({ url: `clothing/${ctx.user.userId}` }, transformClothings);

		fetchCategories({ url: "category" }, (returnData) => {
			setCategories(returnData);
		});
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
		<div className='py-4'>
			<CategoryFilter categories={categories} onChangedCategory={changedCategoryHandler} isLoading={fetchCategories_isLoading} />
			<FilterTag tags={tags} onChangedFilter={changedFilterHandler} isLoading={fetchClothings_isLoading} />
			<div className='grid grid-cols-2 md:grid-cols-4 gap-x-1 gap-y-3'>
				<Link className='rounded shadow-xl bg-white border p-1 flex items-center justify-center w-full' to='/add-clothing'>
					<div className='text-center font-semibold'>Add more clothing?</div>
				</Link>
				<ClothingList clothingList={filteretedClothings} isLoading={fetchClothings_isLoading} />
			</div>
		</div>
	);
};

export default Clothings;
