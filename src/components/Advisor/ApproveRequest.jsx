import React, { useState, useEffect, useContext } from "react";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../contexts/auth-context";
import { Link, Route, a, NavLink, useHistory } from "react-router-dom";
import { Fragment } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./ApproveRequest.css";
import CancelSvg from "../UI/CancelSvg";
const ApproveRequest = () => {
	const { isLoading, error, sendRequest } = useHttp();

	const [requestList, setRequestList] = useState([]);
	const ctx = useContext(AuthContext);
	useEffect(() => {
		if (ctx.user.isAdmin != 1) {
			alert("pergi sana");
		}
	}, []);
	const fetchRequestList = () => {
		sendRequest({ url: "user/advisor/get-request/" }, (returnData) => {
			console.log(returnData);
			setRequestList(returnData);
		});
	};

	useEffect(() => {
		fetchRequestList();
	}, []);

	const approveOrRejectHandler = (e) => {
		e.preventDefault();
		console.log(e.target.dataset);
		const userId = e.target.dataset.userid;
		const requestId = e.target.dataset.requestid;
		const status = e.target.dataset.status;
		console.log(userId, requestId, status);
		const data = {
			advisorRequestId: parseInt(requestId),
			userId: userId,
			status: status,
		};
		sendRequest({ url: "user/advisor/approve-reject/", method: "POST", body: data }, (returnData) => {
			console.log(returnData);
			fetchRequestList();
		});
	};

	const openProfileHandler = (e) => {
		e.preventDefault();
		const userId = e.target.dataset.userid;
		const user = requestList.filter((e) => e.userId == userId).map((e) => e.user)[0];
		console.log(user);
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='flex flex-col relative bg-white rounded border border-gray-900 py-2 px-4'>
						<div className='flex flex-row justify-between items-center mb-8 border-b-2 border-gray-200'>
							<div className='text-2xl font-semibold '>Profile</div>
							<div className='hover:text-gray-500' onClick={onClose}>
								<CancelSvg />
							</div>
						</div>
						<div className='grid grid-cols-3'>
							Name: {user.name}
							<br />
							{JSON.stringify(user, null, 2)}
						</div>
					</div>
				);
			},
		});
	};

	return (
		<Fragment>
			<h4>Request List</h4>
			{requestList.length == 0 && <div>No request</div>}
			{requestList.length > 0 && (
				<div>
					<table border=''>
						<thead>
							<tr>
								<th>Photo</th>
								<th>Name</th>
								<th>Description</th>
								<th colSpan='4'>Action</th>
							</tr>
						</thead>
						<tbody>
							{requestList.map((e) => {
								return (
									<tr key={e.advisorRequestId}>
										<td>
											<img src={e.user.photoURL}></img>
										</td>
										<td>{e.user.name}</td>
										<td className='break-words'>{e.description}</td>
										<td>
											<a href={e.link} target='_blank' rel='noreferrer noopener'>
												Open Link
											</a>
										</td>
										<td>
											<button data-userid={e.user.userId} onClick={openProfileHandler}>
												Open Profile
											</button>
										</td>
										<td>
											<button
												data-userid={e.user.userId}
												data-requestid={e.advisorRequestId}
												data-status={"approve"}
												onClick={approveOrRejectHandler}>
												Approve
											</button>
										</td>
										<td>
											<button
												data-userid={e.user.userId}
												data-requestid={e.advisorRequestId}
												data-status={"reject"}
												onClick={approveOrRejectHandler}>
												Reject
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</Fragment>
	);
};

export default ApproveRequest;
