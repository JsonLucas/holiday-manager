// import crypto from 'crypto';
import { createHash, createCipheriv, createDecipheriv } from 'crypto';
import { cryptoAlgorithm, cryptoIvKey, cryptoSecretKey } from "../constants/env";
import { ICrypto } from '../interfaces/Utilities';

export class Crypto implements ICrypto {
    private static instance: Crypto | null = null;
    private key = createHash('sha512').update(cryptoSecretKey, 'utf-8').digest('hex').substring(0, 32);
    private iv = createHash('sha512').update(cryptoIvKey, 'utf-8').digest('hex').substring(0, 16);
    
    private Crypto(){ }

    public encrypt(payload: string): string {
        const cipher = createCipheriv(cryptoAlgorithm, this.key, this.iv);
        const encrypted = `${cipher.update(payload, 'utf-8', 'base64')}${cipher.final('base64')}`;
        return Buffer.from(encrypted).toString('base64');
    }

    public decrypt(encryptedPayload: string): string {
        const auxEncrypted = Buffer.from(encryptedPayload, 'base64').toString('utf-8');
        const decipher = createDecipheriv(cryptoAlgorithm, this.key, this.iv);
        const decrypted = `${decipher.update(auxEncrypted, 'base64', 'utf-8')}${decipher.final('utf-8')}`;
        return decrypted;
    }

    public compare(hash1: string, hash2: string){
        const decrypted1 = this.decrypt(hash1);
        const decrypted2 = this.decrypt(hash2);
        
        if(decrypted1 === decrypted2) return true;
        return false;
    }

    public static getInstance(): Crypto {
        if (!this.instance) this.instance = new Crypto();

        return this.instance;
    }
}