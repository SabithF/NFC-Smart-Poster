import express from 'express';
const router = express.Router();
import {
    scanPoster,
    submitQuiz,
    getUserProgress,
    getLeaderboard,
    deleteAllQuestions,
    deletePoster,
    createPoster,
    allPosters,
    updatePosters,
    allUsers,
    fetchVouchers,
    deleteVouchers,
    updateVouchers,
    createVouchers,

} from '../controllers/posterController.js';

// When Post request is made to /scan it will run the scanPoster function
router.post('/scan', scanPoster);
router.post('/quiz', submitQuiz);
router.get('/progress/:deviceId', getUserProgress);
router.get('/leaderboard', getLeaderboard);
router.delete('/delete/:posterId', deletePoster);
router.delete('/questions', deleteAllQuestions);
router.post('/create', createPoster);
router.post('/create-voucher', createVouchers )
router.get('/all-posters', allPosters);
router.get('/all-users', allUsers);
router.put('/update/:posterId', updatePosters);
router.get('/vouchers', fetchVouchers);
router.delete('/vouchers/:id', deleteVouchers);
router.put('/update-voucher/:id', updateVouchers);


export default router;
