import React, { useRef } from "react";
import Card from "../UI/Card";
const AddClothing = (props) => {
	const nameInputRef = useRef();
	const descriptionInputRef = useRef();
	const categorySelectRef = useRef();

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredDescription = descriptionInputRef.current.value;
		const selectedCategory = categorySelectRef.current.value;

		const newClothingData = {
			name: enteredName,
			category: selectedCategory,
			description: enteredDescription,
		};

		console.log(newClothingData);
		props.onAddClothing();
	};

	return (
		<Card>
			<form onSubmit={submitHandler}>
				<label className='block'>
					<span className='text-gray-700'>Name</span>
					<input className='form-input mt-1 block w-full' placeholder='Jane Doe' ref={nameInputRef} />
				</label>

				<label className='block'>
					<span className='text-gray-700'>Name</span>
					<input className='form-textarea mt-1 block w-full' placeholder='' ref={descriptionInputRef} />
				</label>

				<label className='block mt-4'>
					<span className='text-gray-700'>Category</span>
					<select className='form-select mt-1 block w-full' ref={categorySelectRef}>
						<option value='1'>cat1</option>
						<option value='2'>cat2</option>
						<option value='3'>cat3</option>
						<option value='4'>cat4</option>
					</select>
				</label>

				<div>
					<button>Add Meetup</button>
				</div>
			</form>
		</Card>
	);
};

export default AddClothing;
