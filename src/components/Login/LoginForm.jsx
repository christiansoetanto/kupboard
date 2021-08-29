import React from 'react';
import { facebookProvider, googleProvider } from '../../configs/AuthMethod';
import socialMediaAuth from './auth';

const LoginForm = () => {
	const loginOnClick = async (provider) => {
		const res = await socialMediaAuth(provider);
		console.log(res);
	};

	return (
		<div className='flex flex-col items-center justify-center space-y-5 flex-1 border-2 px-6 py-12 rounded-md shadow-xl'>
			<button
				className='p-2 border-2 border-gray-200 rounded-lg px-6 w-full bg-blue-500 text-gray-100 font-semibold text-right'
				onClick={() => loginOnClick(facebookProvider)}
			>
				Log in with Facebook
			</button>
			<button
				className='p-2 border-2 border-gray-200 rounded-lg px-6 w-full bg-gray-100 text-gray-900 font-semibold text-right'
				onClick={() => loginOnClick(googleProvider)}
			>
				Log in with Google
			</button>
		</div>
	);
};

export default LoginForm;
