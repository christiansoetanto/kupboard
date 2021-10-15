import React, { useState, useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import AuthContext from "../../contexts/auth-context";

const FormMessage = (props) => {
	const ctx = useContext(AuthContext);
	const { onSubmit, receiverUserId } = props;
	const [message, setMessage] = useState("");
	const sendMessage = async (e) => {
		e.preventDefault();
		const { userId, photoURL } = ctx.user;
		const msg = {
			text: message,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			senderUserId: userId,
			receiverUserId: receiverUserId,
			photoURL,
			roomOwnersArray: [receiverUserId, userId],
			roomOwnersString: receiverUserId < userId ? receiverUserId + userId : userId + receiverUserId,
		};
		onSubmit(msg);
		setMessage("");
	};
	return (
		<div>
			<form onSubmit={sendMessage}>
				<input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='say something nice' />

				<button type='submit' disabled={!message}>
					🕊️
				</button>
			</form>
		</div>
	);
};

export default FormMessage;
