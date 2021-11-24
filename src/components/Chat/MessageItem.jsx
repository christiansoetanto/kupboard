import React, { useContext } from 'react';
import AuthContext from '../../contexts/auth-context';
import helpers from '../Helper/helpers';
import './ChatBubble.css';
const MessageItem = (props) => {
	const ctx = useContext(AuthContext);

	const {
		text,
		senderUserId,
		photoURL,
		createdAt,
		isAttachment,
		attachmentUrl,
	} = props.message;
	const { nextMessage } = props;
	const messageClass =
		senderUserId === ctx.user.userId ? 'from-me' : 'from-them';
	return (
		<div
			className={`message  flex ${
				messageClass == 'from-me' ? 'justify-end' : 'justify-start'
			}`}
		>
			<div className='flex flex-row align-middle text-center items-center '>
				{/* <div className='mr-3'>
					<img src={photoURL} className='w-5 h-5' />
				</div> */}
				{isAttachment && (
					<div
						className={`flex w-full mb-1 md:mb-4 ${
							messageClass == 'from-me'
								? 'justify-end mr-6'
								: 'justify-start ml-6'
						}`}
					>
						<div className={`w-1/2`}>
							<img src={attachmentUrl}></img>
						</div>
					</div>
				)}
				{!isAttachment && (
					<div
						className={`imessage text-right flex ${
							messageClass == 'from-me'
								? 'justify-end'
								: 'justify-start'
						}`}
					>
						<p
							className={`${messageClass}   ${
								nextMessage &&
								nextMessage.senderUserId == senderUserId
									? 'no-tail'
									: 'mb-4'
							}`}
						>
							{text}
							{/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{helpers.formatDate(createdAt)} */}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MessageItem;
