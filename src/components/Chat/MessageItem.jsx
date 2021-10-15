import React, { useContext } from "react";
import AuthContext from "../../contexts/auth-context";

const MessageItem = (props) => {
	const ctx = useContext(AuthContext);

	const { text, uid, photoURL } = props.message;
	const messageClass = uid === ctx.user.userId ? "sent" : "received";
	return (
		<div className={`message ${messageClass}`}>
			<img src={photoURL} />
			<p>{text}</p>
		</div>
	);
};

export default MessageItem;
