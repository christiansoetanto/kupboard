import React, { Fragment, useState } from 'react';
import Tag from '../UI/Tag';
import Card from '../UI/Card';
const SelectTagList = (props) => {
	const { tags, onSelectedTag } = props;
	const [isAddTag, setIsAddTag] = useState(false);
	const [isEditTag, setIsEditTag] = useState(false);
	const clickTagHandler = (tag) => {
		console.log(tag.tagId);
		let selectedTags = [];

		selectedTags = tags.map((obj) =>
			tag.tagId === obj.tagId
				? { ...obj, isSelected: !obj.isSelected }
				: obj
		);

		onSelectedTag(selectedTags);
	};

	const addTagHandler = (e) => {
		e.preventDefault();
		setIsAddTag((prev) => {
			return !prev;
		});
	};

	const editTagHandler = (id) => {
		console.log('edit id: ' + id);
		setIsEditTag(true);
	};
	const deleteTagHandler = (id) => {
		console.log('delete id: ' + id);
	};

	return (
		<div className='flex flex-start overflow-scroll no-scrollbar'>
			{tags.map((item) => (
				<Fragment key={item.tagId}>
					<Tag
						key={item.tagId}
						tagId={item.tagId}
						name={item.name}
						isSelected={item.isSelected}
						onClickTag={clickTagHandler}
					/>
					<div className='flex space-x-1.5 justify-start items-center'>
						<button
							type='button'
							onClick={() => {
								editTagHandler(item.tagId);
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								class='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
								/>
							</svg>
						</button>
						<button
							type='button'
							onClick={() => {
								deleteTagHandler(item.tagId);
							}}
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								class='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									stroke-width='2'
									d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
								/>
							</svg>
						</button>
					</div>
				</Fragment>
			))}
			<Card>
				<button
					type='button'
					className='whitespace-nowrap'
					onClick={addTagHandler}
				>
					Add tag
				</button>
			</Card>

			{isAddTag && <Card>voila muncul komponen add tag di sini</Card>}
		</div>
	);
};

export default SelectTagList;
