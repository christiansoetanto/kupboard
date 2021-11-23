import React, { useContext } from 'react';
import {
	facebookProvider,
	googleProvider,
	twitterProvider,
} from '../../configs/AuthMethod';

const LoginForm = (props) => {
	return (
		<div className='flex flex-row justify-evenly'>
			<div
				className='cursor-pointer w-14 rounded-full transform transition duration-300 hover:scale-110'
				onClick={() => props.loginHandler(googleProvider)}
			>
				<img
					src={
						require('../../assets/illustrations/google_icon.svg')
							.default
					}
					alt=''
				/>
			</div>
			<div
				className='cursor-pointer w-14 rounded-full transform transition duration-300 hover:scale-110'
				onClick={() => props.loginHandler(facebookProvider)}
			>
				<img
					src={
						require('../../assets/illustrations/facebook_icon.svg')
							.default
					}
					alt=''
				/>
			</div>
			<div
				className='cursor-pointer w-14 rounded-full transform transition duration-300 hover:scale-110'
				onClick={() => props.loginHandler(twitterProvider)}
			>
				<img
					src={
						require('../../assets/illustrations/1486053611-twitter_79195.svg')
							.default
					}
					alt=''
				/>
			</div>
		</div>
	);
};

export default LoginForm;
