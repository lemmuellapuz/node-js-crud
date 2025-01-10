exports.TOKEN = {
    access_secret_key: process.env.ACCESS_TOKEN_SECRET_KEY || 'access-secret-key',
    refresh_secret_key: process.env.REFRESH_TOKEN_SECRET_KEY || 'refresh-secret-key',
    access_expires_in: 30 * 60, //30 minutes
    refresh_expires_in: 1 * 24 * 60 * 60 //1 day
}