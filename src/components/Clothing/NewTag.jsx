import React, { useState, useEffect, useRef } from "react";
import Card from "../UI/Card";
import DeleteSvg from "../UI/DeleteSvg";
import EditSvg from "../UI/EditSvg";
import SaveSvg from "../UI/SaveSvg";
const NewTag = (props) => {
	const { onAdd } = props;

	const addTagHandler = () => {
		console.log("add");
		onAdd({ name: nameRef.current.value, color: 'red' });
	};

	const nameRef = useRef();
	return (
		<Card className={`flex content-start justify-between whitespace-nowrap rounded-full py-1 px-4 cursor-pointer`}>
			<div className={`h-full self-center flex-shrink rounded-full border-3 border-gray-900`}></div>

			<div>
				<input className=' self-center flex-grow border-3 border-red-900' type='text' ref={nameRef}></input>
				<div className='flex space-x-1.5 justify-start items-center'>
					<SaveSvg onClick={addTagHandler} />
				</div>
			</div>
		</Card>
	);
};

export default NewTag;
