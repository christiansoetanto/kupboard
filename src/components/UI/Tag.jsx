import React, { useState } from "react";
import Card from "./Card";
const Tag = (props) => {
	const { tagId, name, isSelected, onClickTag } = props;
	const clickTagHandler = (e) => {
		onClickTag({ tagId: tagId, name: name, isSelected: !isSelected });
	};
	return (
		<Card className={`p-4 m-2 px-8 cursor-pointer ${isSelected && 'bg-orange-300'}`}  onClick={clickTagHandler}>
			<div className=''>{name}</div>
			{/* <button type='button' onClick={clickTagHandler}>
				pencet ini untuk pilih, status isSelected = {isSelected.toString()}
			</button> */}
		</Card>
	);
};

export default Tag;
