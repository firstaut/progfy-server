const mongoose = require('mongoose');

const CouponSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    serie: {
        type: String,
        required: true,
        trim: true
    },
    countInit: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 10
    },
    kind: {
        type: String,
        required: true,
        trim: true
    },
    credits: {
        type: Number,
        required: true,
        default: 1
    },
    status: {
        type: Boolean,
        required: true,
        trim: true,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('Coupon', CouponSchema);