import { Encryption } from '../../../src/wallets/encryption';

describe('Encryption', () => {
  let encryption: Encryption;

  beforeEach(() => {
    encryption = new Encryption();
  });

  test('should encrypt and decrypt data correctly', () => {
    const data = 'Hello, world!';
    const encryptedData = encryption.encrypt(data);
    const decryptedData = encryption.decrypt(encryptedData);
    expect(decryptedData).toBe(data);
  });

  test('should return different encrypted data for the same input', () => {
    const data = 'Hello, world!';
    const encryptedData1 = encryption.encrypt(data);
    const encryptedData2 = encryption.encrypt(data);
    expect(encryptedData1).not.toBe(encryptedData2);
  });

  test('should throw error when decrypting invalid data', () => {
    const invalidData = 'invalid data';
    expect(() => encryption.decrypt(invalidData)).toThrow();
  });
});
