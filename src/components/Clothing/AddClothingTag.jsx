import React, { useState, useEffect, useRef } from "react";
import CancelSvg from "../UI/CancelSvg";
import Card from "../UI/Card";
import DeleteSvg from "../UI/DeleteSvg";
import EditSvg from "../UI/EditSvg";
import SaveSvg from "../UI/SaveSvg";
const AddClothingTag = (props) => {
	const { tagId, color, name, isSelected, isEdit, onClickTag, onClickEdit, onClickDelete, onSave, onCancelEdit } = props;
	const clickTagHandler = (e) => {
		onClickTag({ tagId: tagId, name: name, isSelected: !isSelected });
	};
	const editTagHandler = () => {
		console.log("ya edit");
		onClickEdit(tagId);
	};

	const deleteTagHandler = (tagId) => {
		onClickDelete(tagId);
	};

	const saveTagHandler = () => {
		console.log("save");

		onSave({ tagId: tagId, name: nameRef.current.value });
	};

	const cancelEditTagHandler = () => {
		onCancelEdit(tagId);
	};

	const nameRef = useRef();
	useEffect(() => {
		if (isEdit) {
			nameRef.current.value = name;
			nameRef.current.focus();
		}
	}, [isEdit]);

	return (
		<Card className={`flex content-start justify-between whitespace-nowrap rounded-full py-1 px-4 cursor-pointer ${isSelected && "bg-orange-400 text-white"}`}>
			<div style={{ backgroundColor: { color } }} className={`h-full self-center flex-shrink rounded-full border-3 border-gray-900`}>
				{isEdit && (
					<div>
						<input className=' self-center flex-grow border-3 border-red-900' type='text' ref={nameRef}></input>
						<div className='flex space-x-1.5 justify-start items-center'>
							<SaveSvg onClick={saveTagHandler} />
							<CancelSvg onClick={cancelEditTagHandler} />
						</div>
					</div>
				)}
				{!isEdit && (
					<div>
						<div className='flex space-x-1.5 justify-start items-center'>
							<EditSvg onClick={editTagHandler} />
							<DeleteSvg onClick={deleteTagHandler} />
						</div>

						<div className='self-center flex-grow border-3 border-red-900' type='text' onClick={clickTagHandler}>
							{name}
						</div>
					</div>
				)}
			</div>
		</Card>
	);
};

export default AddClothingTag;
