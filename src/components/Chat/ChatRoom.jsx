import React, { Fragment, useState, useRef, useEffect, useContext } from "react";
import FormMessage from "./FormMessage";
import MessageItem from "./MessageItem";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AuthContext from "../../contexts/auth-context";
import useHttp from "../../hooks/use-http";
import CancelSvg from "../UI/CancelSvg";
import ViewProfileSvg from "./ViewProfileSvg";
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
		setTimeout(() => {
			dummy.current.scrollIntoView({ behavior: "smooth" });
		}, 100);
		// dummy.current.scrollIntoView({ behavior: "smooth" });
		// const objDiv = document.getElementById('chat-list-container');
		// objDiv.scrollTop = objDiv.scrollHeight + 500;
	};
	useEffect(() => {
		sendRequest(
			{
				url: `user/name-photo/${receiverUserId}`,
			},
			(result) => {
				setPhotoURL(result.photoURL ?? "");
				setName(result.name ?? "");
				dummy.current.scrollIntoView();
			}
		);
	}, [receiverUserId]);
	return (
		<Fragment>
			<div className='flex flex-col pb-12 relative h-full'>
				<div className='flex items-center mb-2 justify-end px-5'>
					<div className='justify-start mr-auto flex items-center space-x-4'>
						<div className='w-10 h-10 rounded-full overflow-hidden'>
							<img src={photoURL} className='' />
						</div>
						<div className='text-semibold '>{name}</div>
					</div>

					<div>
						<ViewProfileSvg receiverUserId={receiverUserId} />
					</div>
				</div>

				<div>
					<hr className='border-gray-200' />
				</div>

				<div className='mt-4 overflow-y-scroll mb-6' id='chat-list-container'>
					{messages &&
						messages
							.sort((a, b) => a.createdAt - b.createdAt)
							.map((msg, idx) => <MessageItem key={msg.id} message={msg} nextMessage={messages[idx + 1]} />)}
					<span ref={dummy}></span>
				</div>
				<div className='pt-3 absolute bottom-2 right-auto left-auto w-full'>
					{<FormMessage onSubmit={submitHandler} receiverUserId={receiverUserId} />}
				</div>
			</div>
		</Fragment>
	);
};

export default ChatRoom;
