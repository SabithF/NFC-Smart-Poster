import React from "react";// Assuming posterId is defined in fingerprint.js



export function QuizCard({ questionData, selectedAnswer, setSelectedAnswer, feedback,  handleSubmit, posterId }) {
  return (
    <div className="bg-gray-900/30 mb-8 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-cyan-500/20 hover:shadow-cyan-500/50 transition-shadow duration-300">
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center 
            justify-center text-black font-bold">
                 {/* poster ID */}
                <span className="text-gray-900 font-bold text-sm">{posterId}</span>
                </div>
            </div>
            
           
        </div>
        {/* Quiz Title */}
        <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-3">
                {questionData?.question}
            </h2>
        {/* HINT */}
        <div className="bg-yellow-500/10 mt-10 border border-yellow-500/30 rounded-xl p-3 mb-4">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-yellow-400 font-medium text-sm">Hint:</span>
            </div>
            <p className="text-gray-300 text-sm mt-1">HINT</p>
          </div>

          
            {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {questionData?.options?.map((option, index) => (
          <button
            key={index}
            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 group ${
              selectedAnswer === option
                ? 'border-cyan-400 bg-cyan-400/10'
                : 'border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10'
            }`}
            onClick={() => setSelectedAnswer(option)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                selectedAnswer === option ? 'border-cyan-400' : 'border-gray-500 group-hover:border-cyan-400'
              }`}>
                <div className={`w-3 h-3 rounded-full bg-cyan-400 transition-opacity ${
                  selectedAnswer === option ? 'opacity-100' : 'opacity-0'
                }`} />
              </div>
              <span className={`transition-colors ${
                selectedAnswer === option ? 'text-cyan-400' : 'text-white group-hover:text-cyan-400'
              }`}>
                {option}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Submit button */}
      {feedback && <div className="text-red-600 mb-4">{feedback}</div>}
      <button
        onClick={handleSubmit}
        disabled={selectedAnswer === null}
        className="w-full bg-gradient-to-r from-cyan-400 to-teal-400 text-gray-900 font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <div className="flex mx-3  items-center justify-center space-x-2 bg-blue-600 rounded-full">
          <svg className="w-4 h-15" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          <span>Submit Answer</span>
        </div>
      </button>

</div>
     
    </div>
  );
}