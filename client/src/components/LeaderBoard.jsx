
import { getLeaderboard } from '../api/posterApi';
import React, { useState, useEffect, use } from 'react';
import { uniqueDevice } from '../hooks/uniqueDevice.js';


const rankStyles = {
  0: { bg: 'bg-yellow-400', text: 'text-gray-900' },
  1: { bg: 'bg-gray-400', text: 'text-gray-900' },
  2: { bg: 'bg-orange-600', text: 'text-white' }
}


export default function LeaderBoard({ setActivePopup, onLoading, points }) {
  const { deviceId: currentDeviceId, nickName: currentNickName } = uniqueDevice();
  const [leader, setLeader] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {

        const data = await getLeaderboard();
        setLeader(data || []);
        console.log("Leaderboard", data)

      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();

  }, []);

  if (loading) return onLoading || <div className="text-sm text-gray-300">Loading leaderboard...</div>;

  const getRankNumber = (index, isCurrentUser) => {

    const baseStyle = 'flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm'

    const style = rankStyles[index] || (
      isCurrentUser
        ? { bg: 'bg-cyan-400', text: 'text-gray-900' }
        : { bg: 'bg-gray-600', text: 'text-gray-300' }
    );
    return (
      <div className={`${baseStyle} ${style.bg} ${style.text}`}>
        {index + 1}
      </div>
    )
  }


  return (
    <div className="flex flex-col ">
      <div className=" bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] backdrop-blur-lg rounded-3xl px-6 py-4 shadow-2xl border border-cyan-500/20 max-w-2xl flex flex-col items-cen justify-center mx-3">
        <div className="absolute text-white -top-3 -right-2 h-10 w-10">
          <img src="/assets/img/btn/close.png" alt="close btn" onClick={() => setActivePopup(null)} />
        </div>

        <h3 className="text-xl font-bold text-white mb-4 flex items-center   font-outfit">
          <svg className="w-6 h-6 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Leaderboard
        </h3>



        {/* 1st- 3  */}
        <div className="flex justify-center items-center w-full font-outfit mb-4 rounded-xl">
          <div className="flex flex-row w-full">
            {/* 2nd Place */}
            <div className="flex flex-col justify-between items-center w-full">
              <div className="flex flex-col items-center pt-10">
                <div className="flex justify-start pb-3 font-brigada text-yellow-300 text-lg">
                  2 <span className="text-sm pl-1">nd</span>
                </div>
                <img
                  src="/assets/img/man.png"
                  alt="icon"
                  className={`h-24 ${leader[1]?.deviceId === currentDeviceId ? 'animate-[short-bounce_1s_infinite]' : ''}`}
                />
              </div>
              <div className="pt-3 flex flex-col items-center font-bold text-sm text-yellow-200 text-center">
                {leader[1]?.deviceId === currentDeviceId ? (
                  <span className="text-white bg-cyan-600 px-2 py-1 rounded-full text-xs">You</span>
                ) : (
                  <span>
                    {leader[1]?.nickName?.length > 10
                      ? leader[1].nickName.slice(0, 10) + '...'
                      : leader[1]?.nickName || '---'}
                  </span>
                )}
                <span className="text-white">{leader[1]?.scanCount || 0}</span>
              </div>
            </div>

            {/* 1st Place */}
            <div className="flex flex-col justify-between items-center w-full text-center">
              <div>
                <img
                  src="/assets/img/winner.png"
                  alt="icon"
                  className={`h-30 ${leader[0]?.deviceId === currentDeviceId ? 'animate-[short-bounce_1s_infinite]' : ''}`}
                />
              </div>
              <div className="pt-3 flex  text-sm flex-col items-center font-bold text-yellow-200">
                {leader[0]?.deviceId === currentDeviceId ? (
                  <span className="text-white bg-cyan-600 px-2 py-1 rounded-full text-xs">You</span>
                ) : (
                  <span>
                    {leader[0]?.nickName?.length > 10
                      ? leader[0].nickName.slice(0, 10) + '...'
                      : leader[0]?.nickName || '---'}
                  </span>
                )}
                <span className="text-white">{leader[0]?.scanCount || 0}</span>
              </div>
            </div>

            {/* 3rd Place */}
            <div className="flex flex-col justify-between items-center w-full text-center">
              <div className="flex flex-col items-center pt-10">
                <div className="flex justify-start pb-3 font-brigada text-yellow-300 text-lg">
                  3 <span className="text-sm pl-1">rd</span>
                </div>
                <img
                  src="/assets/img/man.png"
                  alt="icon"
                  className={`h-24 ${leader[2]?.deviceId === currentDeviceId ? 'animate-[short-bounce_1s_infinite]' : ''}`}
                />
              </div>
              <div className="pt-3 flex text-sm flex-col items-center font-bold text-yellow-200 text-center">
                {leader[2]?.deviceId === currentDeviceId ? (
                  <span className="text-white bg-cyan-600 px-2 py-1 rounded-full text-xs">You</span>
                ) : (
                  <span>
                    {leader[2]?.nickName?.length > 10
                      ? leader[2].nickName.slice(0, 10) + '...'
                      : leader[2]?.nickName || '---'}
                  </span>
                )}
                <span className="text-white">{leader[2]?.scanCount || 0}</span>
              </div>
            </div>
          </div>
        </div>



        {leader.length <= 3 ? (
          <p className="text-sm text-gray-300">No leaderboard data available.</p>
        ) : (
          <div className="space-y-2">
            {leader.slice(3, 10).map((leaderItem, index) => {
              const actualIndex = index + 3;
              const isCurrentUser = leaderItem.deviceId === currentDeviceId;
              const nickName = isCurrentUser ? currentNickName : leaderItem.nickName;

              return (
                <div
                  key={leaderItem.deviceId}
                  className={`flex items-center space-x-2 p-1 text-sm rounded-xl transition-all border
                     border-sky-500/30 duration-300 hover:scale-105 hover:border-sky-500/80 
                     ${isCurrentUser ? 'ring-2 ring-cyan-400' : ''
                    } ${getRankStyle(actualIndex, isCurrentUser)}`}
                >
                  {getRankNumber(actualIndex, isCurrentUser)}

                  <div className="flex-1">
                    <p className="font-semibold text-sm text-white flex items-center">
                      {nickName?.length > 10 ? nickName.slice(0, 10) + '...' : nickName}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs bg-cyan-400 text-gray-900 px-2 py-1 rounded-full">
                          You
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-bold ${actualIndex === 0
                        ? 'text-yellow-400'
                        : isCurrentUser
                          ? 'text-cyan-400'
                          : 'text-gray-400'
                        }`}
                    >
                      {leaderItem.scanCount} scans
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}


        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            🏆 Top performers get special rewards!
          </p>
        </div>
      </div>
      <div className="flex items-end justify-center mt-3">
        <div className="flex flex-row gap-3">


          <div className="  flex flex-col justify-center items-center"
            onClick={() => setActivePopup('voucher')}>
            <img src='/assets/img/btn/voucher_btn.png' alt="btn-icon" className="w-16 h-16 drop-shadow-md" />
            <span className='text-sky-200/90 font-semibold font-outfit  bg-white/4  px-2 py-1 rounded-md text-sm shadow-xl'>My Voucher</span>
          </div>


        </div>
      </div>
    </div>


  );
}

const getRankStyle = (index, isCurrentUser) => {
  if (index === 0) {
    return 'bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 border border-yellow-400/30';
  } else if (isCurrentUser) {
    return 'bg-cyan-400/10 border border-cyan-400/30';
  } else {
    return 'bg-gray-700/30';
  }
}