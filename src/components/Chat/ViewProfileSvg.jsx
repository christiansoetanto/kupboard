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
				const { name, birthDate, email, facebook, gender, instagram, linkedIn, otherSocialMedia, phoneNumber, twitter, photoURL } = returnData.user;
				confirmAlert({
					customUI: ({ onClose }) => {
						return (
							<PopUp title={"Profile"} onClose={onClose}>
								<div className='flex flex-col justify-start'>
									<div className='relative w-16 h-16 mr-3 rounded-full md:block mb-2'>
										<img
											className='object-cover w-full h-full rounded-full'
											src={photoURL}
											alt=''
											loading='lazy'
										/>
										<div
											className='absolute inset-0 rounded-full shadow-inner'
											aria-hidden='true'
										></div>
									</div>
									<div className='font-semibold text-2xl mb-6'>
										{name}
									</div>
									<div className='mb-4'>
										{description}
									</div>
									<div className='flex justify-around'>
										{instagram && (<a className='w-8 h-8 cursor-pointer' href={instagram} target='_blank'>
											<img src={require("../../assets/illustrations/instagram.png").default} alt="" />
										</a>)}
										{facebook && (<a className='w-8 h-8 cursor-pointer' href={facebook} target='_blank'>
											<img src={require("../../assets/illustrations/facebook.png").default} alt="" />
										</a>)}
										{twitter && (<a className='w-8 h-8 cursor-pointer' href={twitter} target='_blank'>
											<img src={require("../../assets/illustrations/twitter.png").default} alt="" />
										</a>)}
									</div>

									{/* <div>Name: {name}</div>
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
									<div>link: {link}</div> */}
								</div>
							</PopUp>
						);
					},
				});
			}
		);
	};

	return (
		<div onClick={viewProfileHandler} className='cursor-pointer'>
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
