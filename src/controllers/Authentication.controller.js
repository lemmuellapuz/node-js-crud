const User = require('../models/User.model');
const { paginate } = require('../utils/Helper.utils')


const signup = async (req, res, next) => {
    try {

        const user = await User.create(req.body)

        res.status(201).send({
            status: 'Success',
            message: 'User created',
            data: user
        });

    } catch (error) {
        next(error);
    }
}


module.exports = {
    signup
}