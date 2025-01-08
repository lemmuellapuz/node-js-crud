const sanitizeRequest = (req, res, next) => {
    req.body = JSON.parse(JSON.stringify(req.body).replace(/<[^>]*>?/gm, ''));
    next();
};

module.exports = sanitizeRequest;
