import React, { useState } from "react";
const CategoryFilter = (props) => {
	const { categories, onChangedCategory, isLoading, className, selectedCategoryId } = props;
	const changeCategoryHandler = (e) => {
		onChangedCategory(e.target.value);
	};

	// const [selectedCategory, setSelectedCategory] = useState();
	if (isLoading) return <div className='w-32 bg-gray-300 rounded'>&nbsp;</div>;
	if (categories.length === 0) return <div className=''>No data</div>;
	else
		return (
			<div className='flex flex-start'>
				<select
					className={" form-select bg-transparent py-2 rounded focus:outline-none " + className}
					onChange={changeCategoryHandler}
					value={selectedCategoryId}>
					<option key='0' value='0' label='Select category' />

					{categories.map((item) => (
						<option key={item.categoryId} value={item.categoryId} label={item.name} />
					))}
				</select>
			</div>
		);
};

export default CategoryFilter;
