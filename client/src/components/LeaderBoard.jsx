
import { getLeaderboard } from '../api/posterApi';
import React, { useState, useEffect, use } from 'react';
import { uniqueDevice } from '../hooks/uniqueDevice.js';


const rankStyles = {
  0: { bg: 'bg-yellow-400', text: 'text-gray-900' },
  1: { bg: 'bg-gray-400', text: 'text-gray-900' },
  2: { bg: 'bg-orange-600', text: 'text-white' }
}


export default function LeaderBoard() {
  const { deviceId: currentDeviceId, nickName: currentNickName } = uniqueDevice();
  const [leader, setLeader] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {

        const data = await getLeaderboard();
        setLeader(data || []);
        console.log("Leaderboard data fetched:", data);

      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();

  }, []);

  if (loading) return <div className="text-sm text-gray-300">Loading leaderboard...</div>;

  const getRankNumber = (index, isCurrentUser) => {
    console.log("Current user :", currentDeviceId, "Nickename", currentNickName)
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
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-cyan-500/20 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <svg className="w-6 h-6 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Leaderboard 
      </h3>

      {leader.length === 0 ? (
        <p className="text-sm text-gray-300">No leaderboard data available.</p>
      ) : (
        <div className="space-y-3">
          {leader.map((leader, index) => {
            const isCurrentUser = leader.deviceId === currentDeviceId;
            const nickName = isCurrentUser
              ? currentNickName
              : `${leader.nickName}`;

            return (
              <div
                key={leader.deviceId}
                className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${isCurrentUser ? 'ring-2 ring-cyan-400' : ''} ${getRankStyle(index, isCurrentUser)}`}
              >
                {getRankNumber(index, isCurrentUser)}

                <div className="flex-1">
                  <p className="font-semibold text-white flex items-center">
                    {nickName}
                    {isCurrentUser && (
                      <span className="ml-2 text-xs bg-cyan-400 text-gray-900 px-2 py-1 rounded-full">
                        You
                      </span>
                    )}
                  </p>
                </div>

                <div className="text-right">
                  <p className={`font-bold ${index === 0 ? 'text-yellow-400' : isCurrentUser ? 'text-cyan-400' : 'text-gray-400'}`}>
                    {leader.scanCount} scans
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