import express from 'express';
import User from '../models/user.js';

const router = express.Router();


// Get user profile by deviceId
router.get('/:deviceId', async (req, res) => {
    try {
        const user = await User.findOne({deviceId: req.params.deviceId})
        
        if (!user) return res.status(404).json({error: 'User not found'})

        res.json(
            {
                deviceId: user.deviceId,
                nickName: user.nickName,
                userId: user.userUniqueId,
                scanCount: user.scanCount,
                badges: user.badges,
            }
        )    
    } catch (error) {
        
        console.error('Error fetching user profile:', error);
        res.status(500).json({error: 'Server error'    });
    }
})

export default router;