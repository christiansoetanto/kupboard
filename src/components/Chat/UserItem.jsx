import React from "react";
import firebase from "../../configs/firebase-config";

const UserItem = (props) => {
	const { userId, text, onClick, createdAt, firestore } = props;

	firebase.collection("users").once("value", (snap) => {
		console.log(snap.val());
	});

	return (
		<div
			onClick={() => {
				onClick(userId);
			}}
			className='p-3 m-3 bg-green-600'>
			<div>{userId}</div>
			<div>{text}</div>
			<div>{createdAt.toDate().toString()}</div>
		</div>
	);
};

export default UserItem;
