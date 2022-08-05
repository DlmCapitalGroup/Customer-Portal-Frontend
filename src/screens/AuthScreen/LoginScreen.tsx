import React from 'react'
import { Link } from 'react-router-dom';
import Button from '../../components/ButtonComponent';
// import Eye from "../assets/images/eye.svg";

const Eye = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute right-4 mt-2 cursor-pointer">
      <circle cx="12" cy="12" r="3" stroke="#09335E" stroke-opacity="0.25" stroke-width="2" />
      <path d="M20.188 10.9343C20.5762 11.4056 20.7703 11.6412 20.7703 12C20.7703 12.3588 20.5762 12.5944 20.188 13.0657C18.7679 14.7899 15.6357 18 12 18C8.36427 18 5.23206 14.7899 3.81197 13.0657C3.42381 12.5944 3.22973 12.3588 3.22973 12C3.22973 11.6412 3.42381 11.4056 3.81197 10.9343C5.23206 9.21014 8.36427 6 12 6C15.6357 6 18.7679 9.21014 20.188 10.9343Z" stroke="#09335E" stroke-opacity="0.25" stroke-width="2" />
    </svg>
  )
}

function Login() {
  return (
    <div className="max-w-[334px] w-full mx-auto">
      <form>
        <div className="mb-10">
          <label className="text-base font-semibold text-primary">Client ID</label>
          <input type="text" placeholder="Client ID" className="h-[56px] w-full text-base mt-2 placeholder-primary/40 px-4 bg-white-lighter focus:ring-primary shadow-md border-none rounded-lg" />
        </div>
        <div>
          <label className="text-base font-semibold text-primary">Password</label>
          <div className="relative flex items-center">
            <Eye />
            <input type="password" placeholder="Password" className="h-[56px] w-full text-base mt-2 placeholder-primary/40 pl-4 pr-12 bg-white-lighter focus:ring-primary shadow-md border-none rounded-lg" />
          </div>
        </div>
        <div className="text-right mt-3 mb-10">
          <a href="/" className="text-base font-normal text-primary/60">Forgot Password</a>
        </div>
        <div className="text-center mb-10">
          <Button buttonType="md">
            Login
          </Button>
        </div>

        <p className="text-base text-primary/50 text-center">Don’t have an account? <Link to="/auth/sign-up" className="text-primary/80 font-semibold">Sign Up</Link></p>
      </form>
    </div>
  )
}

export default Login