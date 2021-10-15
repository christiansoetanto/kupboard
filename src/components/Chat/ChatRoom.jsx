import React, { Fragment, useState, useRef, useEffect, useContext } from "react";
import FormMessage from "./FormMessage";
import MessageItem from "./MessageItem";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AuthContext from "../../contexts/auth-context";
const ChatRoom = (props) => {
	const ctx = useContext(AuthContext);
	const { userId } = ctx.user;
	const { firestore, receiverUserId } = props;
	const dummy = useRef();

	const messagesRef = firestore.collection("messages");
	const query = messagesRef.where("roomOwnersString", "==", receiverUserId < userId ? receiverUserId + userId : userId + receiverUserId);

	const [messages] = useCollectionData(query, { idField: "id" });

	const submitHandler = async (msg) => {
		await messagesRef.add(msg);
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<Fragment>
			<div>
				{messages && messages.sort((a, b) => a.createdAt - b.createdAt).map((msg) => <MessageItem key={msg.id} message={msg} />)}

				<span ref={dummy}></span>
			</div>
			<div>
				<FormMessage onSubmit={submitHandler} receiverUserId={receiverUserId} />
			</div>
		</Fragment>
	);
};

export default ChatRoom;
