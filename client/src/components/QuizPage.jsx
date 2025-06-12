import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { scanPoster, submitQuiz } from '../api/posterApi';
import { getDeviceId } from '../utils/fingerprint.js';


function QuizPage() {
    const { posterId } = useParams();
    const navigate = useNavigate();
    
    const [ deviceId, setDeviceId] = useState('');
    const [questionData, setQuestionData] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState('');


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
          navigate('/result', {
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
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4"> Quiz</h2>
        <p className="mb-2 font-medium">{questionData.question}</p>

        {questionData.options.map((option, index) => (
           <label key={index} className="block mb-2">
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="mr-2"
              />
          {option}
        </label>
        ))}

        {feedback && <div className="text-red-600 mb-4">{feedback}</div>}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Submit Answer
          </button>
      </div>
    );
  }

  export default QuizPage;