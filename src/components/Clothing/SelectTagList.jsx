import React, { Fragment, useContext, useState } from "react";
import useHttp from "../../hooks/use-http";
import AddClothingTag from "./AddClothingTag";
import NewTag from "./NewTag";
import Card from "../UI/Card";
import AuthContext from "../../contexts/auth-context";
const SelectTagList = (props) => {
	const { tags, onSetTags } = props;
	const [isAddTag, setIsAddTag] = useState(false);
	const { isLoading, error, sendRequest } = useHttp();
	const ctx = useContext(AuthContext);

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
				url: `tag/${ctx.user.userId}/${tagId}`,
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
				url: `tag/${ctx.user.userId}/${newTag.tagId}`,
				method: "PUT",
				body: newTag,
			},
			(result) => {
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
				url: `tag/${ctx.user.userId}`,
				method: "POST",
				body: newTag,
			},
			(result) => {
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
		<div className='flex flex-start flex-wrap overflow-scroll no-scrollbar'>
			<Card className={`flex content-start justify-between whitespace-nowrap rounded-full py-1 px-4 cursor-pointer`}>
				<div className={`h-full self-center flex-shrink rounded-full border-3 border-gray-900`}>
					<div className='flex flex-nowrap space-x-1'>
						<button type='button' className='whitespace-nowrap' onClick={triggerAddTagHandler}>
							{isAddTag ? "Cancel" : "Add Tag"}
						</button>
					</div>
				</div>
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
