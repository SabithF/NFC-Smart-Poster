const isLocalhost = window.location.hostname === 'localhost';

const LOCAL_IP = '192.168.0.127';

const BASE_URL = isLocalhost
  ? 'http://localhost:8080/api/posters'
  : `http://${LOCAL_IP}:8080/api/posters`;

const USER_URL = isLocalhost
  ? 'http://localhost:8080/api/users'
  : `http://${LOCAL_IP}:8080/api/users`;

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

// APi function to fetch user progile 
export const getUserProfile = async (deviceId) => {
    try {
        const res = await fetch(`${USER_URL}/${deviceId}`);
        if(!res.ok) throw new Error('User not found');
        return await res.json();
        
        
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null; 
    }

}

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

