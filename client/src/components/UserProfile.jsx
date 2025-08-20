import React, { useEffect, useState } from "react";
import { getDeviceId } from '../utils/fingerprint.js';
import { uniqueDevice } from '../hooks/uniqueDevice.js';
import { getUserProgress } from "../api/posterApi.js";
import coin from '../assets/coin.json';
import Lottie from "lottie-react";
import { Counter } from "./other_components/Counter.jsx";
import {AnimatedProgressBar} from './other_components/ProgressBar.jsx'


export function UserProfile() {

  const { deviceId, nickName } = uniqueDevice();
  const [scanCount, setScanCount] = useState(0);
  const [badgeCount, setBadgeCount] = useState(0);
  const maxScans = 5;

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
    return <div>Loding progress....</div>;
  }
  const totalPoints = (scanCount * 100) + (badgeCount * 1000); 

  return (
    <header className="flex flex-col items-center justify-between mb-3">

      <div className="flex flex-row  justify-between">

        {/* scans */}
        <div className="flex items-center text-yellow-400  justify-center flex-col
          w-19 mt-3 mx-1 p-2 border rounded-lg border-white/40 drop-shadow-lg">
          <p>SCANS</p>

          <p className='text-white '>
            <div className=" h-auto overflow-y-hidden ">
              <Counter
              value={scanCount}
              places={[100, 10, 1]}
              fontSize={15}
              
              padding={2}
              gap={6}
              textColor="white"
              fontWeight={500} />
              </div></p>
        </div>
        <div className="flex items-center text-yellow-400 justify-center flex-col  w-19 mt-3 mx-1 p-2 border rounded-lg border-white/40 drop-shadow-lg">
          <p>Points</p>
          <p className='text-white'>


            <Counter
              value={totalPoints}
              places={[1000, 100, 10, 1]}
              fontSize={15}
              padding={2}
              gap={6}
              textColor="white"
              fontWeight={500} />
          </p>
        </div>
        <div className="flex items-center text-yellow-400 justify-center flex-col  w-19 mt-3 mx-1 p-2 border rounded-lg border-white/40 drop-shadow-lg">
          <p>Badges</p>
          <p className='text-white'>
            <Counter
              value={badgeCount}
              places={[10, 1]}
              fontSize={15}
              padding={2}
              gap={6}
              textColor="white"
              fontWeight={500} />

          </p>
        </div>




      </div>

      
    

      
      {/* <progress className="rounded-full mt-10" value={badgeCount/5}  /> */}
       <div className="w-50 max-w-md mt-4 text-white">
      <AnimatedProgressBar
        value={badgeCount}
        max={maxScans}
        label={`Scans: ${badgeCount} / ${maxScans}`}
        color="#3B82F6"
        height={18}
      />
    </div>

      <div className="flex items-center space-x-4">
       

      </div>


      {/* Score */}
      <div className="flex flex-row items-center bg-gradient-to-r from-gray-500 to-teal-500 
          ring-inherit ring-slate-300  border-gray-100/10 rounded-xl shadow-lg  ">
        

        {/* Coin */}
        <div className="flex flex-col justify-end  items-center">
          <div className="flex flex-col justify-end font-lucky items-center">
           
            
          </div>

         
        </div>

      </div>





    </header>
  );
}