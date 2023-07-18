import { compareSync } from "bcrypt";

interface CompareToEncryptedProps {
  receivedString: string;
  encryptedString: string;
}

export const compareToEncrypted = ({
  receivedString,
  encryptedString,
}: CompareToEncryptedProps): boolean => {
  return compareSync(receivedString, encryptedString);
};
