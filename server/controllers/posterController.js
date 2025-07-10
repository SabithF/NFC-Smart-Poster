// controllers/posterController.js
import User from '../models/user.js';
import Poster from '../models/poster.js';
import { randomNickName } from '../utils/randomNameGenerator.js';
import { generateUserNumber } from '../utils/generateUserNumber.js';
import Voucher from '../models/voucher.js'


// 1. Handle NFC Scan
export const scanPoster = async (req, res) => {
  const { deviceId, posterId } = req.body;

  console.log('📩 Incoming scan request:', { deviceId, posterId });

  if (!deviceId || !posterId) {
    return res.status(400).json({ error: 'Missing deviceId or posterId' });

  }

  // Get the user's IP address
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (ip && ip.startsWith('::ffff:')) {
    ip= ip.replace('::ffff:', ''); // Normalize IPv4-mapped IPv6 addresses
        }

  try {
    let user = await User.findOne({ $or : [{deviceId}, {deviceIp: ip}] });

    console.log('🔍 User found:', user);

    if (!user) {
      const nickName = randomNickName();
      const userUniqueId = await generateUserNumber();

      console.log('🆕 Creating user with:', { nickName, userUniqueId, ip });

      user = new User({
        deviceId,
        nickName,
        deviceIp: ip,
        userUniqueId,
        badges: [],
        scanCount: 0,
        scannedPosters: [posterId] // ← ensure this exists in schema or set default
      });

      await user.save();
      console.log('✅ User saved to DB:', user);
    } else {
      if (!user.scannedPosters?.includes(posterId)){
        user.scannedPosters.push(posterId);
        console.log('📌 Poster added to user:', posterId);
      }
    }

    if (user.badges.includes(posterId)) {
      return res.status(400).json({ message: 'Poster already scanned.' });
    }

    if (!user.scannedPosters.includes(posterId)){
      user.scannedPosters.push(posterId);
    }

    const poster = await Poster.findOne({ posterId });

    console.log('📌 Poster found:', poster);

    if (!poster) {
      return res.status(404).json({ error: 'Poster not found' });
    }

    user.scanCount = user.scannedPosters.length; // Update scanCount based on scannedPosters
    user.lastScan = new Date();
    await user.save();

    res.json({
      question: poster.question,
      options: poster.options,
    });

  } catch (err) {
    console.error('❌ Server error in scanPoster:', err);
    res.status(500).json({ error: 'Server error during scan' });
  }
};


// 2. Handle Quiz Submission
export const submitQuiz = async (req, res) => {
  const { deviceId, posterId, selectedAnswer } = req.body;

  if (!deviceId || !posterId || !selectedAnswer) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const poster = await Poster.findOne({ posterId });
    if (!poster) return res.status(404).json({ error: 'Poster not found' });

    const isCorrect = selectedAnswer === poster.correctAnswer;

    if (!isCorrect) {
      return res.status(200).json({ correct: false, message: 'Try again!' });
    }

    let user = await User.findOne({ deviceId });

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (!user.badges.includes(posterId)) {
      user.badges.push(posterId);

      // Voucher logic: unlock if 5 badges collected
      const voucherScanCount = 3;
      if (user.badges.length >= voucherScanCount) user.voucherUnlocked = true;
      await user.save();
    }

    // obtaining voucher code-------------------------
    let userVoucherCode = null;

    const allVouchers = await Voucher.find()
    console.log("All vouchers",allVouchers)
    
    if (user.voucherUnlocked) {
    const voucher = await Voucher.findOne({
       expiryDate: { $gt: new Date() }, 
     redeemedUsers: {$ne: user._id} 

    });

     

  if (voucher) {
    userVoucherCode = voucher.voucherCode;
    console.log('🎟️ Voucher found:', voucher.voucherCode);
    console.log('👤 User ID:', user._id);
    console.log('📜 Already redeemed:', voucher.redeemedUsers);

    // const alreadyRedeemed = voucher.redeemedUsers.some(id => String(id) === String(user._id));
    const alreadyRedeemed = voucher.redeemedUsers.includes(user._id)

    if (!alreadyRedeemed) {
      console.log("🆕 Pushing user._id to voucher:", user._id);
      voucher.redeemedUsers.push(user._id);
      await voucher.save();

    } else {
      console.log("✅ User already in redeemed list.");
    }
  } else {
    console.log("⚠️ No voucher found or expired.");
  }
}
    res.json({
      correct: true,
      clue: poster.clue,
      badges: user.badges,
      voucherUnlocked: user.voucherUnlocked,
      voucherCode: userVoucherCode,

      
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error submitting quiz' });
  }
};

// 3. Get User Progress
export const getUserProgress = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const user = await User.findOne({ deviceId });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      badges: user.badges,
      scanCount: user.scanCount,
      voucherUnlocked: user.voucherUnlocked,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching progress' });
  }
};

// 4. Get Leaderboard
export const getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find().sort({ scanCount: -1 }).limit(10);
    res.json(topUsers.map(u => ({
      deviceId: u.deviceId,
      scanCount: u.scanCount,
      nickName: u.nickName,
      userId: u.userId,

    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching leaderboard' });
  }
};


// Delete a question

export const deleteQuestion = async (req, res) => {
  try {
    await Poster.deleteOne({ posterId: req.params.posterId });
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting question' });

  }
}

// Delete all question
export const deleteAllQuestions = async (req, res) => {
  try {
    await Poster.deleteMany({});
    res.status(200).json({ message: 'All questions deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting all questions' });
  }
}