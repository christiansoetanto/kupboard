import React, { useState, useEffect, useContext, Fragment } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import ChatRoom from "./ChatRoom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AuthContext from "../../contexts/auth-context";
import UserList from "./UserList";
const ChatPage = () => {
	const firestore = firebase.firestore();
	const [receiverUserId, setReceiverUserId] = useState("");

	const clickHandler = (receiverUserId) => {
		setReceiverUserId(receiverUserId);
	};

	return (
		<Fragment>
			<div className='p-3 m-3 bg-blue-400'>lagi buka chat userId = {receiverUserId}</div>
			<div className='p-3 m-3 bg-teal-400'>
				ini user list
				<UserList firestore={firestore} onClick={clickHandler} currentReceiverUserId={receiverUserId} />
			</div>
			<div className='p-3 m-3 bg-red-400'>
				<ChatRoom firestore={firestore} receiverUserId={receiverUserId} />
			</div>
		</Fragment>
	);
};

export default ChatPage;
