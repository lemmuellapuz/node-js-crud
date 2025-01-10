const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserRefreshTokenSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    refresh_token: {
        type: String,
        required: true,
    },
    device_info: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    expires_at: {
        type: Date,
        required: true,
    },
});

/** @type {mongoose.Model} */
const UserRefreshToken = mongoose.model('user_refresh_token', UserRefreshTokenSchema);

module.exports = UserRefreshToken