import React, { useState, useEffect } from 'react';
import { getUserProgress } from '../api/posterApi';
import Lottie from 'lottie-react';
import { AnimatedProgressBar } from './other_components/ProgressBar.jsx'
// import confettiAnimation from '../assets/animations/confetti.json'; // adjust path if needed

const allBadges = [
    { id: 'p1', name: 'Mixtape Explorer', image: 'Badge_1' },
    { id: 'p2', name: 'Tour Tracker', image: 'Badge_2' },
    { id: 'p10', name: 'Retro Tuner', image: 'Badge_3' },
    { id: 'p9', name: 'Volume Booster', image: 'Badge_4' },
    { id: 'p5', name: 'Rhythm Rider', image: 'Badge_5' },
];

export default function Badge({ deviceId, leaderboardRef  }) {
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
                console.log("Unloked badges", data.badges)
            } catch (err) {
                console.error('Error fetching badges:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBadges();
    }, [deviceId]);

    const progress = unlockedBadges.length / allBadges.length * 100;

    if (loading) return <div className="text-sm text-gray-300">Loading badge progress...</div>;

    return (
        <div className="relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] mb-8 backdrop-blur-lg rounded-xl 
        p-6 shadow-2xl border border-cyan-500/20 hover:shadow-cyan-500/50 transition-shadow duration-300 font-outfit">
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

            <div className="flex items-center justify-center">
                <div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 2.2, ease: "easeOut", delay: 1.1 }}
                                className="absolute z-105  drop-shadow-2xl  "
                                onClick={() => {
                                        leaderboardRef?.current?.scrollIntoView({behaviour: 'smooth'});
                                    }}
                              >
                                <div className="relative flex flex-col gap-3 items-center justify-center top-4">
                
                                  <p className="absolute z-10 text-lg font-mike text-white drop-shadow-md">Leaderboard</p>
                
                
                                  <img
                                    src="/assets/img/button-coin.png"
                                    alt="coin-background"
                                    className="relative z-0 h-12"
                                    
                                  />
                
                                </div>
                                
                
                              </div>

                
                
            </div>

        </div>
    );
}
