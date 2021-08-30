import React, { useEffect, useState } from 'react';
import { Redirect, Route } from "react-router-dom";

import firebase from '../configs/firebase-config';

const socialMediaAuth = (provider) => {
	return firebase
		.auth()
		.signInWithPopup(provider)
		.then((res) => {
			return res.user;
		})
		.catch((err) => {
			return err;
		});
};

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (provider) => {},
	user: null,
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, SetUser] = useState(null);

	useEffect(() => {
		const storedUserInformation = localStorage.getItem('user');
		console.log(storedUserInformation == null);
		if (storedUserInformation != null) {
			console.log(storedUserInformation.displayName);
			setIsLoggedIn(true);
			SetUser(storedUserInformation)
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem('user');
		console.log('logged out');
		SetUser(null);
		setIsLoggedIn(false);
	};

	const loginHandler = async (provider) => {
		const tempUser = await socialMediaAuth(provider);
		// console.log('hahahaha')
		console.log(tempUser);
		localStorage.setItem('user', tempUser);
		SetUser(tempUser);
		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
				user: user,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
