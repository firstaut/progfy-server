const mongoose = require('mongoose');

const MachineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    server: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: false,
        trim: true
    },
    image: {
        type: String,
        required: false,
        trim: true,
        default: ''
    },
    status: {
        type: Boolean,
        required: true,
        trim: true,
        default: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Machine', MachineSchema);