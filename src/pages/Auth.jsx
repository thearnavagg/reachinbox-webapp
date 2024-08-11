import React from "react";
import logo from "../assets/reachinbox-logo.png";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const googleLoginUrl = "https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=https://reachinbox-arnav-webapp.vercel.app";
// "https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=http://localhost:5173";

const handleGoogleLogin = () => {
  window.location.href = googleLoginUrl;
};

const Auth = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-background top-0 left-0 w-full border-b">
        <div className="container flex h-16 items-center justify-center px-4 md:px-6">
          <img src={logo} height={150} width={150} />
        </div>
      </header>
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full flex flex-col items-center max-w-md p-8 space-y-6 bg-gradient-to-r from-[#111214] to-[#121212] rounded-md shadow-md">
          <h2 className="text-2xl font-bold text-center text-white">
            Create a new account
          </h2>
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-sm font-medium text-white from-[#111214] to-[#121212] border border-gray-600 rounded-md"
          >
            <FcGoogle alignmentBaseline="center" scale={50} />
            <span>Sign Up with Google</span>
          </button>
          <button
            onClick={handleGoogleLogin}
            className="w-15 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#4B63DD] to-[#0524BF] rounded-md"
          >
            Create an Account
          </button>
          <p className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link onClick={handleGoogleLogin} className="text-blue-500">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
