import React, { useState } from "react";
import Card from "./Card";
const Tag = (props) => {
	const { tagId, color, name, isSelected, onClickTag } = props;
	const clickTagHandler = (e) => {
		onClickTag({ tagId: tagId, name: name, isSelected: !isSelected });
	};
	return (
		<Card className={`flex content-start justify-between rounded-full p-4 m-2 px-8 cursor-pointer ${isSelected && "bg-orange-300"}`} onClick={clickTagHandler}>
			<div style={{ backgroundColor: { color } }} className={`w-1/4 h-full self-center flex-shrink rounded-full border-3 border-gray-900 mr-2 px-1`}></div>
			<div className='w-3/4 self-center flex-grow border-3 border-red-900 ml-2 bg-green-300 px-1'>{name}</div>

			{/* <button type='button' onClick={clickTagHandler}>
				pencet ini untuk pilih, status isSelected = {isSelected.toString()}
			</button> */}
		</Card>
	);
};

export default Tag;
