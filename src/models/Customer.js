const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    names: {
        type: String,
        required: true,
        trim: true
    },
    lastnames: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    limit: {
        type: Number,
        required: true,
        default: 1
    },
    consumed: {
        type: Number,
        required: true,
        default: 0
    },
    credits: {
        type: Number,
        required: true,
        default: 1
    },
    created: {
        type: Date,
        required: false,
        default: Date.now()
    }
});

module.exports = mongoose.model('Customer', CustomerSchema);
