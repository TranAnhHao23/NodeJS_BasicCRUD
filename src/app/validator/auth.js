const joi = require('joi')

const registerValidator = (data) => {
    const rule = joi.object({
        name: joi.string().min(6).max(255).required(),
        password: joi.string().min(6).max(255).required()
    })

    return rule.validate(data)
}

module.exports.registerValidator = registerValidator;
