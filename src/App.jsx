
function App() {
  const googleLoginUrl =
    "https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=https://your-frontend.com";

  const handleGoogleLogin = () => {
    window.location.href = googleLoginUrl;
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
}

export default App
