import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    nickName: {
        type:  String,

    },
    badges: [String],
    scannedPosters:{
        type: [String],
        default: []
    },
    scanCount: {
        type: Number,
        default: 0
    },
    lastScanned: {
        type: Date,
        default: Date.now
    },
    voucherUnlocked: {
        type: Boolean,
        default: false
    },
    deviceIp: {
        type: String,
    },
    userUniqueId: {
        type: Number,
        unique: true,
    }

})

const User = mongoose.model('User', userSchema);
export default User;

