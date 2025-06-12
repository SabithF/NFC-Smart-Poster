import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './components/QuizPage.jsx';
import Badge from './components/Badge.jsx';
import Leaderboard from './components/LeaderBoard.jsx';
import { getDeviceId, getDeviceIdPaid } from './utils/fingerprint.js';
import { randomNickName } from './utils/randonNameGenerator.js';
import { useState } from 'react';
import { useEffect } from 'react';


function App() {
  const [deviceId, setDeviceId] = useState('');
  const [nickName, setNickName] = useState('');

  useEffect(() => {
    const init = async () => {
      // Checking the local storage
      let localDeviceId = localStorage.getItem('deviceId');
      let localNickName = localStorage.getItem('nickName');

        if (!localDeviceId) {
          const id = await getDeviceId();
          if (id){
            localDeviceId = id;
            localStorage.setItem('deviceId', id);

          }     
        }

        if (!localNickName){
          localNickName = randomNickName;
          localStorage.setItem('nickName', localNickName);
        }

      setDeviceId(localDeviceId);
      setNickName(localNickName);

      console.log(localNickName);
      console.log(localDeviceId);
    

  };

    init();})

  

  return (
    <Router>
      <Routes>
        <Route path="/quiz/:posterId" element={<QuizPage />} />
        <Route path="/badge" element={<Badge />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/" element={
          <div>
            <h1>Welcome to the Poster Quiz App</h1>
            <p>Please select a quiz from the available posters.</p>
          </div>
        } />
         <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;