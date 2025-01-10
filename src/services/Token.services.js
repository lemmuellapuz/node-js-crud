const jsonwebtoken = require('jsonwebtoken');
const {TOKEN} = require('../config/token.config')
const UserRefreshToken = require('../models/UserRefreshToken.model');

exports.createAccessToken = (id) => {

    return jsonwebtoken.sign({user_id: id}, TOKEN.access_secret_key, {
        expiresIn: TOKEN.access_expires_in
    });

}

exports.createRefreshToken = (id) => {

    return jsonwebtoken.sign({user_id: id}, TOKEN.refresh_secret_key, {
        expiresIn: TOKEN.refresh_expires_in
    });

}

exports.createTokens = async (req, id, session) => {

    const access_token = this.createAccessToken(id);
    const refresh_token = this.createRefreshToken(id);

    const saveRefreshToken = await this.saveRefreshToken(req, id, refresh_token, session)
    if(!saveRefreshToken)
    {
        throw new Error("Failed to save refresh token");
    }

    return {
        access_token: access_token,
        refresh_token: refresh_token
    }
}

exports.saveRefreshToken = async (req, id, refresh_token, session) => {

    try {
        this.revokeToken(id);
        
        const expiresAt = new Date(Date.now() + TOKEN.refresh_expires_in * 1000);
        const token = await UserRefreshToken.create([{
            user_id: id,
            refresh_token: refresh_token,
            device_info: req.get('User-Agent'),
            expires_at: expiresAt
        }], { session });

        if(!token)
            throw new Error("Failed to save refresh token");
        
        return token;

    } catch (error) {
        throw new Error("Error occurs while saving token: " + error.message);
    }
}

exports.revokeToken = async (id) => {
    await UserRefreshToken.findOneAndDelete({ user_id: id });
}