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
			<form onSubmit={sendMessage} className='flex space-x-2 rounded-3xl  bg-white pt-4 pb-2 pl-6 pr-2 items-center'>
				<input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='say something nice' className='w-full border-0 outline-none border-b' />

				<button type='submit' disabled={!message} className='w-10 pr-2'>
					<img src="https://img.icons8.com/dotty/80/000000/filled-sent.png"/>
				</button>
			</form>
		</div>
	);
};

export default FormMessage;
