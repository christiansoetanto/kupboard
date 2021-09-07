import React, { Fragment, useState } from "react";
import useHttp from "../../hooks/use-http";
import AddClothingTag from "./AddClothingTag";
import NewTag from "./NewTag";
import Card from "../UI/Card";
const SelectTagList = (props) => {
	const { tags, onSetTags } = props;
	const [isAddTag, setIsAddTag] = useState(false);
	const { isLoading, error, sendRequest } = useHttp();
	const clickTagHandler = (tag) => {
		console.log(tag.tagId);
		let selectedTags = [];

		selectedTags = tags.map((obj) => (tag.tagId === obj.tagId ? { ...obj, isSelected: !obj.isSelected } : obj));

		onSetTags(selectedTags);
	};

	const triggerAddTagHandler = (e) => {
		e.preventDefault();
		setIsAddTag((prev) => {
			return !prev;
		});
	};

	const clickEditHandler = (tagId) => {
		console.log("edit id: " + tagId);
		let newTags = [];

		newTags = tags.map((obj) => (tagId === obj.tagId ? { ...obj, isEdit: !obj.isEdit } : obj));
		onSetTags(newTags);
	};
	const clickDeleteHandler = (id) => {
		console.log("delete id: " + id);
	};

	const saveHandler = (newTag) => {
		sendRequest(
			{
				url: "tag/update",
				method: "POST",
				body: newTag,
			},
			(result) => {
				console.log(result);
				let newTags = [];
				newTags = tags.map((obj) => (result.tagId === obj.tagId ? { ...result, isEdit: false, isSelected: false } : obj));
				console.log(newTags);

				onSetTags(newTags);
			}
		);
	};

	const addNewTagHandler = (newTag) => {
		sendRequest(
			{
				url: "tag/update",
				method: "POST",
				body: newTag,
			},
			(result) => {
				console.log(result);
				let newTags = [];
				newTags = tags.map((obj) => (result.tagId === obj.tagId ? { ...result, isEdit: false, isSelected: false } : obj));
				console.log(newTags);

				onSetTags(newTags);
			}
		);
	};

	const cancelEditHandler = (tagId) => {
		let newTags = [];
		newTags = tags.map((obj) => (tagId === obj.tagId ? { ...obj, isEdit: !obj.isEdit } : obj));
		onSetTags(newTags);
	};

	return (
		<div className='flex flex-start overflow-scroll no-scrollbar'>
			<Card>
				<button type='button' className='whitespace-nowrap' onClick={triggerAddTagHandler}>
					Add tag
				</button>
			</Card>
			{isAddTag && <NewTag onAdd={addNewTagHandler} />}

			{tags.map((item) => (
				<Fragment key={item.tagId}>
					<AddClothingTag
						key={item.tagId}
						tagId={item.tagId}
						name={item.name}
						isSelected={item.isSelected}
						isEdit={item.isEdit}
						onClickTag={clickTagHandler}
						onClickEdit={clickEditHandler}
						onSave={saveHandler}
						onClickDelete={clickDeleteHandler}
						onCancelEdit={cancelEditHandler}
					/>
				</Fragment>
			))}
		</div>
	);
};

export default SelectTagList;
