import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/userState'; // Assuming userState atom is in recoil
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [user, setUser] = useRecoilState(userState);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setUser({ 
        name: decoded.name, 
        email: decoded.email, 
        picture: decoded.picture 
      });
      localStorage.setItem('user', JSON.stringify({
        name: decoded.name, 
        email: decoded.email, 
        picture: decoded.picture 
      }));
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  };

  const handleGoogleLoginFailure = () => {
    console.log('Login Failed');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Welcome!</h1>
        <p className="text-lg text-gray-600">Sign in with Google to continue</p>
        
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          useOneTap
          shape="circle"
          theme="filled_blue"
        />
        
        <p className="text-sm text-gray-500 mt-4">By signing in, you agree to our Terms and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default Login;
