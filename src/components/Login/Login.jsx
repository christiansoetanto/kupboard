import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';
import AuthContext from '../../contexts/auth-context';
const Login = () => {
	const ctx = useContext(AuthContext);

	const history = useHistory();

	const loginHandler = async (provider) => {
		await ctx.onLogin(provider);

		history.push('/');
	};

	return (
		<div className='flex flex-col items-center relative px-8 pt-4'>
			<div className='flex flex-row items-center space-x-2 md:space-x-4'>
				{/* <div className='text-orange-400 font-bold text-4xl md:text-7xl'> */}
				<div className='float-left text-orange-400 font-bold text-3xl md:text-7xl'>
					Welcome to
				</div>
				{/* </div> */}
				{/* <div className=''> */}
					<img
						src={
							require('../../assets/illustrations/logotext_v2.png')
								.default
						}
						alt=''
						className='float-right md:h-20 h-6'
						// style={{height: '90px'}}
					/>
				{/* </div> */}
			</div>

			<div className='flex flex-col md:flex-row w-full md:space-x-4 justify-center md:justify-end items-center'>
				<div className='flex flex-col space-y-7 shadow-xl rounded-lg border md:w-1/3 px-8 py-4'>
					<img
						src={
							require('../../assets/illustrations/undraw_authentication_fsn5.svg')
								.default
						}
						alt=''
					/>
					<div className='text-3xl font-semibold text-center mb-4'>
						Login With
					</div>

					<LoginForm loginHandler={loginHandler} />
				</div>
				<div className='md:full'>
					<div className='-'>
						<img
							src={
								require('../../assets/illustrations/wardrobe.svg')
									.default
							}
							alt=''
							style={{ mixBlendMode: 'multiply' }}
						/>
					</div>
				</div>
			</div>
		</div>

		// <div className='flex flex-col items-center justify-center space-y-6 h-screen bg-cover'>
		// 	<div className='flex items-center justify-center w-full text-xl md:text-5xl font-semibold h-24' style={{background: 'rgba(120, 113, 108, 0.7)'}}>
		// 		<div className='px-48 py-8 rounded text-white'>
		// 			Welcome to <span className='text-amber-300 text-2xl md:text-6xl'>Kupboard</span>
		// 		</div>
		// 	</div>
		// 	<div className='flex bg-warmGray-100 w-full flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 justify-center items-center w-full md:w-5/6 px-6 py-12 mx-auto'>
		// 		<div className='flex items-center justify-center flex-1'>
		// 			<img src={require("../../assets/illustrations/undraw_authentication_fsn5.svg").default} alt='' />
		// 		</div>
		// 		<LoginForm loginHandler={loginHandler} />
		// 	</div>
		// </div>
	);
};

export default Login;
