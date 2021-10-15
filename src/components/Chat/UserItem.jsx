import React from "react";

const UserItem = (props) => {
	const { userId, text, onClick } = props;
	const clickHandler = () => {
		onClick(userId);
	};

	return (
		<div onClick={clickHandler} className='p-3 m-3 bg-green-600'>
			<div>{userId}</div>
			<div>{text}</div>
		</div>
	);
};

export default UserItem;
