import React, { useState, useEffect } from 'react';
import { getUserProgress } from '../api/posterApi';

const allBadges = [
    { id: 'p1', name: 'Badge 1' },
    { id: 'p2', name: 'Badge 2' },
    { id: 'p3', name: 'Badge 3' },
    { id: 'p4', name: 'Badge 4' },
    { id: 'p5', name: 'Badge 5' },
];

function getBadgeEmoji(badgeId) {
    const icons = {
        p1: '🧠',
        p2: '🚀',
        p3: '🎯',
        p4: '🎓',
        p5: '👑',
    };
    return icons[badgeId] || '🏆';
}


export default function Badge({ deviceId }) {
    const [unlockedBadges, setUnlockedBadges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!deviceId) return;

        const fetchBadges = async () => {
            try {
                const data = await getUserProgress(deviceId);
                setUnlockedBadges(data.badges || []);
            } catch (err) {
                console.error("Error fetching badges:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBadges();


    }, [deviceId]);

    const progressBar = ((unlockedBadges?.length || 0 ) / 5) * 100;

    if (loading) return <div className="text-sm text-gray-300">Loading badge progress...</div>;

    return (
        // Main div for badges`
        <div className="bg-gray-900/30 mb-8 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-cyan-500/20 hover:shadow-cyan-500/50 transition-shadow duration-300">

            <h3 className='text-xl font-bold  text-white mb-4 flex items-center'>
                 <img src="/badge.svg" alt="badge-icon"  className='w-6 h-6 m-4' />
                
               
                Your badges
            </h3>

            <div className="grid grid-cols-3 gap-3 mb-4">
                {allBadges.map((badge) => {
                    const isUnlocked = unlockedBadges.includes(badge.id);
                    return (
                        <div className="relative" key={badge.id}>
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${isUnlocked
                                    ? `bg-gradient-to-br from-yellow-400 to-yellow-600 animate-bounce`
                                    : 'bg-gray-600'
                                }`}>
                                <span className="text-2xl">
                                    {isUnlocked ? getBadgeEmoji(badge.id) : '🔒'}
                                </span>
                            </div>
                            <p className={`text-xs font-medium text-center mt-1 ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>
                                {badge.name}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="mb-3">
                <div className="flex justify-between text-sm text-gray-300 mb-4">
                    <span>Progress</span>
                    <span>{unlockedBadges.length/allBadges.length*100}%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                    <div
                        className="bg-gradient-to-r from-cyan-400 to-teal-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${progressBar}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
