const mongoose = require('mongoose');

const affiliateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    email: {
        type: String
    },
    website: {
        type: String
    },
    promotionalMethods: {
        type: String
    },
    audienceCategory: {
        type: String
    },
    paymentDetails: {
        type: String
    },
    promotionMethod: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'reviewed', 'accepted', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Affiliate', affiliateSchema);
