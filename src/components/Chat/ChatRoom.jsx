import React, { Fragment, useState, useRef, useEffect, useContext } from "react";
import FormMessage from "./FormMessage";
import MessageItem from "./MessageItem";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";
import CancelSvg from "../UI/CancelSvg";
const ChatRoom = (props) => {
	const ctx = useContext(AuthContext);
	const { isLoading, error, sendRequest } = useHttp();
	const { userId } = ctx.user;
	const { firestore, receiverUserId, onClose } = props;
	const [photoURL, setPhotoURL] = useState("");
	const [name, setName] = useState("");
	const dummy = useRef();
	const messagesRef = firestore.collection("messages");
	const query = messagesRef.where("roomOwnersString", "==", receiverUserId < userId ? receiverUserId + userId : userId + receiverUserId);
	const [messages] = useCollectionData(query, { idField: "id" });

	const submitHandler = async (msg) => {
		await messagesRef.add(msg);
		dummy.current.scrollIntoView({ behavior: "smooth" });
	};
	useEffect(() => {
		sendRequest(
			{
				url: `user/name-photo/${receiverUserId}`,
			},
			(result) => {
				setPhotoURL(result.photoURL ?? "");
				setName(result.name ?? "");
			}
		);
	}, []);
	return (
		<Fragment>
			<div className=''>
				<CancelSvg
					onClick={() => {
						onClose();
					}}
				/>
			</div>
			<div>
				percakapan dengan
				<div className='flex mb-10'>
					<br />
					<div>
						<img src={photoURL} className='w-10 h-10' />
					</div>
					<div>{name}</div>
				</div>
				{messages && messages.sort((a, b) => a.createdAt - b.createdAt).map((msg) => <MessageItem key={msg.id} message={msg} />)}
				<span ref={dummy}></span>
				<div className='pt-3 mt-3'>{<FormMessage onSubmit={submitHandler} receiverUserId={receiverUserId} />}</div>
			</div>
		</Fragment>
	);
};

export default ChatRoom;
