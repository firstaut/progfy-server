const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    dateDay: {
        type: String,
        required: true
    },
    hourId: {
        type: Number,
        required: true
    },
    hourInit: {
        type: String,
        required: true,
        trim: true
    },
    hourEnd: {
        type: String,
        required: true,
        trim: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);