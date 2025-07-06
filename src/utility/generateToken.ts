import CryptoJS from 'crypto-js';

function randomBytes(size: number): Buffer {
    const wordArray = CryptoJS.lib.WordArray.random(size);
    return Buffer.from(wordArray.toString(CryptoJS.enc.Hex), 'hex');
}
export function generateToken(length: number = 32): string {
    const bytes = randomBytes(length / 2);
    return bytes.toString('hex');
}

