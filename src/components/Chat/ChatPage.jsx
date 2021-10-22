import React, { useState, useEffect, useContext, Fragment } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import ChatRoom from "./ChatRoom";
import NewChat from "./NewChat";
import UserList from "./UserList";
const ChatPage = () => {
	const firestore = firebase.firestore();
	const [receiverUserId, setReceiverUserId] = useState("");
	const [isOpenNewChatWindow, setIsOpenNewChatWindow] = useState(false);
	const clickHandler = (receiverUserId) => {
		setReceiverUserId(receiverUserId);
	};

	const openNewChatHandler = () => {
		setIsOpenNewChatWindow((prev) => !prev);
	};

	const selectNewChatHandler = (userId) => {
		setIsOpenNewChatWindow(false);
		setReceiverUserId(userId);
	};

	const closeChatRoomHandler = () => {
		setReceiverUserId("");
	};

	return (
		<Fragment>
			<div className='flex flex-row  items-center align-middle'>
				{/* <div className='p-3 m-3 bg-blue-400'>lagi buka chat userId = {receiverUserId}</div> */}
				<div className='p-3 m-3 bg-teal-400 flex-auto'>
					ini list history chat
					<UserList firestore={firestore} onClick={clickHandler} currentReceiverUserId={receiverUserId} />
				</div>
				{receiverUserId && (
					<div className='p-3 m-3 bg-red-400 flex-auto'>
						<ChatRoom firestore={firestore} receiverUserId={receiverUserId} onClose={closeChatRoomHandler} />
					</div>
				)}
				{!receiverUserId && (
					<div className='flex-auto'>
						<div className='p-3 m-3 bg-blue-400 ' onClick={openNewChatHandler}>
							pencet ini untuk start new chat
						</div>
						{isOpenNewChatWindow && (
							<div className='p-3 m-3 bg-red-400'>
								<NewChat onSelect={selectNewChatHandler} />
							</div>
						)}
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default ChatPage;
