import React, {
  useContext,
  useEffect,
  Fragment,
  useRef,
  useState,
} from "react";
import AuthContext from "../../contexts/auth-context";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import DatePicker, { Calendar } from "react-multi-date-picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { confirmAlert } from "react-confirm-alert";
import CallbackAlert from "../UI/CallbackAlert";
import "./Profile.css";

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
    const isAnyEmpty = Object.values(required).some(
      (x) => x === null || x === ""
    );
    setIsCompletedProfile(!isAnyEmpty);
  };

  useEffect(() => {
    sendRequest({ url: "user/" + ctx.user.userId + "/" }, (returnData) => {
      transformProfile(returnData);
    });
  }, []);

  useEffect(() => {
    sendRequest(
      { url: "user/advisor/status/" + ctx.user.userId },
      (returnData) => {
        setAdvisorRequestStatus(returnData.status);
      }
    );
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
        { url: "user/" + ctx.user.userId + "/", method: "PATCH", body: data },
        (returnData) => {
          confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <CallbackAlert
                  onClose={onClose}
                  status={"Success"}
                  customMessage={"Profile updated successfully!"}
                />
              );
            },
            afterClose: () => {
              transformProfile(returnData);
            },
          });
        }
      );
  };

  return (
    <Fragment>
      {/* <div>Ini menu profile</div> */}

      <div className=''>
        <div className='font-semibold text-3xl text-gray-700 mt-4 mb-4 text-center'>
          Profile Information
        </div>
        <div className='bg-white shadow-xl border p-3 rounded-lg flex flex-col lg:flex-row justify-center'>
          <div className='w-full lg:w-1/3 px-4 pt-4'>
            <div className='flex mb-4 justify-center'>
              <img
                src={ctx.user.photoURL}
                className='w-1/2 rounded-md'
                alt=''
              />
            </div>
            <div className='text-center flex justify-between items-center w-full space-x-2'>
              <label className='cursor-pointer flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-md py-4 px-2'>
                Upload pic
              </label>

              <span>or</span>
              <button
                type='button'
                className='flex-1 bg-red-200 rounded-md py-4 px-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold'
              >
                use your camera
              </button>
            </div>
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
                <span className='text-red-700 text-sm'>
                  {phoneNumberErrorMessage}
                </span>
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
                  <span className='text-red-700 text-sm'>
                    {birthDateErrorMessage}
                  </span>
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
                  <span className='text-red-700 text-sm'>
                    {genderErrorMessage}
                  </span>
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
                    <span className='text-gray-500 text-sm '>
                      OTHER SOCIAL MEDIA
                    </span>
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
                onClick={submitProfile}
              >
                Update Profile
              </button>
              {isAdvisor && (
                <div className='text-base'>
                  You are a Fashion Advisor already.
                </div>
              )}
              {!isAdvisor && !isCompletedProfile && (
                <div className='text-base'>
                  Complete your profile information to request to be a Fashion
                  Advisor!
                </div>
              )}
              {!isAdvisor &&
                isCompletedProfile &&
                advisorRequestStatus &&
                advisorRequestStatus !== "Accepted" && (
                  <div>your advisor request is {advisorRequestStatus}</div>
                )}
              {!isAdvisor && isCompletedProfile && !advisorRequestStatus && (
                <button
                  className='block w-full my-6 py-2 px-1 hover:bg-blue-400 text-base font-semibold hover:text-white rounded border-2 border-blue-300'
                  onClick={() => {
                    history.push(`/request-advisor/`);
                  }}
                >
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
