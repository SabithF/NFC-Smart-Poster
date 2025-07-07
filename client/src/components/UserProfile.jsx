import React, { useEffect, useState } from "react";
import { getDeviceId } from '../utils/fingerprint.js';
import {uniqueDevice} from '../hooks/uniqueDevice.js';
import { getUserProgress } from "../api/posterApi.js";



export function UserProfile() {
    const { deviceId, nickName } = uniqueDevice();
    const [scanCount, setScanCount] = useState(0);
    const [badgeCount, setBadgeCount] = useState(0);

    useEffect(() => {
      const fetchProgress = async () => {
        if (!deviceId) return;

        try {
          const progress = await getUserProgress(deviceId);
          setScanCount(progress?.scanCount || 0)
          setBadgeCount(progress?.badges?.length || 0);
          
        } catch (error) {
          console.error("Error fetching user progress:", error);
          
        }
      }
      fetchProgress();
    }, [deviceId])

    if (!deviceId || !nickName) {
        return <div>Loading user profile...</div>;
    }
    const totalPoints = scanCount + 0 + badgeCount * 1000; // Placeholder for total points, can be dynamic based on user progress

  return (
    <header className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
        {/* Avatar */}
            <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400 p-1 animate-pulse">
                    <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-gray-900 font-bold">
                            {nickName ? nickName.charAt(0).toUpperCase() : "?"}
                        </div>
                    </div>
                </div>

                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
            </div>
            {/* Username and details */}
            <div >
                <h2 className="text-s font-bold lg:text-xl ">{nickName}</h2>
                <p className="text-cyan-400">Scans: {scanCount}</p>
                <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                <svg key={index} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
                </div>
            </div>
        </div>

        {/* Score */}
      <div className="flex flex-col justify-center items-center text-center bg-gradient-to-r from-green-500 to-teal-500 rounded-xl px-4 py-2 shadow-lg w-25 h-20 lg:w-25 lg:h-15">
        <div className="text-xl font-bold text-gray-900">{totalPoints}</div>
        <div className="text-xs opacity-90 text-gray-900">Total Points</div>
      </div>
    </header>
  );
}