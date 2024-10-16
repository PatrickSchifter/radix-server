import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  return passwordsMatch;
};

export const generateRandomPassword = (length: number) => {
  const buffer = crypto.randomBytes(length);
  return buffer.toString('base64');
};
