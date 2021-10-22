import React, { useContext } from "react";
import AuthContext from "../../contexts/auth-context";
import helpers from "../Helper/helpers";
const MessageItem = (props) => {
	const ctx = useContext(AuthContext);

	const { text, senderUserId, photoURL, createdAt } = props.message;
	const messageClass = senderUserId === ctx.user.userId ? "sent" : "received";
	return (
		<div className={`message ${messageClass}`}>
			<div className='flex flex-row align-middle text-center items-center'>
				<div className='mr-3'>
					<img src={photoURL} className='w-5 h-5' />
				</div>
				<div>
					{text} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{helpers.formatDate(createdAt)}
				</div>
			</div>
		</div>
	);
};

export default MessageItem;
