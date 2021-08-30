import React, { useState } from "react";
import Card from "../components/UI/Card";
import useHttp from "../hooks/use-http";
import firebase from "firebase";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
const UploadGambar = (props) => {
	const handleUploadStart = () => {
		console.log("handleUploadStart");
	};
	const handleUploadError = () => {
		console.log("handleUploadError");
	};
	const handleUploadSuccess = (uploadedfilename) => {
		console.log("handleUploadSuccess, filename: " + uploadedfilename);
	};
	const handleProgress = () => {
		console.log("handleProgress");
	};

	const handleChangeUsername = () => {
		console.log("change username");
	};

	return (
		<Card>
			<div>
				<form>
					<label>Username:</label>
					<input type='text' value='username' name='username' onChange={handleChangeUsername} />
					<label>Avatar:</label>
					<CustomUploadButton
						accept='image/*'
						name='avatar'
						randomizeFilename
						storageRef={firebase.storage().ref("images")}
						onUploadStart={handleUploadStart}
						onUploadError={handleUploadError}
						onUploadSuccess={handleUploadSuccess}
						onProgress={handleProgress}
						style={{ backgroundColor: "steelblue", color: "white", padding: 10, borderRadius: 4 }}>
						upload ur amazin clothin
					</CustomUploadButton>
				</form>
			</div>
		</Card>
	);
};

export default UploadGambar;
