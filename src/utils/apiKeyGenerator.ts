import { v4 as uuidv4 } from 'uuid';

export const generateApiKey = (): string => {
  return uuidv4();
};
