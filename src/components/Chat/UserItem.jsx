import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import helpers from "../Helper/helpers";

const UserItem = (props) => {
	const { userId, text, onClick, createdAt, firestore } = props;
	const { isLoading, error, sendRequest } = useHttp();

	const [photoURL, setPhotoURL] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		sendRequest(
			{
				url: `user/name-photo/${userId}`,
			},
			(result) => {
				setPhotoURL(result.photoURL ?? "");
				setName(result.name ?? "");
			}
		);
	}, []);

	return (
		<div
			onClick={() => {
				onClick(userId);
			}}
			className='p-3 m-3 bg-green-600'>
			<div className='flex flex-row align-middle text-center items-center'>
				<div className='align-middle text-center items-center'>
					<div className='flex flex-col'>
						<div>{name}</div>

						<div className='mr-5'>
							<img src={photoURL} className='w-10 h-10' />
						</div>
					</div>
				</div>
				<div className='align-middle text-center items-center'>
					<div className='flex flex-col'>
						<div>{text}</div>
						<div>{helpers.formatDate(createdAt)}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserItem;
