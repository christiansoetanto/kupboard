import React, { Fragment, useState } from "react";
import Tag from "../UI/Tag";
import Card from "../UI/Card";
const SelectTagList = (props) => {
	const { tags, onSelectedTag } = props;
	const [isAddTag, setIsAddTag] = useState(false);
	const [isEditTag, setIsEditTag] = useState(false);
	const clickTagHandler = (tag) => {
		console.log(tag.tagId);
		let selectedTags = [];

		selectedTags = tags.map((obj) => (tag.tagId === obj.tagId ? { ...obj, isSelected: !obj.isSelected } : obj));

		onSelectedTag(selectedTags);
	};

	const addTagHandler = (e) => {
		e.preventDefault();
		setIsAddTag((prev) => {
			return !prev;
		});
	};

	const editTagHandler = (id) => {
		console.log("edit id: " + id);
		setIsEditTag(true);
	};
	const deleteTagHandler = (id) => {
		console.log("delete id: " + id);
	};

	return (
		<div className='flex flex-start'>
			{tags.map((item) => (
				<Fragment key={item.tagId}>
					<Tag key={item.tagId} tagId={item.tagId} name={item.name} isSelected={item.isSelected} onClickTag={clickTagHandler} />
					<button
						type='button'
						onClick={() => {
							editTagHandler(item.tagId);
						}}>
						edit
					</button>
					<button
						type='button'
						onClick={() => {
							deleteTagHandler(item.tagId);
						}}>
						delete
					</button>
				</Fragment>
			))}
			<Card>
				<button type='button' onClick={addTagHandler}>
					Add tag
				</button>
			</Card>

			{isAddTag && <Card>voila muncul komponen add tag di sini</Card>}
		</div>
	);
};

export default SelectTagList;
