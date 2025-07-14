import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './components/QuizPage.jsx';
import Badge from './components/Badge.jsx';
import Leaderboard from './components/LeaderBoard.jsx';
import { getDeviceId } from './utils/fingerprint.js';
import { randomNickName } from './utils/randonNameGenerator.js';
import { useState } from 'react';
import { useEffect } from 'react';
import {uniqueDevice} from './hooks/uniqueDevice.js';
import PosterForm from './components/admin/PosterForm.jsx'
import Dashboard from './components/admin/Dashboard.jsx'
import UserDashBoard from './components/admin/UserDashBoard.jsx';
import VoucherDashBoard from './components/admin/VoucherDashBoard.jsx';
import MainPage from './components/MainPage.jsx';


function App() {
  const {deviceId, nickName} = uniqueDevice();
  

  return (
    <Router>
      <Routes>S
        <Route path="/quiz/:posterId" element={<QuizPage />} />
        <Route path="/badge" element={<Badge />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/create-poster" element={<PosterForm/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<UserDashBoard/>}/>
        <Route path="/vouchers" element={<VoucherDashBoard/>} />
        <Route path="/result" element={
          <div>
            <h1>Quiz Result</h1>
            <p>Thank you for participating!</p>
            <p>Your Device ID: {deviceId}</p>
            <p>Your Nickname: {nickName}</p>
          </div>
        } />
        <Route path="/" element={<MainPage/> } />
         <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;