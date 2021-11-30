import React, {
	useContext,
	useEffect,
	Fragment,
	useRef,
	useState,
} from 'react';
import AuthContext from '../../contexts/auth-context';
import { useHistory } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import CallbackAlert from '../UI/CallbackAlert';
import { confirmAlert } from 'react-confirm-alert';
const RequestAdvisor = (props) => {
	const history = useHistory();
	const { isLoading, error, sendRequest } = useHttp();
	const ctx = useContext(AuthContext);

	const linkRef = useRef('');
	const descriptionRef = useRef('');

	const [linkErrorMessage, setLinkErrorMessage] = useState('');
	const [descriptionErrorMessage, setDescriptionErrorMessage] = useState('');

	const submitHandler = (e) => {
		if (e.target.disabled) {
			return;
		}
		setLinkErrorMessage('');
		setDescriptionErrorMessage('');

		e.target.disabled = true;

		let isError = false;
		const link = linkRef.current.value;
		const description = descriptionRef.current.value;

		if (link === '' || link === null) {
			isError = true;
			setLinkErrorMessage('Portofolio link is required');
		} else {
			let url123;
			try {
				url123 = new URL(link);

				if (
					url123.protocol !== 'http:' &&
					url123.protocol !== 'https:'
				) {
					isError = true;
					setLinkErrorMessage(
						'Portofolio link must be a URL starting with http: or https:'
					);
				} else {
					setLinkErrorMessage('');
				}
			} catch (_) {
				isError = true;
				setLinkErrorMessage(
					'Portofolio link must be a URL starting with http: or https:'
				);
				// return false;
			}
		}

		if (description === '' || description === null) {
			isError = true;
			setDescriptionErrorMessage('Description is required');
		} else if (description.length < 50) {
			isError = true;
			setDescriptionErrorMessage(
				'Description needs to be 50 characters or more'
			);
		} else {
			setDescriptionErrorMessage('');
		}

		const data = {
			link,
			description,
		};

		if (!isError)
			sendRequest(
				{
					url: 'user/advisor/' + ctx.user.userId + '/',
					method: 'POST',
					body: data,
				},
				(returnData) => {
					confirmAlert({
						customUI: ({ onClose }) => {
							return (
								<CallbackAlert
									onClose={onClose}
									status={'Success'}
									customMessage={
										'Request submitted successfully'
									}
								/>
							);
						},
						afterClose: () => {
							history.push('/profile');
						},
					});
				}
			);
		else e.target.disabled = false;
	};

	return (
		<Fragment>
			<div className='font-semibold text-2xl text-gray-700 my-4 text-center'>
				Fashion Advisor Request
			</div>

			<div className='bg-white shadow-xl border p-3 rounded-lg'>
				<div className='flex flex-col m-2 items-center justify-center text-gray-700'>
					<div className='text-lg mt-2 mb-4'>
						Join us as a fashion advisor and help the community to
						gain insights about fashion!
					</div>
					<label className='block w-full mb-3'>
						<span className='text-gray-500 text-sm'>
							DESCRIPTION
						</span>
						<textarea
							className=' mt-1 block w-full py-2 focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base px-2'
							placeholder='Tell us more about you (skills, interests, or hobbies related to fashion).'
							ref={descriptionRef}
						/>
						<span className='text-red-700'>
							{descriptionErrorMessage}
						</span>
					</label>
					<label className='block w-full mb-3'>
						<span className='text-gray-500 text-sm '>
							SUPPORTING LINKS (Portfolio)
						</span>
						<input
							className=' mt-1 block w-full py-2 focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base px-2'
							placeholder='You may include your portfolio to display your skillset!'
							ref={linkRef}
						/>
						<span className='text-red-700'>{linkErrorMessage}</span>
					</label>

					<button
						className='block w-full md:w-1/2 my-6 py-2 px-1 hover:bg-blue-400 text-base font-semibold hover:text-white rounded border-2 border-blue-300'
						onClick={submitHandler}
					>
						Send Request
					</button>
				</div>
			</div>
		</Fragment>
	);
};

export default RequestAdvisor;
