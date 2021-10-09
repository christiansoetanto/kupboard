import React, { useState, useEffect, useRef } from "react";
import Card from "../UI/Card";
import SaveSvg from "../UI/SaveSvg";
import CancelSvg from "../UI/CancelSvg";
const NewTag = (props) => {
	const { onAdd, onCancelAdd } = props;

	const nameRef = useRef();
	const colorRef = useRef("#ffffff");

	useEffect(() => {
		nameRef.current.focus();
	}, []);

	return (
		<Card className={`flex content-start justify-between whitespace-nowrap rounded-full py-1 px-4 cursor-pointer`}>
			<div className='flex flex-nowrap space-x-1'>
				<div className='rounded-full overflow-hidden w-6 h-6 mr-1'>
					<input
						type='color'
						ref={colorRef}
						className='bg-transparent h-52 w-52 p-0 border-0 cursor-pointer'
						style={{
							transform: "translate(-25%, -25%)",
						}}
					/>
				</div>
				<div>
					<input
						className=' text-red-800 border-b-2 rounded pl-2 w-32 focus:outline-none focus:border-purple-700'
						type='text'
						ref={nameRef}
						placeholder='New Tag'
					/>
				</div>
				<div className='flex space-x-1 justify-start items-center'>
					<SaveSvg
						onClick={() => {
							onAdd({ name: nameRef.current.value, color: colorRef.current.value });
						}}
					/>
					<CancelSvg
						onClick={() => {
							onCancelAdd();
						}}
					/>
				</div>
			</div>
		</Card>
	);
};

export default NewTag;
