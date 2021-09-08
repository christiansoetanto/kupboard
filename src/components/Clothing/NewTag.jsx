import React, { useState, useEffect, useRef } from "react";
import Card from "../UI/Card";
import SaveSvg from "../UI/SaveSvg";
import CancelSvg from "../UI/CancelSvg";
const NewTag = (props) => {
	const { onAdd, onCancelAdd } = props;

	const nameRef = useRef();
	const colorRef = useRef("#ffffff");

	return (
		<Card className={`flex content-start justify-between whitespace-nowrap rounded-full py-1 px-4 cursor-pointer`}>
			<div className={`h-full self-center flex-shrink rounded-full border-3 border-gray-900`}></div>

			<div>
				<input type='color' ref={colorRef} className='rounded-full'></input>
				<input className=' self-center flex-grow border-3 border-red-900' type='text' ref={nameRef}></input>
				<div className='flex space-x-1.5 justify-start items-center'>
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
