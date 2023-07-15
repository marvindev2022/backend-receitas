import { hashSync } from 'bcrypt';

export const makeHash = (stringToEncrypt: string) =>
  hashSync(stringToEncrypt, 10);
