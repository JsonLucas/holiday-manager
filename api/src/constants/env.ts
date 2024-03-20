import 'dotenv/config';

export const port = process.env.PORT || 5001;
export const cryptoSecretKey = process.env.CRYPTO_SECRET || "fd85b494-aaaa";
export const cryptoIvKey = process.env.CRYPTO_IV_SECRET || "smslt";
export const cryptoAlgorithm = process.env.CRYPTO_ALGORITHM || "AES-256-CBC";