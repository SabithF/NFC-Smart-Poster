import express from 'express';
const router = express.Router();
import {
    scanPoster,
    submitQuiz,
    getUserProgress,
    getLeaderboard,
    deleteAllQuestions,
    deleteQuestion,
} from '../controllers/posterController.js';

// When Post request is made to /scan it will run the scanPoster function
router.post('/scan', scanPoster);
router.post('/quiz', submitQuiz);
router.get('/progress/:deviceId', getUserProgress);
router.get('/leaderboard', getLeaderboard);
router.delete('/questions/:posterId', deleteQuestion);
router.delete('/questions', deleteAllQuestions);

export default router;
