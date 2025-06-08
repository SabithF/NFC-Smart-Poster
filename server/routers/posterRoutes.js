import express from 'express';
const router = express.Router();
import {
    scanPoster,
    submitQuiz,
    getUserProgress,
    getLeaderboard,
} from '../controllers/posterController.js';


router.post('/scan', scanPoster);
router.post('/quiz', submitQuiz);
router.get('/progress/:deviceId', getUserProgress);
router.get('/leaderboard', getLeaderboard);

export default router;
// This code defines the routes for the poster-related functionalities in the application.
