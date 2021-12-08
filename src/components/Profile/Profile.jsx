import React, { useContext, useEffect, Fragment, useRef, useState } from "react";
import AuthContext from "../../contexts/auth-context";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import DatePicker, { Calendar } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { confirmAlert } from "react-confirm-alert";
import CallbackAlert from "../UI/CallbackAlert";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import "./Profile.css";
import Cookies from "js-cookie";

const Profile = () => {
	const history = useHistory();
	const { isLoading, error, sendRequest } = useHttp();
	const ctx = useContext(AuthContext);
	const uploaderRef = useRef();

	const [email, setEmail] = useState("");
	const [isAdvisor, setIsAdvisor] = useState(false);
	const [gender, setGender] = useState("");
	const [birthDate, setBirthDate] = useState("");
	const [advisorRequestStatus, setAdvisorRequestStatus] = useState("");

	const [isUploading, setIsUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [imageUrl, setImageUrl] = useState("");
	const [uploadedFilename, setUploadedFilename] = useState("");

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
	const [photoProfileErrorMessage, setPhotoProfileErrorMessage] = useState("");

	const [isCompletedProfile, setIsCompletedProfile] = useState(false);
	const transformProfile = (returnData) => {
		const p = returnData.data;
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

	const handleUploadStart = (param) => {
		console.log(param);

		setIsUploading(true);
		setProgress(0);
	};
	const handleProgress = (progress) => setProgress(progress);
	const handleUploadError = (error) => {
		setIsUploading(false);
		alert(error);
	};
	const handleUploadSuccess = (filename) => {
		setUploadedFilename(filename);
		setProgress(100);
		setIsUploading(false);
		firebase
			.storage()
			.ref("images")
			.child(filename)
			.getDownloadURL()
			.then((url) => {
				setImageUrl(url);
				const data = {
					photoURL: url,
				};
				sendRequest(
					{
						url: "user/profile-picture/" + ctx.user.userId + "/",
						method: "PATCH",
						body: data,
					},
					(result) => {
						const user = result.data;
						Cookies.set("user", JSON.stringify(user), { expires: 365 });

						ctx.user.photoURL = result.photoURL;

						confirmAlert({
							customUI: ({ onClose }) => {
								return <CallbackAlert onClose={onClose} status={"Success"} customMessage={"Profile updated successfully!"} />;
							},
							afterClose: () => {
								window.location.reload(false);
							},
						});
					}
				);
			});
	};
	const handleFileSelected = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		var fileType = file.type.substr(0, file.type.indexOf("/"));
		if (!file.type || fileType != "image") {
			console.log("here");
			setPhotoProfileErrorMessage("Please select a valid image");
		} else if (file.size > 2097152) {
			console.log("heres");

			//2MB
			setPhotoProfileErrorMessage("Image's size must be less than 2 Megabytes");
		} else {
			console.log("heresss");

			setPhotoProfileErrorMessage("");
			uploaderRef.current.startUpload(file);
		}
	};

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
			setPhoneNumberErrorMessage("Phone Number is required.");
		} else if (phoneNumber.length < 10) {
			isError = true;
			setPhoneNumberErrorMessage("Phone Number must be 10 digits or more.");
		} else if (!/^\d+$/.test(phoneNumber)) {
			isError = true;
			setPhoneNumberErrorMessage("Phone Number can only contain numbers.");
		} else {
			setPhoneNumberErrorMessage("");
		}
		if (birthDate === "" || birthDate === null) {
			isError = true;
			setBirthDateErrorMessage("Birth Date is required.");
		} else {
			setBirthDateErrorMessage("");
		}
		if (gender === "" || gender === null) {
			isError = true;
			setGenderErrorMessage("Gender is required.");
		} else {
			setGenderErrorMessage("");
		}
		if (name === "" || name === null) {
			isError = true;
			setNameErrorMessage("Name is required.");
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
			sendRequest(
				{
					url: "user/" + ctx.user.userId + "/",
					method: "PATCH",
					body: data,
				},
				(returnData) => {
					confirmAlert({
						customUI: ({ onClose }) => {
							return <CallbackAlert onClose={onClose} status={"Success"} customMessage={"Profile updated successfully!"} />;
						},
						afterClose: () => {
							transformProfile(returnData);
						},
					});
				}
			);
	};

	const handleClickImageDiv = () => {
		document.getElementById("input-image").click();
	};

	return (
		<Fragment>
			{/* <div>Ini menu profile</div> */}

			<div className=''>
				<div className='font-semibold text-3xl text-gray-700 mt-4 mb-4 text-center'>Profile Information</div>
				<div className='bg-white shadow-xl border p-3 rounded-lg flex flex-col lg:flex-row justify-center'>
					<div className='w-full lg:w-1/3 px-4 pt-4'>
						<div
							className='relative w-20 h-20 md:w-56 md:h-56 rounded-full overflow-hidden cursor-pointer'
							id='profilepic-div'
							onClick={handleClickImageDiv}>
							<img
								className='h-full w-full object-cover opacity-100 transition-opacity ease-in-out'
								src={ctx.user.photoURL}
								alt='profile'
								id='profilepic-image'
							/>
							<div
								className='absolute inset-0 bg-gray-500 flex flex-col justify-center items-center text-white opacity-0 transition-opacity ease-in-out'
								id='profilepic-content'>
								<span className='text-md md:text-2xl font-semibold w-4/5 text-center'>Change Profile Picture</span>
							</div>

							{/* <input
								type='file'
								className='hidden'
								id='input-image'
								name='profile-picture'
							/> */}

							<label id='input-image'>
								<FileUploader
									hidden
									accept='image/*'
									name='avatar'
									randomizeFilename
									storageRef={firebase.storage().ref("images")}
									onChange={handleFileSelected}
									onUploadStart={handleUploadStart}
									onUploadError={handleUploadError}
									onUploadSuccess={handleUploadSuccess}
									onProgress={handleProgress}
									ref={uploaderRef}
								/>
							</label>
						</div>
						<div className='text-red-600'>{photoProfileErrorMessage}</div>
					</div>

					<div className='text-gray-700 pt-4 px-4 text-xl'>
						<div className='font-semibold'>Biodata</div>
						<div>
							<label className='block w-full mb-3'>
								<span className='text-gray-500 text-sm '>NAME</span>
								<input
									className='block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
									ref={nameRef}
								/>
								<span className='text-red-700 text-sm'>{nameErrorMessage}</span>
							</label>
							<label className='block w-full mb-3'>
								<span className='text-gray-500 text-sm '>EMAIL</span>
								<input
									className='block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
									placeholder=''
									value={email}
									disabled={true}
								/>
							</label>
							<label className='block w-full md:w-1/2 mb-3'>
								<span className='text-gray-500 text-sm '>PHONE NUMBER</span>
								<input
									className='block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
									ref={phoneNumberRef}
									placeholder='Phone Number'
									type='number'
									min='0'
								/>
								<span className='text-red-700 text-sm'>{phoneNumberErrorMessage}</span>
							</label>
							<div className='flex flex-row flex-wrap justify-start space-x-2'>
								<label className='block mb-3 w-1/2'>
									<span className='text-gray-500 text-sm '>BIRTH DATE</span>
									<div className='text-sm md:text-base py-1'>
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
									<span className='text-red-700 text-sm'>{birthDateErrorMessage}</span>
								</label>
								<label className='block mb-3 mt-1'>
									<span className='text-gray-500 text-sm'>GENDER</span>
									<div className='text-sm md:text-base py-1'>
										<input
											type='radio'
											value='F'
											name='gender'
											checked={gender === "F"}
											onChange={(e) => setGender(e.target.value)}
											className=''
										/>{" "}
										Female
										<input
											type='radio'
											value='M'
											name='gender'
											checked={gender === "M"}
											onChange={(e) => setGender(e.target.value)}
											className='ml-2'
										/>{" "}
										Male
									</div>
									<span className='text-red-700 text-sm'>{genderErrorMessage}</span>
								</label>
							</div>
							<div className='flex flex-col'>
								<div className='flex flex-row space-x-4'>
									<label className='block w-1/2 mb-3'>
										<span className='text-gray-500 text-sm'>INSTAGRAM</span>
										<input
											className=' mt-1 block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
											placeholder='Instagram'
											ref={instagramRef}
										/>
									</label>
									<label className='block w-1/2 mb-3'>
										<span className='text-gray-500 text-sm'>FACEBOOK</span>
										<input
											className=' mt-1 block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
											placeholder='Facebook'
											ref={facebookRef}
										/>
									</label>
								</div>
								<div className='flex flex-row space-x-4'>
									<label className='block w-1/2 mb-3'>
										<span className='text-gray-500 text-sm '>TWITTER</span>
										<input
											className=' mt-1 block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
											placeholder='Twitter'
											ref={twitterRef}
										/>
									</label>
									<label className='block w-1/2 mb-3'>
										<span className='text-gray-500 text-sm '>LINKEDIN</span>
										<input
											className=' mt-1 block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
											placeholder='LinkedIn'
											ref={linkedInRef}
										/>
									</label>
								</div>
								<div className='flex flex-row'>
									<label className='block w-1/2 mb-3'>
										<span className='text-gray-500 text-sm '>OTHER SOCIAL MEDIA</span>
										<input
											className=' mt-1 block w-full focus:outline-none bg-transparent border-2 rounded border-gray-300 text-sm md:text-base p-1'
											placeholder='Other Social Media'
											ref={otherSocialMediaRef}
										/>
									</label>
								</div>
							</div>
							<button
								className='block w-full my-6 py-2 px-1 hover:bg-purple-400 text-base font-semibold hover:text-white rounded border-2 border-purple-400'
								onClick={submitProfile}>
								Update Profile
							</button>
							{isAdvisor && <div className='text-base'>You are a Fashion Advisor already.</div>}
							{!isAdvisor && !isCompletedProfile && (
								<div className='text-base'>Complete your profile information to request to be a Fashion Advisor!</div>
							)}
							{!isAdvisor && isCompletedProfile && advisorRequestStatus && advisorRequestStatus !== "Accepted" && (
								<div className='text-base'>
									Your fashion advisor request status is: <span className='font-semibold'>{advisorRequestStatus}</span>
								</div>
							)}
							{!isAdvisor && isCompletedProfile && !advisorRequestStatus && (
								<button
									className='block w-full my-6 py-2 px-1 hover:bg-blue-400 text-base font-semibold hover:text-white rounded border-2 border-blue-300'
									onClick={() => {
										history.push(`/request-advisor/`);
									}}>
									Request Fashion Advisor Position
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Profile;
