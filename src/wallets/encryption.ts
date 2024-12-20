import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

class Encryption {
  private algorithm: string;
  private key: Buffer;
  private iv: Buffer;

  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.key = randomBytes(32);
    this.iv = randomBytes(16);
  }

  public encrypt(data: string): string {
    const cipher = createCipheriv(this.algorithm, this.key, this.iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  public decrypt(encryptedData: string): string {
    const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

export { Encryption };
