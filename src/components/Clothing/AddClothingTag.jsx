import React, { useState, useEffect, useRef } from 'react';
import CancelSvg from '../UI/CancelSvg';
import Card from '../UI/Card';
import DeleteSvg from '../UI/DeleteSvg';
import EditSvg from '../UI/EditSvg';
import SaveSvg from '../UI/SaveSvg';

const AddClothingTag = (props) => {
	const {
		tagId,
		color,
		name,
		isSelected,
		isEdit,
		onClickTag,
		onClickEdit,
		onClickDelete,
		onSave,
		onCancelEdit,
	} = props;
	const clickTagHandler = (e) => {
		onClickTag({ tagId: tagId, name: name, isSelected: !isSelected });
	};
	const editTagHandler = () => {
		onClickEdit(tagId);
	};

	const deleteTagHandler = () => {
		onClickDelete(tagId);
	};

	const saveTagHandler = () => {

		onSave({
			tagId: tagId,
			name: nameRef.current.value,
			color: colorRef.current.value,
		});
	};

	const cancelEditTagHandler = () => {
		onCancelEdit(tagId);
	};

	const nameRef = useRef();
	const colorRef = useRef();
	useEffect(() => {
		if (isEdit) {
			nameRef.current.value = name;
			nameRef.current.focus();

			colorRef.current.value = color;
		}
	}, [isEdit]);

	return (
		<Card
			className={`flex content-start justify-between whitespace-nowrap rounded-full py-1 px-4 cursor-pointer ${
				isSelected && 'bg-orange-400 text-white'
			}`}
		>
			<div
				style={{ backgroundColor: { color } }}
				className={`h-full self-center flex-shrink rounded-full border-3 border-gray-900`}
			>
				{isEdit && (
					<div className='flex flex-nowrap space-x-1'>
						<div className='rounded-full overflow-hidden w-6 h-6 mr-1'>
							<input
								type='color'
								ref={colorRef}
								className='bg-transparent h-52 w-52 p-0 border-0 cursor-pointer'
								style={{
									transform: 'translate(-25%, -25%)',
								}}
							/>
						</div>
						<div>
							<input
								className=' text-red-800 border-b-2 rounded pl-2 w-32 focus:outline-none focus:border-purple-700'
								type='text'
								ref={nameRef}
							/>
						</div>
						<div className='flex space-x-1 justify-start items-center'>
							<SaveSvg onClick={saveTagHandler} />
							<CancelSvg onClick={cancelEditTagHandler} />
						</div>
					</div>
				)}
				{!isEdit && (
					<div className='flex flex-nowrap space-x-1'>
						<div
							className=' flex items-center'
							type='text'
							onClick={clickTagHandler}
						>
							<div className='rounded-full overflow-hidden w-6 h-6 mr-1'>
								<input
									type='color'
									value={color}
									disabled={true}
									className='bg-transparent h-52 w-52 p-0 border-0 cursor-pointer'
									style={{
										transform: 'translate(-25%, -25%)',
									}}
								/>
							</div>
							<div>{name}</div>
						</div>
						<div className='flex space-x-1 justify-start items-center'>
							<EditSvg onClick={editTagHandler} />
							<DeleteSvg onClick={deleteTagHandler} />
						</div>
					</div>
				)}
			</div>
		</Card>
	);
};

export default AddClothingTag;
