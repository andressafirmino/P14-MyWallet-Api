import joi from "joi";

export const bodySchema = joi.object({
    user: joi.string().email().required()
})
export const typeSchema = joi.object({
    type: joi.valid('entrada', 'saida').required()
})

export const newTransactionSchema = joi.object({
    value: joi.number().positive().precision(2).required(),
    description: joi.string().min(1).max(20).required(),
    email: joi.string().email().required()
})