import Cookies from "js-cookie";
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

	const { sendRequest } = useHttp();

	useEffect(() => {
		const storedUserInformation = Cookies.get("user");
		if (storedUserInformation) {
			setIsLoggedIn(true);
			setUser(JSON.parse(storedUserInformation));
		}
	}, []);

	const logoutHandler = () => {
		Cookies.remove("user");
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
			ProviderId: data.providerData[0].providerId,
		};

		await sendRequest({ url: "user/", method: "POST", body: dataToBeSent }, (result) => {
			// localStorage.setItem("user", JSON.stringify(result));
			Cookies.set("user", JSON.stringify(result.data), { expires: 365 });
			setUser(result);
			setIsLoggedIn(true);
		});
	};

	const loginHandler = async (provider) => {
		const tempUser = await socialMediaAuth(provider);
		await sendRequest({ url: "user/" + tempUser.uid }, async (result) => {
			if (result.isExists) {
				setUser(result.data);
				Cookies.set("user", JSON.stringify(result.data), { expires: 365 });
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
