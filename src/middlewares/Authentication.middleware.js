const jsonwebtoken = require('jsonwebtoken');
const { TOKEN } = require('../config/token.config')

exports.authenticated = async (req, res, next) => {

    const token = req.cookies?.jwt || req.headers['authorization']?.split(' ')[1];
    
    if(!token)
        next(new Error('Unauthorized access'));
    
    jsonwebtoken.verify(token, TOKEN.secret_key, (error) => {
        if(error)
            next(error);

        next();
    })

    
}