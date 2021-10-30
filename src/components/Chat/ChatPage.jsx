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
			<div className='flex flex-row items-stretch align-middle '>
				<div className='p-3 w-1/3 h-screen'>
					<UserList firestore={firestore} onClick={clickHandler} currentReceiverUserId={receiverUserId} />
				</div>
				{receiverUserId && (
					<div className='p-3 font-medium bg-red-400 flex-auto w-2/3 h-screen'>
						<ChatRoom firestore={firestore} receiverUserId={receiverUserId} onClose={closeChatRoomHandler} />
					</div>
				)}
				{!receiverUserId && (
					<div className='w-2/3'>
						{!isOpenNewChatWindow && <div className='p-3 bg-blue-400 flex items-center justify-center h-screen' onClick={openNewChatHandler}>
							pencet ini untuk start new chat
						</div>}
						{isOpenNewChatWindow && (
							<div className='p-3 bg-red-400 h-screen'>
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
