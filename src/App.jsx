import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from './recoil/userState';
import Login from './components/Login';
import Home from './components/Home';
import './App.css';

function App() {
  const [user, setUser] = useRecoilState(userState);

  // On user state change, persist the user in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        {/* Redirect to /home if user is logged in */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />} />
        {/* Protect /home route, redirect to / if user is not logged in */}
        <Route path="/home" element={user ? <Home user={user} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
