import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import AuthContext from "../../contexts/auth-context";
const Login = () => {
	const ctx = useContext(AuthContext);

	const history = useHistory();

	const loginHandler = async (provider) => {
		await ctx.onLogin(provider);

		history.push("/");
	};

	return (
		<div className='flex flex-col items-center justify-center space-y-6 h-screen bg-cover' style={{minHeight: '100%', backgroundImage: 'url("https://img.rasset.ie/000d8bcc-1600.jpg")'}}>
			<div className='flex items-center justify-center w-full text-xl md:text-5xl font-semibold h-24' style={{background: 'rgba(120, 113, 108, 0.7)'}}>
				<div className='px-48 py-8 rounded text-white'>
					Welcome to <span className='text-amber-300 text-2xl md:text-6xl'>Kupboard</span>
				</div>
			</div>
			<div className='flex bg-warmGray-100 w-full flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 justify-center items-center w-full md:w-5/6 px-6 py-12 mx-auto'>
				<div className='flex items-center justify-center flex-1'>
					<img src={require("../../assets/illustrations/undraw_authentication_fsn5.svg").default} alt='' />
				</div>
				<LoginForm loginHandler={loginHandler} />
			</div>
		</div>
	);
};

export default Login;
