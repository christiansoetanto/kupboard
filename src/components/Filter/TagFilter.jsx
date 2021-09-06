import React, { useState } from 'react';
import Tag from '../UI/Tag';
const TagFilter = (props) => {
	const { tags, onChangedFilter, isLoading } = props;
	const clickTagHandler = (tag) => {
		let updatedTags = [];
		console.log(tag.tagId);
		if (tag.tagId === 'reset') {
			updatedTags = tags.map((obj) => ({ ...obj, isSelected: false }));
		} else {
			updatedTags = tags.map((obj) =>
				tag.tagId === obj.tagId
					? { ...obj, isSelected: !obj.isSelected }
					: obj
			);
		}

		onChangedFilter(updatedTags);
	};

	if (isLoading)
		return (
			<div className='flex flex-start overflow-scroll no-scrollbar mt-4 space-x-2'>
				<div className='rounded-full w-24 bg-gray-200'>&nbsp;</div>
				<div className='rounded-full w-20 bg-gray-200'>&nbsp;</div>
				<div className='rounded-full w-32 bg-gray-200'>&nbsp;</div>
			</div>
		);
	if (tags.length === 0) return <div className=''>No data</div>;
	else
		return (
			<div className='flex flex-start overflow-scroll no-scrollbar space-x-2'>
				<Tag
					key='default'
					tagId='reset'
					name='reset'
					isSelected={false}
					onClickTag={clickTagHandler}
				/>

				{tags.map((item) => (
					<Tag
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

export default TagFilter;
