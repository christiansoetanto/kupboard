import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";

const UserItem = (props) => {
	const { userId, text, onClick, createdAt, firestore } = props;
	const { isLoading, error, sendRequest } = useHttp();

	const [photoUrl, setPhotoUrl] = useState("");

	useEffect(() => {
		sendRequest(
			{
				url: `user/photo/${userId}`,
			},
			(result) => {
				setPhotoUrl(result.photoURL ?? "");
			}
		);
	}, []);

	return (
		<div
			onClick={() => {
				onClick(userId);
			}}
			className='p-3 m-3 bg-green-600'>
			<div>
				<img src={photoUrl} />
			</div>
			<div>{userId}</div>
			<div>{text}</div>
			<div>{createdAt?.toDate().toString()}</div>
		</div>
	);
};

export default UserItem;
