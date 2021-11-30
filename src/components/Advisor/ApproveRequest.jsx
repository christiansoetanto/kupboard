import React, { useState, useEffect, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import AuthContext from '../../contexts/auth-context';
import { Link, Route, a, NavLink, useHistory } from 'react-router-dom';
import { Fragment } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import './ApproveRequest.css';
import CancelSvg from '../UI/CancelSvg';
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
		sendRequest(
			{ url: 'user/advisor/approve-reject/', method: 'POST', body: data },
			(returnData) => {
				fetchRequestList();
			}
		);
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
				<section class='container mx-auto p-6 font-mono'>
					<h4 className='text-2xl mb-2'>Request List</h4>
					<div class='w-full mb-8 overflow-hidden rounded-lg shadow-lg'>
						<div class='w-full overflow-x-auto'>
							<table class='w-full'>
								<thead>
									<tr class='text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600'>
										<th className='px-4 py-3'>User</th>
										<th className='px-4 py-3'>
											Description
										</th>
										<th className='px-4 py-3' colSpan='4'>
											Action
										</th>
									</tr>
								</thead>
								<tbody class='bg-white'>
									{requestList.map((e) => {
										return (
											<tr class='text-gray-700'>
												<td class='px-4 py-3 border'>
													<div class='flex items-center text-sm'>
														<div class='relative w-8 h-8 mr-3 rounded-full md:block'>
															<img
																class='object-cover w-full h-full rounded-full'
																src={
																	e.user
																		.photoURL
																}
																alt=''
																loading='lazy'
															/>
															<div
																class='absolute inset-0 rounded-full shadow-inner'
																aria-hidden='true'
															></div>
														</div>
														<div>
															<p class='font-semibold text-black'>
																{e.user.name}
															</p>
															{/* <p class='text-xs text-gray-600'>
																Developer
															</p> */}
														</div>
													</div>
												</td>
												<td class='px-4 py-3 text-ms font-semibold border'>
													{e.description}
												</td>
												{/* <td className='px-4 py-3 text-xs border'>
													<span class='px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm'>
														{' '}
														Acceptable{' '}
													</span>
												</td>
												<td class='px-4 py-3 text-sm border'>
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
