import React, { useState } from "react";
const CategoryFilter = (props) => {
	const { categories, onChangedCategory } = props;
	const changeCategoryHandler = (e) => {
		onChangedCategory(e.target.value);
	};

	// const [selectedCategory, setSelectedCategory] = useState();

	if (categories.length === 0) return <div>div kosong? nantidipikirn lagi</div>;
	else
		return (
			<div className='flex flex-start'>
				<select onChange={changeCategoryHandler}>
					<option key='0' value='0' label='Select category' />

					{categories.map((item) => (
						<option key={item.categoryId} value={item.categoryId} label={item.name} />
					))}
				</select>
			</div>
		);
};

export default CategoryFilter;
