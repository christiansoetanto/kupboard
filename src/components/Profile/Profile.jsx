import React, { useContext, useEffect, Fragment, useRef, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import DatePicker, { Calendar } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { confirmAlert } from "react-confirm-alert";
import CallbackAlert from "../UI/CallbackAlert";
const Profile = () => {
	const history = useHistory();
	const { isLoading, error, sendRequest } = useHttp();
	const ctx = useContext(AuthContext);

	const [email, setEmail] = useState("");
	const [isAdvisor, setIsAdvisor] = useState(false);
	const [gender, setGender] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [advisorRequestStatus, setAdvisorRequestStatus] = useState("");

	const nameRef = useRef();
	const phoneNumberRef = useRef();
	const instagramRef = useRef();
	const facebookRef = useRef();
	const twitterRef = useRef();
	const linkedInRef = useRef();
	const otherSocialMediaRef = useRef();

	const [nameErrorMessage, setNameErrorMessage] = useState("");
	const [birthDateErrorMessage, setBirthDateErrorMessage] = useState("");
	const [genderErrorMessage, setGenderErrorMessage] = useState("");
	const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");

	const [isCompletedProfile, setIsCompletedProfile] = useState(false);
	const transformProfile = (returnData) => {
		const p = returnData.data;
		console.log(p);
		setEmail(p.email);
		setIsAdvisor(p.isAdvisor);
		nameRef.current.value = p.name;
		phoneNumberRef.current.value = p.phoneNumber;
		instagramRef.current.value = p.instagram;
		setGender(p.gender);

		p.birthDate && setBirthDate(new Date(p.birthDate));
		facebookRef.current.value = p.facebook;
		twitterRef.current.value = p.twitter;
		linkedInRef.current.value = p.linkedIn;
		otherSocialMediaRef.current.value = p.otherSocialMedia;
		const required = {
			birthDate: p.birthDate,
			gender: p.gender,
			phoneNumber: p.phoneNumber,
		};
		const isAnyEmpty = Object.values(required).some((x) => x === null || x === "");
		setIsCompletedProfile(!isAnyEmpty);
	};

	useEffect(() => {
		sendRequest({ url: "user/" + ctx.user.userId + "/" }, (returnData) => {
			transformProfile(returnData);
		});
	}, []);

	useEffect(() => {
		sendRequest({ url: "user/advisor/status/" + ctx.user.userId }, (returnData) => {
			setAdvisorRequestStatus(returnData.status);
		});
	}, []);

	const submitProfile = () => {
		let isError = false;
		const phoneNumber = phoneNumberRef.current.value;
		const name = nameRef.current.value;
		const instagram = instagramRef.current.value;
		const facebook = facebookRef.current.value;
		const twitter = twitterRef.current.value;
		const linkedIn = linkedInRef.current.value;
		const otherSocialMedia = otherSocialMediaRef.current.value;

		if (phoneNumber === "" || phoneNumber === null) {
			isError = true;
			setPhoneNumberErrorMessage("Phone Number is required");
		} else if (phoneNumber.length < 10) {
			isError = true;
			setPhoneNumberErrorMessage("Phone Number must be 10 digits or more");
		} else if (!/^\d+$/.test(phoneNumber)) {
			isError = true;
			setPhoneNumberErrorMessage("Phone Number can only contain number");
		} else {
			setPhoneNumberErrorMessage("");
		}
		if (birthDate === "" || birthDate === null) {
			isError = true;
			setBirthDateErrorMessage("Birth Date is required");
		} else {
			setBirthDateErrorMessage("");
		}
		if (gender === "" || gender === null) {
			isError = true;
			setGenderErrorMessage("Gender is required");
		} else {
			setGenderErrorMessage("");
		}
		if (name === "" || name === null) {
			isError = true;
			setNameErrorMessage("Name is required");
		} else {
			setNameErrorMessage("");
		}
		const data = {
			name,
			birthDate,
			gender,
			phoneNumber,
			instagram,
			facebook,
			twitter,
			linkedIn,
			otherSocialMedia,
		};

		if (!isError)
			sendRequest({ url: "user/" + ctx.user.userId + "/", method: "PATCH", body: data }, (returnData) => {
				confirmAlert({
					customUI: ({ onClose }) => {
						return <CallbackAlert onClose={onClose} status={"Success"} />;
					},
					afterClose: () => {
						transformProfile(returnData);
					},
				});
			});
	};

	return (
		<Fragment>
			<div>Ini menu profile</div>

			<div className=''>
				<div>PROFILE</div>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>Name</span>
					<input className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg' ref={nameRef} />
					<span className='text-red-700'>{nameErrorMessage}</span>
				</label>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>Email</span>
					<input
						className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg'
						placeholder=''
						value={email}
						disabled={true}
					/>
				</label>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>Phone Number</span>
					<input
						className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg'
						ref={phoneNumberRef}
						placeholder='Phone Number'
						type='number'
						min='0'
					/>
					<span className='text-red-700'>{phoneNumberErrorMessage}</span>
				</label>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>Gender</span>
					<div>
						<input type='radio' value='F' name='gender' checked={gender === "F"} onChange={(e) => setGender(e.target.value)} /> Female
						<input type='radio' value='M' name='gender' checked={gender === "M"} onChange={(e) => setGender(e.target.value)} /> Male
					</div>
					<span className='text-red-700'>{genderErrorMessage}</span>
				</label>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>Birth Date</span>
					<div>
						<DatePicker
							value={birthDate}
							onChange={(e) => {
								setBirthDate(e?.toDate());
							}}
							format='DD MMM YYYY'
							className='z-0'
							render={<InputIcon />}
							maxDate={new Date()}
						/>
					</div>
					<span className='text-red-700'>{birthDateErrorMessage}</span>
				</label>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>Instagram</span>
					<input
						className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg'
						placeholder='Instagram'
						ref={instagramRef}
					/>
				</label>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>Facebook</span>
					<input
						className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg'
						placeholder='Facebook'
						ref={facebookRef}
					/>
				</label>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>Twitter</span>
					<input
						className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg'
						placeholder='Twitter'
						ref={twitterRef}
					/>
				</label>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>LinkedIn</span>
					<input
						className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg'
						placeholder='LinkedIn'
						ref={linkedInRef}
					/>
				</label>
				<label className='block w-1/2'>
					<span className='text-gray-500 text-sm '>Other Social Media</span>
					<input
						className=' mt-1 block w-full py-2 focus:outline-none border-0 bg-transparent border-b-2 border-gray-600 text-lg'
						placeholder='Other Social Media'
						ref={otherSocialMediaRef}
					/>
				</label>
				<button className='block w-1/2 text-gray-500 text-sm border-collapse bg-blue-400 border-4' onClick={submitProfile}>
					Submit profile
				</button>
			</div>

			{isAdvisor && <div>kamu sudah jadi advisor</div>}
			{!isAdvisor && !isCompletedProfile && <div>lengkapi profile untuk request advisor</div>}
			{!isAdvisor && isCompletedProfile && advisorRequestStatus && advisorRequestStatus !== "Accepted" && (
				<div>your advisor request is {advisorRequestStatus}</div>
			)}
			{!isAdvisor && isCompletedProfile && !advisorRequestStatus && (
				<button
					className='bg-blue-300'
					onClick={() => {
						history.push(`/request-advisor/`);
					}}>
					Request advisor position
				</button>
			)}
		</Fragment>
	);
};

export default Profile;
