import React, { useState } from "react";
import Card from "./Card";
const Tag = (props) => {
	const { tagId, color, name, isSelected, onClickTag } = props;
	const clickTagHandler = (e) => {
		onClickTag({ tagId: tagId, name: name, isSelected: !isSelected });
	};
	return (
		<Card className={`flex content-start justify-between rounded-full py-1 mx-2 px-4 cursor-pointer ${isSelected && "bg-orange-400 text-white"}`} onClick={clickTagHandler}>
			<div style={{ backgroundColor: { color } }} className={`h-full self-center flex-shrink rounded-full border-3 border-gray-900`}></div>
			<div className=' self-center flex-grow border-3 border-red-900'>{name}</div>

			{/* <button type='button' onClick={clickTagHandler}>
				pencet ini untuk pilih, status isSelected = {isSelected.toString()}
			</button> */}
		</Card>
	);
};

export default Tag;
