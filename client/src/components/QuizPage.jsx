import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { scanPoster, submitQuiz } from '../api/posterApi';
import { getDeviceId } from '../utils/fingerprint.js';
import {UserProfile} from './UserProfile.jsx';
import { QuizCard } from './QuizCard.jsx';
import { ProductBanner } from './ProductBanner.jsx';
import Badge from './Badge.jsx';
import LeaderBoard from './LeaderBoard.jsx';


function QuizPage() {
    const { posterId } = useParams();
    const navigate = useNavigate();
    
    const [deviceId, setDeviceId] = useState('');
    const [questionData, setQuestionData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showBadge, setShowBadge] = useState(false);


    // Get deiviceId and scan the Poster
    useEffect(() => {
      const init  = async () => {
        try {
          const id = await getDeviceId();
          setDeviceId(id);
          const qData = await scanPoster(id, posterId);

          if (qData.question){
            setQuestionData(qData);
          } else if (qData.message){
            setError(qData.message);
          }else {
            setError("Unexpected error occurred while scanning the poster.");
          }
          

          
        } catch (error) {
          setError("Failed to scan poster. Please try again later.");
          console.error("Error scanning poster:", error);
          
        }
      };
      init();
    }, [posterId]);

    // Handle answer submit

    const handleSubmit = async () => {
      if (!selectedAnswer) {
        setFeedback("Please select an answer before submitting.");
        return;
      }
      
      try {
        const result = await submitQuiz(deviceId, posterId, selectedAnswer);
        if (result.correct) {
          navigate('/badge', {
            state: {
              clue: result.clue,
              badges: result.badges,
              voucherUnlocked: result.voucherUnlocked,

            }
          });
        } else {
          setFeedback(result.message || "Wrong answer, Try again!");
        }
      } catch (error) {
        console.error("Error submitting quiz:", error);
        setFeedback("Failed to submit answer. Please try again later.");
        
      }
    };


    if (error) return <div className="p-4 text-red-600">{error}</div>
    if (!questionData) return <div className="p-4">Loading Quiz...</div>;


    return (
  

      <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-700 text-white"> 
        {/* bg pattern */}

        <div className="fixed inset-0 opacity-10 pointer-events-none">
           <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-10 max-w-6xl">


          <UserProfile  />
          <ProductBanner />

          {/* Quiz Card */}

          <QuizCard
            questionData={questionData}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            feedback={feedback}
            handleSubmit={handleSubmit}
            posterId={posterId}
          />

          <Badge deviceId={deviceId} />
          <LeaderBoard />


        </div>


      </div>


    );
  }

  export default QuizPage;