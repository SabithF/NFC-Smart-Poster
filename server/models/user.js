import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    badges: [String],
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
    }

})

const User = mongoose.model('User', userSchema);
export default User;

