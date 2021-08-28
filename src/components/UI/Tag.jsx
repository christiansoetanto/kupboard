import React, { useState } from "react";
import Card from "./Card";
const Tag = (props) => {
	const clickTagHandler = (e) => {
		props.onClickTag({ tagId: props.tagId, name: props.name, isSelected: !props.isSelected });
	};
	return (
		<Card>
			<div className=''>{props.name}</div>
			<button onClick={clickTagHandler}>pencet ini untuk pilih, status isSelected = {props.isSelected.toString()}</button>
		</Card>
	);
};

export default Tag;
