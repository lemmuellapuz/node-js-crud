exports.TOKEN = {
    secret_key: process.env.TOKEN_SECRET_KEY || 'default-secret-key',
    expires_in: 3 * 24 * 60 * 60 //3 days
}