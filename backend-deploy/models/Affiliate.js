const mongoose = require('mongoose');

const affiliateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String
    },
    promotionalMethods: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Affiliate', affiliateSchema);
