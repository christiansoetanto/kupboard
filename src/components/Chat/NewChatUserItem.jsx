import React from "react";
import ViewProfileSvg from "./ViewProfileSvg";

const NewChatUserItem = (props) => {
	const { userId, photoURL, name, onClick } = props;
	return (
		<div
			onClick={() => {
				onClick(userId, photoURL, name);
			}}
			className='p-3 mx-2 my-4 cursor-pointer hover:bg-gray-200'>
			<div className='flex flex-row text-center items-center align-middle justify-end'>
				<div className='justify-start mr-auto flex items-center space-x-4'>
					<div className='mr-3 w-8 h-8 rounded-full overflow-hidden'>
						<img src={photoURL} />
					</div>
					<div>{name}</div>
				</div>
				<div>
					<ViewProfileSvg receiverUserId={userId} />
				</div>
			</div>
		</div>
	);
};

export default NewChatUserItem;
