import React, { useContext, useEffect, Fragment, useRef, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import CallbackAlert from "../UI/CallbackAlert";
import { confirmAlert } from "react-confirm-alert";
const RequestAdvisor = (props) => {
	const history = useHistory();
	const { isLoading, error, sendRequest } = useHttp();
	const ctx = useContext(AuthContext);

	const linkRef = useRef("");
	const descriptionRef = useRef("");

	const [linkErrorMessage, setLinkErrorMessage] = useState("");
	const [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");

	const submitHandler = (e) => {
		if (e.target.disabled) {
			return;
		}

		e.target.disabled = true;

		let isError = false;
		const link = linkRef.current.value;
		const description = descriptionRef.current.value;

		if (link === "" || link === null) {
			isError = true;
			setLinkErrorMessage("Portofolio link is required");
		} else {
			setLinkErrorMessage("");
		}

		if (description === "" || description === null) {
			isError = true;
			setDescriptionErrorMessage("Description is required");
		} else if (description.length < 50) {
			isError = true;
			setDescriptionErrorMessage("Description needs to be 50 characters or more");
		} else {
			setDescriptionErrorMessage("");
		}

		const data = {
			link,
			description,
		};

		if (!isError)
			sendRequest({ url: "user/advisor/" + ctx.user.userId + "/", method: "POST", body: data }, (returnData) => {
				confirmAlert({
					customUI: ({ onClose }) => {
						return <CallbackAlert onClose={onClose} status={"Success"} customMessage={"Request submitted successfully"} />;
					},
					afterClose: () => {
						history.push("/profile");
					},
				});
			});
		else e.target.disabled = false;
	};

	return (
		<Fragment>
			<div>Ini menu profile</div>

			<div className=''>
				<div>rqeuest</div>

				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>Description</span>
					<textarea
						className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg'
						placeholder='silahkan ceritakan blahlbahblah'
						ref={descriptionRef}
					/>
					<span className='text-red-700'>{descriptionErrorMessage}</span>
				</label>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>link pendukung</span>
					<input
						className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg'
						placeholder='linkblahblah'
						ref={linkRef}
					/>
					<span className='text-red-700'>{linkErrorMessage}</span>
				</label>

				<button className='block w-1/2 text-gray-500 text-sm border-collapse bg-blue-400 border-4' onClick={submitHandler}>
					Send Request
				</button>
			</div>
		</Fragment>
	);
};

export default RequestAdvisor;
