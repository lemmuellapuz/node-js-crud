const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);

const signupSchema = Joi.object({
    name: Joi.string()
        .max(255)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),
    password: joiPassword
        .string()
        .min(6)
        .max(32)
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .onlyLatinCharacters()
        .doesNotInclude(['password'])
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