const jsonwebtoken = require('jsonwebtoken');
const {TOKEN} = require('../config/token.config')

exports.createToken = (id) => {

    return jsonwebtoken.sign({id}, TOKEN.secret_key, {
        expiresIn: TOKEN.expires_in
    });

}