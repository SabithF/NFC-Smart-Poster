import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizPage from './components/QuizPage.jsx';
import Badge from './components/Badge.jsx';
import Leaderboard from './components/LeaderBoard.jsx';
import { getDeviceId } from './utils/fingerprint.js';


function App() {

  getDeviceId();

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