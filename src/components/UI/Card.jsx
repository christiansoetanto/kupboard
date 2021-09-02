import React from "react";
const Card = (props) => {
	const className = "rounded shadow-xl bg-white border p-1 m-2 " + props.className;
	return <div className={className} onClick={props.onClick}>{props.children}</div>;
};

export default Card;
