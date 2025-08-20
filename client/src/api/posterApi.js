const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const BASE_URL = `${API_BASE}/posters`;
export const USER_URL = `${API_BASE}/users`;

//API function to fetch posters based on deviceId and posterId
export const scanPoster = async (deviceId, posterId) => {
    try {
        const res = await fetch(`${BASE_URL}/scan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deviceId, posterId }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();

    } catch (error) {
        console.error('Error fetching posters:', error);
    }
};


// APi function to fetch user progile 
export const getUserProfile = async (deviceId) => {
    try {
        const res = await fetch(`${USER_URL}/${deviceId}`);
        if (res.status === 404) return null;
        if (!res.ok) throw new Error('User not found');
        return await res.json();


    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

}

// API function to submit quiz answers
export const submitQuiz = async (deviceId, posterId, selectedAnswer) => {
    try {
        const res = await fetch(`${BASE_URL}/quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deviceId, posterId, selectedAnswer }),

        });
        return await res.json();

    } catch (error) {
        console.error('Error submitting quiz:', error);
    }
};

// Api function to get user progress
export const getUserProgress = async (deviceId) => {
    try {
        const res = await fetch(`${BASE_URL}/progress/${deviceId}`);
        return await res.json();
    } catch (error) {
        console.error('Error fetching user progress:', error);
    }
};



// API function to get leaderboard data
export const getLeaderboard = async () => {
    try {
        const res = await fetch(`${BASE_URL}/leaderboard`);
        return await res.json();
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
    }
};


export const createUser = async (deviceId, nickName = null) => {
    try {
        const res = await fetch(`${USER_URL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deviceId, nickName }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
};

export const getOrCreateUserProfile = async (deviceId) => {
    const existing = await getUserProfile(deviceId);
    if (existing) return existing;

    const created = await createUser(deviceId);
    return created || (await new Promise(r => setTimeout(r, 300))
        .then(() => getUserProfile(deviceId)));
};