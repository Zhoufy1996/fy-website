import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

const key = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

export const encrypt = (data: string) => {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-ctr', key, iv);
  const encryptedText = Buffer.concat([cipher.update(data), cipher.final()]);

  return `${encryptedText.toString('hex')}.${iv.toString('hex')}`;
};

export const decrypt = (data: string) => {
  const [passwordStr, ivStr] = data.split('.');
  const decipher = createDecipheriv(
    'aes-256-ctr',
    key,
    Buffer.from(ivStr, 'hex'),
  );
  const decryptedText = Buffer.concat([
    decipher.update(Buffer.from(passwordStr, 'hex')),
    decipher.final(),
  ]);
  const result = decryptedText.toString();
  return result;
};
