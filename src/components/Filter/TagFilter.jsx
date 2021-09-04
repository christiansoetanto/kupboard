import React, { useState } from "react";
import Tag from "../UI/Tag";
const TagFilter = (props) => {
	const { tags, onChangedFilter } = props;
	const clickTagHandler = (tag) => {
		let updatedTags = [];
		console.log(tag.tagId);
		if (tag.tagId === "reset") {
			updatedTags = tags.map((obj) => ({ ...obj, isSelected: false }));
		} else {
			updatedTags = tags.map((obj) => (tag.tagId === obj.tagId ? { ...obj, isSelected: !obj.isSelected } : obj));
		}

		onChangedFilter(updatedTags);
	};

	if (tags.length === 0) return <div>div kosong? nantidipikirn lagi</div>;
	else
		return (
			<div className='flex flex-start overflow-scroll no-scrollbar'>
				<Tag key='default' tagId='reset' name='reset' isSelected={false} onClickTag={clickTagHandler} />

				{tags.map((item) => (
					<Tag key={item.tagId} color={item.color} tagId={item.tagId} name={item.name} isSelected={item.isSelected} onClickTag={clickTagHandler} />
				))}
			</div>
		);
};

export default TagFilter;
