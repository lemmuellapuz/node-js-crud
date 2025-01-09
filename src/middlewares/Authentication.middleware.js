const jsonwebtoken = require('jsonwebtoken');
const { TOKEN } = require('../config/token.config');
const User = require('../models/User.model');

exports.authenticated = async (req, res, next) => {

    const token = req.cookie?.jwt || req.headers['authorization']?.split(' ')[1];
    
    console.log('YEY HEADERS', req.headers);
    

    if(!token)
        next(new Error('Unauthorized access'));
    
    jsonwebtoken.verify(token, TOKEN.secret_key, (error) => {
        if(error)
            next(error);

        next();
    })

    
}

exports.checkUser = async (req, res, next) => {

    const token = req.cookies?.jwt || req.headers['authorization']?.split(' ')[1];
    
    if(!token){
        req.user = null
        next()
    }
    
    jsonwebtoken.verify(token, TOKEN.secret_key, async (error, decoded) => {
        if(error)
            req.user = null
        else{
            let user = await User.findById(decoded.id);
            req.user = user;
        }

        next();
    })
    
}