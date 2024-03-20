import * as z from 'zod';

const passwordLengthError = 'Password must have at least 8 characters';
const passwordRegexError = "The password must contain an upper case and lower case character, a number and a special digit.";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-]).{8,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const signUpSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.string().email().regex(emailRegex, { message: "Invalid email." }),
    password: z.string().min(8, { message: passwordLengthError }).regex(passwordRegex, { message: passwordRegexError })
});