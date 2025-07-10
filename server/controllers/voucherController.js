import Voucher  from "../models/voucher";
import User  from "../models/user";


export const getVoucherUser = async (req, res) => {
    const {deviceId} = req.params;

    try {
        const user = await User.findOne({deviceId});

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        if (!user.voucherUnlocked){
            return res.status(404).json({error: 'Voucher is not unlocked'})
        }

        const voucher = await Voucher.findOne({
            expireDate: {$gt:  new Date()},
            redeemedUsers: {$ne: user._id}
        });

        if (!voucher){
            return res(404).json({error: "No voucher code found "})
        }

        return res.status(200).json({
            voucherCode: voucher.voucherCode,
            expiryDate: voucher.expiryDate
        })

    } catch (error) {
        console.error('❌ Error fetching voucher:', err);
    res.status(500).json({ error: 'Server error fetching voucher' });
    }
}