import React from "react";

const NewChatUserItem = (props) => {
	const { userId, photoURL, name, onClick } = props;
	return (
		<div
			onClick={() => {
				onClick(userId, photoURL, name);
			}}
			className='p-3 m-3 bg-green-600'>
			<div className='flex flex-row text-center items-center align-middle'>
				<div className='mr-3'>
					<img src={photoURL} className='w-6 h-6' />
				</div>
				<div>{name}</div>
			</div>
		</div>
	);
};

export default NewChatUserItem;
