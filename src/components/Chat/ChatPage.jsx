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
		setIsOpenNewChatWindow(true);
	};

	const selectNewChatHandler = (userId) => {
		setIsOpenNewChatWindow(false);
		setReceiverUserId(userId);
	};

	return (
		<Fragment>
			<div className='p-3 m-3 bg-blue-400'>lagi buka chat userId = {receiverUserId}</div>
			<div className='p-3 m-3 bg-teal-400'>
				ini user list
				<UserList firestore={firestore} onClick={clickHandler} currentReceiverUserId={receiverUserId} />
			</div>
			{receiverUserId && (
				<div className='p-3 m-3 bg-red-400'>
					<ChatRoom firestore={firestore} receiverUserId={receiverUserId} />
				</div>
			)}
			<div className='p-3 m-3 bg-blue-400'>
				<div onClick={openNewChatHandler}>pencet ini untuk buka window new chat</div>
			</div>
			{isOpenNewChatWindow && (
				<div className='p-3 m-3 bg-red-400'>
					<NewChat onSelect={selectNewChatHandler} />
				</div>
			)}
		</Fragment>
	);
};

export default ChatPage;
