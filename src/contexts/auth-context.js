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

	const { isLoading: sendUser_isLoading, error: sendUser_error, sendRequest: sendUserData } = useHttp();

	useEffect(() => {
		const storedUserInformation = localStorage.getItem("user");
		console.log(JSON.parse(storedUserInformation));
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
		console.log(data);
		sendUserData({ url: "user/", method: "POST", body: { UserId: data.uid } }, (result) => {
			localStorage.setItem("user", JSON.stringify(result.Data));
			setUser(result.Data);
			setIsLoggedIn(true);
		});
	};

	const loginHandler = async (provider) => {
		const tempUser = await socialMediaAuth(provider);

		await sendUserData({ url: "user/" + tempUser.uid }, async (result) => {
			console.log("hore berhasil");

			console.log(result);
			if (result.IsExists) {
				localStorage.setItem("user", JSON.stringify(result.Data));
				setUser(result.Data);
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
