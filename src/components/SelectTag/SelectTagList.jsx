import React from "react";
import Tag from "../UI/Tag";
const SelectTagList = (props) => {
	const { tags, onSelectedTag } = props;
	const clickTagHandler = (tag) => {
		console.log(tag.tagId);
		let selectedTags = [];

		if (tag.tagId === "add") {
			console.log("munculin component tambah tag di sini.");
		} else {
			selectedTags = tags.map((obj) => (tag.tagId === obj.tagId ? { ...obj, isSelected: !obj.isSelected } : obj));
		}

		onSelectedTag(selectedTags);
	};
	return (
		<div className='flex flex-start'>
			<Tag key='default' tagId='add' name='-' isSelected={false} onClickTag={clickTagHandler} />

			{tags.map((item) => (
				<Tag key={item.tagId} tagId={item.tagId} name={item.name} isSelected={item.isSelected} onClickTag={clickTagHandler} />
			))}
		</div>
	);
};

export default SelectTagList;
