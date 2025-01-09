const jsonwebtoken = require('jsonwebtoken');
const { TOKEN } = require('../config/token.config')

exports.authenticated = async (req, res, next) => {

    const token = req.cookie.jwt || req.headers['authorization'].split(' ')[1];

    if(token)
        jsonwebtoken.verify(token, TOKEN.secret_key, (error) => {
            if(error)
                res.status(401).send(error.message);

            next();
        })

    res.status(401).send('Unauthorized access');
}