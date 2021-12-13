import React, { useState } from "react";
import FilterTagItem from "./FilterTagItem";
import Card from "../UI/Card";
const FilterTag = (props) => {
	const { tags, onChangedFilter, isLoading } = props;
	const clickTagHandler = (tag) => {
		let updatedTags = [];
		updatedTags = tags.map((obj) => (tag.tagId === obj.tagId ? { ...obj, isSelected: !obj.isSelected } : obj));
		onChangedFilter(updatedTags);
	};

	const unselectAllHandler = () => {
		let updatedTags = [];
		updatedTags = tags.map((obj) => ({ ...obj, isSelected: false }));
		onChangedFilter(updatedTags);
	};

	if (isLoading)
		return (
			<div className='flex flex-start overflow-scroll no-scrollbar mt-4 mb-4 space-x-2'>
				<div className='rounded-full w-24 bg-gray-200'>&nbsp;</div>
				<div className='rounded-full w-20 bg-gray-200'>&nbsp;</div>
				<div className='rounded-full w-32 bg-gray-200'>&nbsp;</div>
			</div>
		);
	if (tags.length === 0) return <div className='flex flex-start overflow-scroll no-scrollbar space-x-2 my-3'>Tag not found</div>;
	else
		return (
			<div className='flex flex-start overflow-scroll no-scrollbar space-x-2'>
				<Card className={`h-full self-center whitespace-nowrap rounded-full py-1 px-4 cursor-pointer`} onClick={unselectAllHandler}>
					Unselect All
				</Card>
				{tags
					.sort((a, b) => a.name.localeCompare(b.name))
					.map((item) => (
						<FilterTagItem
							key={item.tagId}
							color={item.color}
							tagId={item.tagId}
							name={item.name}
							isSelected={item.isSelected}
							onClickTag={clickTagHandler}
						/>
					))}
			</div>
		);
};

export default FilterTag;
