import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    voucherCode: {
        type: String,
        required: true,
        unique: true
    },
    expiryDate: {
        type:Date,
        required: true
    },
    redeemedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    }]


})

const Voucher = mongoose.model('Voucher', voucherSchema);
export default Voucher;