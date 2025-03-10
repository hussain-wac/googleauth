import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../recoil/userState'; // Assuming userState atom is in recoil

const Home = () => {
  const [user, setUser] = useRecoilState(userState);
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to control popup visibility

  const handleLogout = () => {
    setUser(null); // Clears user from Recoil state
    localStorage.removeItem('user'); // Remove user from localStorage
    setIsPopupVisible(false); // Close popup after logout
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Close popup on button click
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-blue-800 p-4 text-white relative">
        <div className="text-lg font-semibold">Welcome, {user?.name}</div>
        <div className="flex items-center space-x-4">
            <p className="text-sm">{user?.email}</p>
          <img 
            className="w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer" 
            src={user?.picture || 'https://via.placeholder.com/150'} // Fallback image
            alt="Profile" 
            onClick={() => setIsPopupVisible(!isPopupVisible)} // Toggle popup visibility
          />
        </div>

        {/* User Details Popup */}
        {isPopupVisible && (
          <div className="absolute top-12 right-4 bg-white rounded-lg shadow-xl p-6 w-72 flex flex-col items-center space-y-4 z-10">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-2xl">&times;</span> {/* Close button */}
            </button>
            <img 
              className="w-20 h-20 rounded-full border-2 border-blue-600" 
              src={user?.picture || 'https://via.placeholder.com/150'} // Fallback image
              alt="Profile"
            />
            <h2 className="text-lg font-semibold text-black ">{user?.name}</h2>
            <p className="text-sm text-gray-600">{user?.email}</p>
            <button 
              onClick={handleLogout}
              className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full bg-white bg-opacity-20 backdrop-blur-lg p-6">
        <div className="bg-white bg-opacity-30 backdrop-blur-lg shadow-lg rounded-2xl p-8 flex flex-col items-center space-y-4">
          <h1 className="text-4xl text-black font-extrabold">{user?.name}</h1>
          <p className="text-lg text-zinc-950">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
