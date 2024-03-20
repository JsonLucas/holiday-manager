import joi from 'joi';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-]).{8,}$/;

export const createUserSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().regex(passwordRegex)
});

export const loginUserSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const updatePasswordSchema = joi.object({
    password: joi.string().required().regex(passwordRegex)
});