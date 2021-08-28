import React, { useState } from "react";
import Tag from "../UI/Tag";
const TagFilter = (props) => {
	const clickTagHandler = (tag) => {
		const elementsIndex = props.tags.findIndex((e) => e.tagId === tag.tagId);
		let newArray = [...props.tags];
		newArray[elementsIndex] = tag;
		props.onChangedFilter(newArray);
	};

	if (props.tags.length === 0) return <div>div kosong? nantidipikirn lagi</div>;
	else
		return (
			<div className='flex flex-start'>
				{props.tags.map((item) => (
					<Tag key={item.tagId} tagId={item.tagId} name={item.name} isSelected={item.isSelected} onClickTag={clickTagHandler} />
				))}
			</div>
		);
};

export default TagFilter;
