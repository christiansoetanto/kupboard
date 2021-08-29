import React from "react";
import Card from "../UI/Card";
const ClothingItem = (props) => {
	const { imageUrl, name, tags, category } = props.clothing;
	return (
		<div className='rounded shadow-xl bg-white border p-1'>
			<div className='' id='picture'>
				<img src={require("../../assets/baju.png").default} alt='logo' style={{ height: "300px" }} />
			</div>

			<div id='description'>
				{name}, tagid = {tags.map((e) => e.tagId + ";")}, category = {category.name}
			</div>
		</div>
	);
};

export default ClothingItem;
