const Joi = require('joi');

const storeSchema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().max(255).required(),
})

const updateSchema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().max(255).required(),
    status: Joi.boolean().required()
})

module.exports = {
    storeSchema,
    updateSchema
}