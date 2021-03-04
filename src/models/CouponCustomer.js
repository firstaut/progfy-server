const mongoose = require('mongoose');

const CouponCustomerSchema = mongoose.Schema({
    couponId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Coupon',
        required: true,
        trim: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
        trim: true
    },
    customerNames: {
        type: String,
        required: true,
        trim: true
    },
    received: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('CouponCustomer', CouponCustomerSchema);