import React, { useContext } from "react";
import AuthContext from "../../contexts/auth-context";

const MessageItem = (props) => {
	const ctx = useContext(AuthContext);

	const { text, senderUserId, photoURL, createdAt } = props.message;
	const messageClass = senderUserId === ctx.user.userId ? "sent" : "received";
	return (
		<div className={`message ${messageClass}`}>
			<div>
				<img src={photoURL} />
				<span>
					{text} || {createdAt.toDate().toString()}
				</span>
			</div>
		</div>
	);
};

export default MessageItem;
