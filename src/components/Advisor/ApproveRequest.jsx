import React, { useState, useEffect, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../contexts/auth-context';
import { Link, Route, a, NavLink, useHistory } from 'react-router-dom';
import { Fragment } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './ApproveRequest.css';
import CancelSvg from '../UI/CancelSvg';
import PopUp from '../UI/PopUp';
const ApproveRequest = () => {
	const { isLoading, error, sendRequest } = useHttp();

	const [requestList, setRequestList] = useState([]);
	const ctx = useContext(AuthContext);
	useEffect(() => {
		if (ctx.user.isAdmin != 1) {
			alert('Unauthorized Access Detected!');
		}
	}, []);
	const fetchRequestList = () => {
		sendRequest({ url: 'user/advisor/get-request/' }, (returnData) => {
			setRequestList(returnData);
		});
	};

	useEffect(() => {
		fetchRequestList();
	}, []);

	const rejectRequest = (requestId, userId, status, onClose) => {
		// console.log(requestId)
		const reason = document.getElementById("textArea-rejection-reason").value

		const data = {
			advisorRequestId: parseInt(requestId),
			userId: userId,
			status: status,
			reason: reason
		};

		sendRequest(
			{
				url: 'user/advisor/approve-reject/',
				method: 'POST',
				body: data,
			},
			(returnData) => {
				alert('Request has been rejected')
				fetchRequestList();
				onClose();
			}
		);
	}

	const rejectConfirmationPopup = (requestId, userId, status) => {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<PopUp title='Reject Request' onClose={onClose} className='w-96 mx-12 md:mx-36'>
						<div className='editor w-full flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg'>
							<textarea
								className='description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none'
								spellCheck='false'
								placeholder='Please specify your reason of rejection'
								id='textArea-rejection-reason'
							></textarea>

							<div className='buttons flex mt-2'>
								<div onClick={onClose} className='btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto'>
									Cancel
								</div>
								<div onClick={() => {rejectRequest(requestId, userId, status, onClose)}} className='btn border border-amber-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-amber-500'>
									Confirm
								</div>
							</div>
						</div>
					</PopUp>
				);
			},
			overlayClassName: 'w-full'
		});
	};

	const approveOrRejectHandler = (e) => {
		e.preventDefault();

		const userId = e.target.dataset.userid;
		const requestId = e.target.dataset.requestid;
		const status = e.target.dataset.status;
		const data = {
			advisorRequestId: parseInt(requestId),
			userId: userId,
			status: status,
		};

		if (status === 'reject') {
			rejectConfirmationPopup(requestId, userId, status)
		} else {
			sendRequest(
				{
					url: 'user/advisor/approve-reject/',
					method: 'POST',
					body: data,
				},
				(returnData) => {
					fetchRequestList();
				}
			);
		}
	};

	const openProfileHandler = (e) => {
		e.preventDefault();
		const userId = e.target.dataset.userid;
		const user = requestList
			.filter((e) => e.userId == userId)
			.map((e) => e.user)[0];
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='flex flex-col relative bg-white rounded border border-gray-900 py-2 px-4'>
						<div className='flex flex-row justify-between items-center mb-8 border-b-2 border-gray-200'>
							<div className='text-2xl font-semibold '>
								Profile
							</div>
							<div
								className='hover:text-gray-500'
								onClick={onClose}
							>
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
			{requestList.length == 0 && <div>No request</div>}
			{requestList.length > 0 && (
				<section className='container mx-auto p-6 font-mono'>
					<h4 className='text-2xl mb-2'>Request List</h4>
					<div className='w-full mb-8 overflow-hidden rounded-lg shadow-lg'>
						<div className='w-full overflow-x-auto'>
							<table className='w-full'>
								<thead>
									<tr className='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
										<th className='px-4 py-3'>User</th>
										<th className='px-4 py-3'>
											Description
										</th>
										<th className='px-4 py-3' colSpan='4'>
											Action
										</th>
									</tr>
								</thead>
								<tbody className='bg-white'>
									{requestList.map((e) => {
										return (
											<tr
												key={e.advisorRequestId}
												className='text-gray-700'
											>
												<td className='px-4 py-3 border'>
													<div className='flex items-center text-sm'>
														<div className='relative w-8 h-8 mr-3 rounded-full md:block'>
															<img
																className='object-cover w-full h-full rounded-full'
																src={
																	e.user
																		.photoURL
																}
																alt=''
																loading='lazy'
															/>
															<div
																className='absolute inset-0 rounded-full shadow-inner'
																aria-hidden='true'
															></div>
														</div>
														<div>
															<p className='font-semibold text-black'>
																{e.user.name}
															</p>
															{/* <p className='text-xs text-gray-600'>
																Developer
															</p> */}
														</div>
													</div>
												</td>
												<td className='px-4 py-3 text-ms font-semibold border'>
													{e.description}
												</td>
												{/* <td className='px-4 py-3 text-xs border'>
													<span className='px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm'>
														{' '}
														Acceptable{' '}
													</span>
												</td>
												<td className='px-4 py-3 text-sm border'>
													6/4/2000
												</td> */}
												<td className='px-4 py-3 text-xs border'>
													<a
														href={e.link}
														target='_blank'
														rel='noreferrer noopener'
													>
														Portofolio Link
													</a>
												</td>
												<td className='px-4 py-3 text-xs border'>
													<button
														data-userid={
															e.user.userId
														}
														onClick={
															openProfileHandler
														}
													>
														Profile
													</button>
												</td>
												<td className='px-4 py-3 text-xs border'>
													<button
														data-userid={
															e.user.userId
														}
														data-requestid={
															e.advisorRequestId
														}
														data-status={'approve'}
														onClick={
															approveOrRejectHandler
														}
													>
														Approve
													</button>
												</td>
												<td className='px-4 py-3 text-xs border'>
													<button
														data-userid={
															e.user.userId
														}
														data-requestid={
															e.advisorRequestId
														}
														data-status={'reject'}
														onClick={
															approveOrRejectHandler
														}
													>
														Reject
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				</section>
			)}
		</Fragment>
	);
};

export default ApproveRequest;
