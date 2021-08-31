import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { facebookProvider, googleProvider } from '../../configs/AuthMethod';
import AuthContext from '../../contexts/auth-context';

const LoginForm = () => {
	const ctx = useContext(AuthContext);

	const history = useHistory();

	const loginHandler = (provider) => {
		ctx.onLogin(provider);
		history.push("/");
	}

	return (
		<div className='flex flex-col items-center justify-center space-y-5 flex-1 border-2 px-6 py-12 rounded-md shadow-xl'>
			<button
				className='p-2 border-2 border-gray-200 rounded-lg px-6 w-full bg-blue-500 text-gray-100 font-semibold text-right'
				onClick={() => loginHandler(facebookProvider)}
			>
				Log in with Facebook
			</button>
			<button
				className='p-2 border-2 border-gray-200 rounded-lg px-6 w-full bg-gray-100 text-gray-900 font-semibold text-right'
				onClick={() => loginHandler(googleProvider)}
			>
				Log in with Google
			</button>
		</div>
	);
};

export default LoginForm;
