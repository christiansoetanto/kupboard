import React, { useState } from "react";
import Card from "./Card";
const Tag = (props) => {
	const { tagId, name, isSelected, onClickTag } = props;
	const clickTagHandler = (e) => {
		onClickTag({ tagId: tagId, name: name, isSelected: !isSelected });
	};
	return (
		<Card>
			<div className=''>{name}</div>
			<button onClick={clickTagHandler}>pencet ini untuk pilih, status isSelected = {isSelected.toString()}</button>
		</Card>
	);
};

export default Tag;
