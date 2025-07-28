import React from "react";

export function QuizCard({ questionData, selectedAnswer, setSelectedAnswer, feedback, handleSubmit, posterId }) {
  return (
    <div className="relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 rounded-2xl shadow-2xl border border-cyan-400/30 overflow-hidden">

      {/* Glowing background visual */}
      <div className="absolute -inset-1 bg-cyan-400 opacity-10 blur-2xl rounded-2xl z-0 pointer-events-none"></div>

      <div className="relative z-10 space-y-6">
        {/* Poster ID Badge */}
        <div className="flex items-center justify-between">
          <div className="text-cyan-300 font-bold font-lucky text-sm px-4 py-2 border border-cyan-500 rounded-full bg-cyan-800/30 shadow-md uppercase">
            {posterId}
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-bold text-cyan-200 drop-shadow-glow font-lucky tracking-wider">
          {questionData?.question}
        </h2>

        {/* Hint */}
        <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-xl p-3 shadow-inner text-sm ">
          <div className="flex items-center space-x-2 text-yellow-300 font-bold font-mono">
            <span>⚡ Hint:</span>
            <span className="text-yellow-100">{questionData?.hint || "Think carefully!"}</span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {questionData?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(option)}
              className={`w-full text-left p-4 font-bold tracking-wider rounded-xl border-2 group transition-all duration-300
                ${selectedAnswer === option
                  ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300'
                  : 'border-gray-600 hover:border-cyan-300 hover:bg-cyan-300/10 text-white group-hover:text-cyan-300'}
              `}
            >
              <div className="flex items-center space-x-3 font-lucky">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${selectedAnswer === option ? 'border-cyan-400' : 'border-gray-500 group-hover:border-cyan-300'}
                `}>
                  <div className={`w-2.5 h-2.5 rounded-full bg-cyan-400 transition-opacity
                    ${selectedAnswer === option ? 'opacity-100' : 'opacity-0'}
                  `} />
                </div>
                <span className="text-base font-game">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Feedback */}
        {feedback && <div className="text-red-500 font-bold">{feedback}</div>}

        {/* Submit Button */}
        <div className="flex justify-center">
          <div className="border-[8px] border-[#ffae70] outline outline-[4px] rounded-[100px] inline-block">
            <div className="bg-[#75221c] outline outline-[2px] outline-black rounded-[100px] relative flex items-center">
              <button
                onClick={handleSubmit}
                disabled={selectedAnswer === null}
                className="
          rounded-[100px] font-['Press_Start_2P'] text-[10px] outline outline-[2px] outline-black border-[4px]
          border-l-[#e7b8b4] border-t-[#f8c9c5] border-b-[#4e1814] border-r-[#79241e]
          bg-[#e64539] text-[#ffee83] py-5 px-8 transform -translate-y-[10%] hover:-translate-y-[10%]
          active:translate-y-0 transition-transform duration-50 cursor-pointer
        "
              >
                submit
              </button>
            </div>
          </div>
        </div>
        {/* <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full bg-gradient-to-r from-cyan-400 to-teal-400 text-red font-game text-sm tracking-wide py-4 rounded-xl shadow-xl hover:scale-105 font-lucky transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          🚀 SUBMIT ANSWER
        </button> */}










      </div>
    </div>
  );
}






