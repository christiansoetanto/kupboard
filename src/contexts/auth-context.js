import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

import firebase from "../configs/firebase-config";
import useHttp from "../hooks/use-http";

const socialMediaAuth = async (provider) => {
	try {
		const res = await firebase
			.auth()
			.signInWithPopup(provider);
		return res.user;
	} catch (err) {
		throw err;
	}
};

const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: () => {},
	user: null,
	token: null,
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	// const [storedUserInfo, setStoredUserInfo] = useState(null);

	const { sendRequest } = useHttp();

	useEffect(() => {
		const storedUserInformation = Cookies.get("user");
		const storedToken = Cookies.get("token");
		if (storedUserInformation && storedToken) {
			setIsLoggedIn(true);
			setUser(JSON.parse(storedUserInformation));
			setToken(storedToken);
		}
	}, []);

	const logoutHandler = () => {
		Cookies.remove("user");
		Cookies.remove("token");
		setUser(null);
		setToken(null);
		setIsLoggedIn(false);
	};

	const handleLoginSuccess = (result) => {
		const user = result.data;
		const token = result.token;
		Cookies.set("user", JSON.stringify(user), { expires: 365 });
		Cookies.set("token", token, { expires: 365 });
		setUser(user);
		setToken(token);
		setIsLoggedIn(true);
	};

	const registerUser = async (data) => {
		const dataToBeSent = {
			UserId: data.uid,
			Name: data.displayName,
			Email: data.email,
			PhotoURL: data.photoURL,
			PhoneNumber: data.PhoneNumber,
			ProviderId: data.providerData[0].providerId,
		};

		await sendRequest({ url: "user/", method: "POST", body: dataToBeSent }, handleLoginSuccess);
	};

	const loginHandler = async (provider) => {
		try{
			const tempUser = await socialMediaAuth(provider);
			await sendRequest({ url: "user/" + tempUser.uid }, async (result) => {
				if (result.isExists) {
					handleLoginSuccess(result);
				} else {
					await registerUser(tempUser);
				}
			});
		}
		catch(err){
			console.log(err.message)
			alert("Failed to sign you in")
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
				user: user,
				token: token,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
