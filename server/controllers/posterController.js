// controllers/posterController.js
import User from '../models/user.js';
import Poster from '../models/poster.js';

// 1. Handle NFC Scan
export const scanPoster = async (req, res) => {

  const { deviceId, posterId } = req.body;

  console.log('BODY:', req.body);

  if (!deviceId || !posterId) return res.status(400).json({ error: 'Missing deviceId or posterId' });

  try {
    
    let user = await User.findOne({ deviceId });
    if (!user) {
      user = new User({ deviceId, badges: [] });
    }

    if (user.badges.includes(posterId)) {
      return res.status(400).json({ message: 'Poster already scanned.' });
    }

    user.scanCount += 1;
    user.lastScan = new Date();
    await user.save();

    const poster = await Poster.findOne({ posterId });

    if (!poster) return res.status(404).json({ error: 'Poster not found' });

    res.json({
      question: poster.question,
      options: poster.options,
    });

  } catch (err) {
    console.error(err);
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
      const voucherScanCount = 5;
      if (user.badges.length >= voucherScanCount) user.voucherUnlocked = true;
      await user.save();
    }

    res.json({
      correct: true,
      clue: poster.clue,
      badges: user.badges,
      voucherUnlocked: user.voucherUnlocked,
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
      deviceId: u.deviceId.slice(0, 6) + '...',
      scanCount: u.scanCount
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
export const deleteAllQuestions =  async (req, res) => {
  try {
     await Poster.deleteMany({});
     res.status(200).json({ message: 'All questions deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting all questions' });
  }
}