import React, { Fragment, useState, useRef, useEffect, useContext } from "react";
import FormMessage from "./FormMessage";
import MessageItem from "./MessageItem";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AuthContext from "../../contexts/auth-context";
import UserItem from "./UserItem";
const UserList = (props) => {
	const ctx = useContext(AuthContext);
	const { firestore, onClick } = props;
	const { userId } = ctx.user;

	const messagesRef = firestore.collection("messages");
	const query = messagesRef.where("roomOwnersArray", "array-contains", userId);
	const [messages] = useCollectionData(query, { idField: "id" });
	const [uniqueMessageList, setUniqueMessageList] = useState([]);

	useEffect(() => {
		if (messages) {
			const unique = [];
			messages
				.sort((a, b) => b.createdAt - a.createdAt)
				.map((x) => (unique.filter((a) => a.roomOwnersString === x.roomOwnersString).length > 0 ? null : unique.push(x)));
			setUniqueMessageList(unique);
		}
	}, [messages]);

	return (
		<div>
			{uniqueMessageList &&
				uniqueMessageList.map((e) => (
					<UserItem
						key={e.id}
						userId={e.roomOwnersString.replace(userId, "")}
						text={e.text}
						createdAt={e.createdAt}
						onClick={(id) => {
							onClick(id);
						}}
						firestore={firestore}
					/>
				))}
		</div>
	);
};

export default UserList;
