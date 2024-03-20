export interface IGenericObject {
    [key: string]: any
}

export interface ICrypto {
    encrypt: (payload: string) => string;
    decrypt: (encryptedPayload: string) => string;
    compare: (hash1: string, hash2: string) => boolean;
}

export interface IValidator<S, O> {
    validate: (payload: IGenericObject, schema: S, options?: O) => Promise<boolean>;
}