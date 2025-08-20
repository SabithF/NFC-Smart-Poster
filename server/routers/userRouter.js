import express from 'express';
import User from '../models/user.js';
import { randomNickName } from '../utils/randomNameGenerator.js';
import { generateUserNumber } from '../utils/generateUserNumber.js';

const router = express.Router();

const toDto = (user) => ({
  deviceId: user.deviceId,
  nickName: user.nickName,
  userId: user.userUniqueId,  
  scanCount: user.scanCount,
  badges: user.badges ?? [],
  deviceIp: user.deviceIp ?? null,
  voucherUnlocked: user.voucherUnlocked ?? false,
  scannedPosters: user.scannedPosters ?? [],
  lastScanned: user.lastScanned ?? null,
});

/** GET /api/users/:deviceId — 404 if not found */
router.get('/:deviceId', async (req, res) => {
  try {
    const { deviceId } = req.params;
    const user = await User.findOne({ deviceId });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(toDto(user));
  } catch (error) {
    console.error('[GET /api/users/:deviceId] Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

/** POST /api/users */
router.post('/', async (req, res) => {
  try {
    const body = req.body ?? {};
    const deviceId = body.deviceId;
    const nickName = body.nickName ?? null;
    if (!deviceId) return res.status(400).json({ error: 'deviceId required' });

    const userNumber = await generateUserNumber();

    const user = await User.findOneAndUpdate(
      { deviceId },
      {
        $setOnInsert: {
          deviceId,
          nickName: nickName || randomNickName(),
          userUniqueId: userNumber,
          badges: [],
          scannedPosters: [],
          scanCount: 0,
          voucherUnlocked: false,
          ...(body.deviceIp ? { deviceIp: body.deviceIp } : {}), 
          
        },
      },
      {
        new: true,              
        upsert: true,           
        setDefaultsOnInsert: true,
      }
    );
  
    // Always return 200 for simplicity
    return res.status(200).json(toDto(user));
  } catch (error) {
    
    if (error?.code === 11000) {
      try {
        const user = await User.findOne({ deviceId: req.body?.deviceId });
        if (user) return res.status(200).json(toDto(user));
      } catch {}
    }
    console.error('[POST /api/users] Error:', error);
    if (process.env.NODE_ENV !== 'production') {
      return res.status(500).json({ error: 'Server error', detail: String(error?.message || error) });
    }
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
