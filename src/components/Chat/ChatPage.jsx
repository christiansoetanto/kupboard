import React, { useState, useEffect, useContext, Fragment } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import ChatRoom from './ChatRoom';
import NewChat from './NewChat';
import UserList from './UserList';
import { confirmAlert } from 'react-confirm-alert';
const ChatPage = () => {
	const firestore = firebase.firestore();
	const [receiverUserId, setReceiverUserId] = useState('');
	const [isOpenNewChatWindow, setIsOpenNewChatWindow] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const clickHandler = (receiverUserId) => {
		setReceiverUserId(receiverUserId);
	};

	const selectNewChatHandler = (userId) => {
		setIsOpenNewChatWindow(false);
		setReceiverUserId(userId);
		closeMenu();
	};

	const closeChatRoomHandler = () => {
		setReceiverUserId('');
	};

	const openNewChatHandler = () => {
		setIsOpenNewChatWindow((prev) => !prev);
		setShowMenu((prev) => !prev);
	};

	const closeMenu = () => {
		setShowMenu(false);
	};

	return (
		<Fragment>
			<div className='flex flex-row items-stretch align-middle bg-white rounded-xl'>
				<div
					className='p-3 w-1/3 flex flex-col overflow-y-scroll'
					style={{ height: '80vh' }}
				>
					{
						<div
							className='p-3 bg-blue-400 flex items-center justify-center cursor-pointer text-white'
							onClick={openNewChatHandler}
						>
							Start new chat
						</div>
					}
					<UserList
						firestore={firestore}
						onClick={clickHandler}
						currentReceiverUserId={receiverUserId}
					/>
				</div>
				<div
					className='border-gray-300 font-medium flex-auto border-2 p-3 w-2/3'
					style={{ height: '80vh' }}
				>
					{receiverUserId && (
						// <div className='   border-gray-300 border-2'>
						<ChatRoom
							firestore={firestore}
							receiverUserId={receiverUserId}
							onClose={closeChatRoomHandler}
						/>
						// </div>
					)}
					{!receiverUserId && (
						<div className='flex items-center justify-center h-full'>
							<div
								className='p-3 bg-blue-400 flex items-center justify-center cursor-pointer text-white'
								onClick={openNewChatHandler}
							>
								Start new chat
							</div>
						</div>
					)}
				</div>
				{/* {!receiverUserId && (
					<div className='w-2/3'>
						{isOpenNewChatWindow && (
							<div className='p-3 h-full'>
								<NewChat onSelect={selectNewChatHandler} />
							</div>
						)}
					</div>
				)} */}
				{showMenu && (
					<div
						id='modal-root'
						className='bg-gray-700 bg-opacity-50 fixed w-full h-full left-0 top-0 z-10 flex flex-col items-center justify-center'
						onClick={closeMenu}
					>
						<div className='bg-white w-1/2 max-w-md rounded-lg border border-gray-300'>
							<div className='flex flex-col divide-y-2'>
								<NewChat onSelect={selectNewChatHandler} />
							</div>
						</div>
					</div>
				)}
			</div>
		</Fragment>
	);
};

export default ChatPage;
