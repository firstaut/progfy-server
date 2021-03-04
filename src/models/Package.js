const mongoose = require('mongoose');

const PackageSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        default: 'active',
        trim: true
    },
    totalHours: {
        type: Number,
        required: true
    },
    restHours: {
        type: Number,
        required: true
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

module.exports = mongoose.model('Package', PackageSchema);


