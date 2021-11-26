import React, { useContext } from "react";
import {
  facebookProvider,
  googleProvider,
  twitterProvider,
} from "../../configs/AuthMethod";

const LoginForm = (props) => {
  return (
    <div className='flex flex-row justify-evenly'>
      <div
        className='cursor-pointer rounded-full transform transition duration-300 hover:scale-110'
        onClick={() => props.loginHandler(googleProvider)}
      >
        <img
          src={require("../../assets/illustrations/google_icon2.svg").default}
          alt=''
          className='w-10 lg:w-12'
        />
      </div>
      <div
        className='cursor-pointer rounded-full transform transition duration-300 hover:scale-110'
        onClick={() => props.loginHandler(facebookProvider)}
      >
        <img
          src={require("../../assets/illustrations/fb_icon2.svg").default}
          alt=''
          className='w-10 lg:w-12'
        />
      </div>
      <div
        className='cursor-pointer rounded-full transform transition duration-300 hover:scale-110'
        onClick={() => props.loginHandler(twitterProvider)}
      >
        <img
          src={require("../../assets/illustrations/twitter_icon2.svg").default}
          alt=''
          className='w-10 lg:w-12'
        />
      </div>
    </div>
  );
};

export default LoginForm;
