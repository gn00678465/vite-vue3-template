import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';

const CryptoSecret = '__CryptoJS_rapix__';

export function encrypt(data: unknown) {
  const newData = JSON.stringify(data);
  return AES.encrypt(newData, CryptoSecret).toString();
}

export function decrypt(cipherText: string) {
  const bytes = AES.decrypt(cipherText, CryptoSecret);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  if (originalText) {
    return JSON.parse(originalText);
  }
  return null;
}
