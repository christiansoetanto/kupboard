import React from "react";

const NewChatUserItem = (props) => {
	const { userId, photoURL, name, onClick } = props;
	return (
		<div
			onClick={() => {
				onClick(userId);
			}}
			className='p-3 m-3 bg-green-600'>
			<div>
				<img src={photoURL} />
			</div>
			<div>{userId}</div>
			<div>{name}</div>
		</div>
	);
};

export default NewChatUserItem;
