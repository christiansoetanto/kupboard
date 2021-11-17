import React from "react";
import { confirmAlert } from "react-confirm-alert";
import CancelSvg from "../UI/CancelSvg";
import useHttp from "../../hooks/use-http";
import PopUp from "../UI/PopUp";
const ViewProfileSvg = (props) => {
	const { receiverUserId } = props;
	const { isLoading, error, sendRequest } = useHttp();
	const viewProfileHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
		sendRequest(
			{
				url: `user/advisor/profile/${receiverUserId}`,
			},
			(returnData) => {
				const { description, link } = returnData;
				const { name, birthDate, email, facebook, gender, instagram, linkedIn, otherSocialMedia, phoneNumber, twitter } = returnData.user;
				confirmAlert({
					customUI: ({ onClose }) => {
						return (
							<PopUp title={"Profile"} onClose={onClose}>
								<div>
									<div>Name: {name}</div>
									<div>birthDate: {birthDate}</div>
									<div>email: {email}</div>
									<div>facebook: {facebook}</div>
									<div>gender: {gender}</div>
									<div>instagram: {instagram}</div>
									<div>linkedIn: {linkedIn}</div>
									<div>otherSocialMedia: {otherSocialMedia}</div>
									<div>phoneNumber: {phoneNumber}</div>
									<div>twitter: {twitter}</div>
									<div>description: {description}</div>
									<div>link: {link}</div>
								</div>
							</PopUp>
						);
					},
				});
			}
		);
	};

	return (
		<div onClick={viewProfileHandler}>
			<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
				/>
			</svg>
		</div>
	);
};

export default ViewProfileSvg;
