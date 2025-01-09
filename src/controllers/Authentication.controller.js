const User = require('../models/User.model');
const tokenService = require('../services/Token.services');
const { TOKEN } = require('../config/token.config')

const signup = async (req, res, next) => {
    try {

        const user = await User.create(req.body)
        const token = tokenService.createToken(user._id)

        res
            .cookie('jwt', token, {
                httpOnly: true,
                maxAge: TOKEN.expires_in
            })
            .status(201)
            .json({
                status: 'Success',
                message: 'User created',
                data: {
                    user: user._id
                }
            });

    } catch (error) {
        next(error);
    }
}

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.login(email, password)
        const token = tokenService.createToken(user._id)
        res
            .cookie('jwt', token, {
                httpOnly: true,
                maxAge: TOKEN.expires_in
            })
            .status(200)
            .json({
                data: {
                    user: user._id
                }
            });

    } catch (error) {
        next(error);
    }
}

const signout = async (req, res, next) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).send('Signed out');

    } catch (error) {
        next(error);
    }
}

module.exports = {
    signup,
    signin,
    signout
}