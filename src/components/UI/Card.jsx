import React from "react";
const Card = (props) => {
	return <div className='rounded shadow-xl bg-white border p-1 m-2'>{props.children}</div>;
};

export default Card;
