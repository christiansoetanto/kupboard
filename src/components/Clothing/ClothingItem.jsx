import React from "react";
import Card from "../UI/Card";
const ClothingItem = (props) => {
	return (
		<div className='rounded shadow-xl bg-white border p-1'>
			<div className='' id='picture'>
				<img src={require("../../assets/baju.png").default} alt='logo' style={{ height: "300px" }} />
			</div>

			<div id='description'>
				{props.name}, tagid = {props.tags.map((e) => e.tagId + ";")}
			</div>
		</div>
	);
};

export default ClothingItem;
