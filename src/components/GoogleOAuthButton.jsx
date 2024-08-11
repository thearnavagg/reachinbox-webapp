import React from "react";

const googleLoginUrl =
  "https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=https://frontend.com";


const handleGoogleLogin = () => {
  window.location.href = googleLoginUrl;
};

const GoogleOAuthButton = () => {
  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleOAuthButton;
