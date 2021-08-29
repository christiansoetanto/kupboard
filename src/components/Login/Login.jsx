import React from 'react';
import { facebookProvider, googleProvider } from '../../configs/AuthMethod';
import socialMediaAuth from './auth';

const Login = () => {
	const loginOnClick = async (provider) => {
		const res = await socialMediaAuth(provider);
		console.log(res);
	};

	return (
		<div>
			<button onClick={() => loginOnClick(facebookProvider)}>
				Facebook
			</button>
			<button onClick={() => loginOnClick(googleProvider)}>Google</button>
		</div>
	);
};

export default Login;
