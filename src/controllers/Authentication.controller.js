const User = require('../models/User.model');
const tokenService = require('../services/Token.services');
const { TOKEN } = require('../config/token.config');
const mongoose = require('mongoose');

const signup = async (req, res, next) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const user = await User.create([req.body], { session })
        const tokens = await tokenService.createTokens(req, user[0]._id, session);

        await session.commitTransaction();

        req.user = user[0]._id;
        res.cookie('jwt', tokens.refresh_token, { httpOnly: true, maxAge: TOKEN.expires_in });

        res.status(201)
            .json({
                status: 'Success',
                message: 'User created',
                data: {
                    access_token: tokens.access_token,
                    user: user[0]._id
                }
            });

    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
}

const signin = async (req, res, next) => {

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { email, password } = req.body;

        const user = await User.login(email, password)
        const tokens = await tokenService.createTokens(req, user._id, session);

        await session.commitTransaction();

        req.user = user._id;
        res.cookie('jwt', tokens.refresh_token, { httpOnly: true, maxAge: TOKEN.expires_in });

        res.status(200)
            .json({
                access_token: tokens.access_token,
                user: user._id
            });

    } catch (error) {
        next(error);
        session.abortTransaction();
    } finally {
        session.endSession();
    }
}

const signout = async (req, res, next) => {
    try {
        const userId = req.user;
        console.log(req);
        
        if(userId)
            await tokenService.revokeToken(userId);
        
        res.clearCookie('jwt');

        res.status(200).json({
            status: 'Success',
            message: 'Signed out successfully'
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    signup,
    signin,
    signout
}