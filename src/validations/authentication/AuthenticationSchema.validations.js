const Joi = require('joi');

const signupSchema = Joi.object({
    name: Joi.string()
        .max(255)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .minLength(6)
        .maxLength(32)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    password_confirmation: Joi.ref('password')
}).with('password', 'password_confirmation')

const signinSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: Joi.string()
        .required(),
})

const forgotPasswordSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
})

module.exports = {
    signupSchema,
    signinSchema,
    forgotPasswordSchema
}