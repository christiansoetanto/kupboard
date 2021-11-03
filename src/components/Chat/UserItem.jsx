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
			className='px-6 py-4 my-2 hover:bg-gray-100 cursor-pointer'>

			<div className='flex space-x-2 items-center'>
				<div className='rounded-full overflow-hidden w-14 h-14'>
					<img src={photoURL} className='w-full' />
				</div>

				<div className='flex-col'>
					<div>
						{name}
					</div>
					<div className='flex text-gray-400 '>
						<div className='  overflow-ellipsis truncate '>
							{text.length > 25 ? text.substring(0, 24) + "..." : text}
						</div> 
						<div className='mx-2'>
							·
						</div>
						<div>
							{helpers.getTimePassed(createdAt)}
						</div>
					</div>
				</div>


			</div>


			{/* <div className='flex flex-row align-middle text-center items-center'>
				<div className='align-middle text-center items-center'>
					<div className='flex flex-col'>
						<div>{name}</div>

						<div className='rounded-full overflow-hidden w-14 h-14'>
							<img src={photoURL} className='w-full' />
						</div>
					</div>
				</div>
				<div className='align-middle text-center items-center'>
					<div className='flex flex-col'>
						<div>{text}</div>
						<div>{helpers.formatDate(createdAt)}</div>
					</div>
				</div>
			</div> */}
		</div>
	);
};

export default UserItem;
