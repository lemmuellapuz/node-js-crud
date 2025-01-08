const errorHandler = (err, req, res, next) => {
    
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.statusCode = statusCode;

    const responseBody = {
        message: err.message,
        stack: process.env.APP_ENV === 'development' ? err.stack : ""
    }

    console.log('Error:', responseBody);
    res.json(responseBody)
}

module.exports = errorHandler;