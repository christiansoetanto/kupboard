import React from "react";
import Card from "../UI/Card";
const ClothingItem = (props) => {
	const { imageUrl, name, tags, category } = props.clothing;
	console.log(tags)
	return (
		<div className='rounded shadow-xl bg-white border p-1 flex flex-col items-center justify-center'>
			<div className='' id='picture'>
				<img src={require("../../assets/baju.png").default} alt='logo' style={{ height: "" }} />
			</div>

			<div id='description flex flex-col justify-center'>
				<div className='text-2xl font-semibold mb-4 text-center'>{name}</div>
				<div>tagid = {tags.map((e) => e.tagId + "")}</div>
				<div>category = {category.name}</div>
			</div>
		</div>
	);
};

export default ClothingItem;
