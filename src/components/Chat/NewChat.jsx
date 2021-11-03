import React, { useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/use-http";
import NewChatUserItem from "./NewChatUserItem";
import AuthContext from "../../contexts/auth-context";

const NewChat = (props) => {
	const ctx = useContext(AuthContext);
	const { onSelect } = props;
	const { isLoading, error, sendRequest } = useHttp();
	const [userList, setUserList] = useState([]);
	useEffect(() => {
		sendRequest(
			{
				url: `user/advisors/${ctx.user.userId}`,
			},
			(result) => {
				setUserList(result);
			}
		);
	}, []);

	return (
		<div>
			{userList &&
				userList.map((e) => (
					<NewChatUserItem
						key={e.userId}
						userId={e.userId}
						photoURL={e.photoURL}
						name={e.name}
						onClick={(userId) => {
							onSelect(userId);
						}}
					/>
				))}
			{userList.length <= 0 && <div className='p-5 text-center'>No advisor available</div>}
		</div>
	);
};

export default NewChat;
