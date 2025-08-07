// controllers/posterController.js
import User from '../models/user.js';
import Poster from '../models/poster.js';
import { randomNickName } from '../utils/randomNameGenerator.js';
import { generateUserNumber } from '../utils/generateUserNumber.js';
import Voucher from '../models/voucher.js'


//  Handle NFC Scan
export const scanPoster = async (req, res) => {
  const { deviceId, posterId } = req.body;

  console.log('📩 Incoming scan request:', { deviceId, posterId });

  if (!deviceId || !posterId) {
    return res.status(400).json({ error: 'Missing deviceId or posterId' });

  }

  // Get the user's IP address
  const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ip = rawIp?.startsWith('::ffff:') ? rawIp.replace('::ffff:', '') : rawIp;


  try {
    let user = await User.findOne({ $or: [{ deviceId }, { deviceIp: ip }] });

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
        scannedPosters: [posterId] 
      });

      await user.save();
      console.log('✅ User saved to DB:', user);
    } else {
      if (!user.scannedPosters?.includes(posterId)) {
        user.scannedPosters.push(posterId);
        console.log('📌 Poster added to user:', posterId);
      }
    }

    if (user.badges.includes(posterId)) {
      return res.status(400).json({ message: 'Poster already scanned.' });
    }

    if (!user.scannedPosters.includes(posterId)) {
      user.scannedPosters.push(posterId);
    }

    const poster = await Poster.findOne({ posterId });

    console.log('📌 Poster found:', poster);

    if (!poster) {
      return res.status(404).json({ error: 'Poster not found' });
    }

    user.scanCount = user.scannedPosters.length;
    user.lastScan = new Date();
    await user.save();

    res.json({
      question: poster.question,
      options: poster.options,
      clue: poster.nextClue
    });

  } catch (err) {
    console.error('❌ Server error in scanPoster:', err);
    res.status(500).json({ error: 'Server error during scan' });
  }
};


//  Handle Quiz Submission
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

    // obtaining voucher code-------------------------
    let userVoucherCode = null;

    const allVouchers = await Voucher.findOne()
    console.log("All vouchers", allVouchers)

    if (user.voucherUnlocked) {
      const voucher = await Voucher.findOne({
        // expiryDate: { gt: new Date() } $,
        // redeemedUsers: { ne: user._id }

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

//  Get User Progress
export const getUserProgress = async (req, res) => {
  const { deviceId } = req.params;
  try {
    const user = await User.findOne({ deviceId });
    if (!user) return res.status(404).json({ error: 'User not found GUP' });

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

//  Get Leaderboard
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

// Create poster POST
export const createPoster = async (req, res) => {
  const { posterId, question, options, correctAnswer, nextClue } = req.body

  if (!posterId || !question || !options || !correctAnswer || !nextClue) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  try {
    const newPoster = new Poster({ posterId, question, options, correctAnswer, nextClue });
    await newPoster.save();
    res.status(201).json({ message: "Poster created successfully", poster: newPoster })


  } catch (error) {
    console.error("Error creating poster:", error);
    res.status(500).json({ error: "Server error while creating poster" })

  }
}

// create vouchers
export const createVouchers = async (req, res) => {
  const { voucherCode, expiryDate } = req.body

  if (!voucherCode || !expiryDate) {
    return res.status(400).json({ error: "Missing required fields" })
  }

  try {
    const newVoucher = new Voucher({ voucherCode, expiryDate });
    await newVoucher.save();
    res.status(201).json({ message: "Voucher created successfully", voucher: newVoucher })


  } catch (error) {
    console.error("Error creating poster:", error);
    res.status(500).json({ error: "Server error while creating Vouchers" })

  }
}

// fetch all Posters 
export const allPosters = async (req, res) => {
  try {
    const posters = await Poster.find();
    res.status(200).json(posters);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching the posters" })
  }
}

// fetch all the users
export const allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while fetching user details" });
  }
}


// fetch all vouchers
export const fetchVouchers = async (req, res) => {
  try {
    const vouchersAll = await Voucher.find()
    res.status(200).json(vouchersAll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong while fetching vouchers" })

  }
}


// Delet posters 
export const deletePoster = async (req, res) => {
  try {
    await Poster.deleteOne({ posterId: req.params.posterId })
    res.status(200).json({ message: "Poster deleted successfully" })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occured deleting posters" })
  }
}

// Delete vouchers
export const deleteVouchers = async (req, res) => {
  try {
    await Voucher.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Voucher deleted successfully" })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occured deleting posters" })
  }
}

// update posters
export const updatePosters = async (req, res) => {
  try {
    const { posterId } = req.params;

    const updatedPoster = await Poster.findOneAndUpdate({
      posterId
    }, req.body, { new: true });
    res.status(200).json(updatePosters);
  } catch (error) {
    res.status(500).json({ error: "failed to update poster" })

  }
}

export const updateVouchers = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedVoucher = await Voucher.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(updatedVoucher);
  } catch (error) {
    res.status(500).json({ error: "failed to update vouchers" })
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