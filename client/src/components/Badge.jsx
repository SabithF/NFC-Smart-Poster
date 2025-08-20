import React, { useState, useEffect } from 'react';
import { getUserProgress } from '../api/posterApi';
import Lottie from 'lottie-react';
import { AnimatedProgressBar } from './other_components/ProgressBar.jsx'


const allBadges = [
    { id: 'p1', name: 'Mixtape Explorer', image: 'Badge_1' },
    { id: 'p2', name: 'Tour Tracker', image: 'Badge_2' },
    { id: 'p3', name: 'Retro Tuner', image: 'Badge_3' },
    { id: 'p4' , name: 'Volume Booster', image: 'Badge_4' },
    { id: 'p5', name: 'Rhythm Rider', image: 'Badge_5' },
    
];

export default function Badge({ deviceId , setActivePopup, onLoading }) {
    const [unlockedBadges, setUnlockedBadges] = useState([]);
    const [loading, setLoading] = useState(true);
    const allUnlocked = unlockedBadges.length === allBadges.length;

    useEffect(() => {
        if (!deviceId) return;

        const fetchBadges = async () => {
            setLoading(true);
            try {
                const data = await getUserProgress(deviceId);
                setUnlockedBadges(data.badges || []);
                // console.log("Unloked badges", data.badges)
            } catch (err) {
                console.error('Error fetching badges:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBadges();
    }, [deviceId]);
  

    const progress = unlockedBadges.length / allBadges.length * 100;

    if (loading) return onLoading || <div className="text-sm text-gray-300">Loading badge progress...</div>;

    return (
        <>
        <div className="flex flex-col mx-3">
            
            <div className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-cyan-500/20 max-w-2xl">
            
            {/* Close button */}
            <div className="absolute text-white -top-3 -right-2 h-10 w-10">
                <img src="/assets/img/btn/close.png" alt="close btn" onClick={()=> setActivePopup(null)} />
            </div>

            {allUnlocked && (
                <div className="absolute inset-0 pointer-events-none z-10">
                    {/* <Lottie animationData={confettiAnimation} loop={false} /> */}
                </div>
            )}

            <h3 className="text-xl font-bold  text-white mb-4 flex items-center">
                <img src="/badge.svg" alt="badge-icon" className="w-6 h-6 m-4 " />
                Your Badges
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-6 relative z-20">
                {allBadges.map((badge, index) => {
                    const isUnlocked = unlockedBadges.includes(badge.id);
                    const badgeImage = isUnlocked
                        ? `/assets/img/badges/${badge.image}.png`
                        : `/assets/img/badges/${badge.image}_locked.png`;

                    return (
                        <div key={badge.id} className="flex flex-col items-center space-y-2">
                            <img
                                src={badgeImage}
                                alt={badge.name}
                                className={`h-20 transition-transform duration-300  ${isUnlocked ? 'hover:scale-110 animate-[short-bounce_1s_infinite]' : 'opacity-50'}`}
                            />
                            <p className={`text-sm text-center ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                {badge.name}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="relative z-20 mb-6 ">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                    <span className='font-bold text-sky-200'>Progress</span>
                    {/* <span>{Math.round(progress)}%</span> */}
                </div>
                <div className="w-full max-w-md mt-4 text-white">
                    <AnimatedProgressBar
                        value={unlockedBadges.length}
                        max={allBadges.length}
                        label={`Scans: ${unlockedBadges.length} / ${allBadges.length}`}
                        color="#3B82F6"
                        height={18}
                        showMessage={false}
                    />
                </div>
            </div>
                  
            
            </div>
            
            {/* Navigation button */}
            <div className="flex items-end justify-center -mt-7">
                <div className="flex flex-row gap-3">
                     
                    <div className="  flex flex-col justify-center items-center" 
                           onClick={()=> setActivePopup('leaderboard')}>
                        <img src='/assets/img/btn/next.png' alt="btn-icon" className="w-16 h-16 drop-shadow-md" /> 
                        <span className='text-sky-200/90 font-semibold font-outfit  bg-white/4  px-2 py-1 rounded-md text-sm shadow-xl'>Leaderboard</span>
                    </div>
                    <div className=" hidden flex-col justify-center items-center">
                        <img src='/assets/img/btn/b_trophy.png' alt="btn-icon" className="w-16 h-16 drop-shadow-md" /> 
                        <span className='text-sky-200/90 font-semibold font-outfit  bg-white/4  px-2 py-1 rounded-md text-sm shadow-xl'>Leaderboard</span>
                    </div>
                    
                </div>
            </div>
        </div>
        
        </>
    );
}
