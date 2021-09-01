import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";

import firebase from "../configs/firebase-config";
import useHttp from "../hooks/use-http";

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
	onLogin: () => {},
	user: null,
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	// const [storedUserInfo, setStoredUserInfo] = useState(null);

	const { isLoading, error, sendRequest } = useHttp();

	useEffect(() => {
		const storedUserInformation = localStorage.getItem("user");
		if (storedUserInformation != null) {
			const storedUserInfo = JSON.parse(storedUserInformation);
			setIsLoggedIn(true);
			setUser(storedUserInfo);
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem("user");
		setUser(null);
		setIsLoggedIn(false);
	};

	const registerUser = async (data) => {

		const dataToBeSent = {
			UserId: data.uid,
			Name: data.displayName,
			Email: data.email,
			PhotoURL: data.photoURL,
			PhoneNumber: data.PhoneNumber,
			ProviderId: data.providerData[0].providerId
		}

		await sendRequest({ url: "user/", method: "POST", body: dataToBeSent }, (result) => {
			localStorage.setItem("user", JSON.stringify(result));
			setUser(result);
			setIsLoggedIn(true);
		});
	};

	const loginHandler = async (provider) => {
		const tempUser = await socialMediaAuth(provider);
		await sendRequest({ url: "user/" + tempUser.uid }, async (result) => {
			console.log(result)
			if (result.isExists) {
				localStorage.setItem("user", JSON.stringify(result.data));
				setUser(result.data);
				setIsLoggedIn(true);
			} else {
				await registerUser(tempUser);

			}
		});
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
				user: user,
			}}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
