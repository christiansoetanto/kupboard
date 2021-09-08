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
	const clickDeleteHandler = (tagId) => {
		console.log("delete id: " + tagId);

		sendRequest(
			{
				url: `tag/${"xu7Di7YPp4hvrN250XWwqcy7YVLY"}/${tagId}`,
				method: "DELETE",
			},
			() => {
				let newTags = [];
				console.log(tagId);
				newTags = tags.filter((obj) => tagId !== obj.tagId);

				console.log(newTags);
				onSetTags(newTags);
			}
		);
	};

	const saveHandler = (newTag) => {
		console.log(newTag);
		sendRequest(
			{
				url: `tag/${"xu7Di7YPp4hvrN250XWwqcy7YVLY"}/${newTag.tagId}`,
				method: "PUT",
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
				url: `tag/${"xu7Di7YPp4hvrN250XWwqcy7YVLY"}`,
				method: "POST",
				body: newTag,
			},
			(result) => {
				console.log(result);
				let newTags = tags;
				newTags.push({ ...result, isEdit: false, isSelected: false });
				console.log(newTags);
				setIsAddTag((prev) => {
					return !prev;
				});
				onSetTags(newTags);
			}
		);
	};

	const cancelAddNewTagHandler = () => {
		setIsAddTag((prev) => {
			return !prev;
		});
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
			{isAddTag && <NewTag onAdd={addNewTagHandler} onCancelAdd={cancelAddNewTagHandler} />}

			{tags.map((item) => (
				<Fragment key={item.tagId}>
					<AddClothingTag
						key={item.tagId}
						tagId={item.tagId}
						name={item.name}
						color={item.color}
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
