import React from "react";

const NewChatUserItem = (props) => {
	const { userId, photoURL, name, onClick } = props;
	return (
		<div
			onClick={() => {
				onClick(userId, photoURL, name);
			}}
			className='p-3 mx-2 my-4 cursor-pointer hover:bg-gray-200'>
			<div className='flex flex-row text-center items-center align-middle'>
				<div className='mr-3 w-8 h-8 rounded-full overflow-hidden'>
					<img src={photoURL} />
				</div>
				<div>{name}</div>
			</div>
		</div>
	);
};

export default NewChatUserItem;
