import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "./LoginForm";
import AuthContext from "../../contexts/auth-context";
const Login = () => {
  const ctx = useContext(AuthContext);

  const history = useHistory();

  const loginHandler = async (provider) => {
    await ctx.onLogin(provider);

    history.push("/");
  };

  return (
    <div className='flex flex-col items-center relative px-8 pt-4'>
      <div className='flex flex-row items-center space-x-2 md:space-x-4 mt-4'>
        {/* <div className='text-orange-400 font-bold text-4xl md:text-7xl'> */}
        <div className='float-left text-orange-400 font-bold text-2xl md:text-4xl'>
          Welcome to
        </div>
        {/* </div> */}
        {/* <div className=''> */}
        <img
          src={require("../../assets/illustrations/logotext_v2.png").default}
          alt=''
          className='float-right md:h-16 h-10'
          // style={{height: '90px'}}
        />
        {/* </div> */}
      </div>

      <div className='mt-4 md:mt-1 flex flex-col md:flex-row w-full md:space-x-4 justify-center md:justify-end items-center'>
        <div className='flex flex-col pb-6 space-y-4 shadow-xl rounded-lg border md:w-1/2 lg:w-1/3 px-8 py-4'>
          <img
            src={
              require("../../assets/illustrations/undraw_authentication_fsn5.svg")
                .default
            }
            alt=''
          />
          <div className='text-xl md:text-2xl font-semibold text-center'>
            Login With
          </div>

          <LoginForm loginHandler={loginHandler} />
        </div>
        <div className='md:full'>
          <div className='-'>
            <img
              src={require("../../assets/illustrations/wardrobe.svg").default}
              alt=''
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
