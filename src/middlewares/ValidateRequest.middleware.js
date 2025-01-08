/** @type {Joi.Schema} */
const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.validate(req.body);

        if(result.error)
        {
            return res.status(422).json({
                errors: result.error.details[0].message
            });
        }

        next()
    }
}

module.exports = validateRequest;