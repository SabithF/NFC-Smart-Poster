const BASE_URL = 'http://localhost:8080/api/posters';

// API function to fetch posters based on deviceId and posterId 
export const scanPoster = async (deviceId, posterId) => {
    try {
        const res = await fetch(`${BASE_URL}/scan`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deviceId, posterId }),
        });
        return await res.json();
    } catch (error) {
        console.error('Error fetching posters:', error);
    }
};

// API function to submit quiz answers
export const submitQuiz = async (deviceId, posterId, selectedAnswer) =>{
    try {
        const res = await fetch(`${BASE_URL}/quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ deviceId, posterId, selectedAnswer }),

        });
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

