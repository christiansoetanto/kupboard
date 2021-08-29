import React from 'react';
import LoginForm from './LoginForm';

const Login = () => {
	return (
		<div className='flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 justify-center items-center w-full md:w-5/6 px-6 py-12 mx-auto'>
			<div className='flex items-center justify-center flex-1'>
				<img
					src={
						require('../../assets/illustrations/undraw_authentication_fsn5.svg')
							.default
					}
					alt=''
				/>
			</div>
			<LoginForm />
		</div>
	);
};

export default Login;
