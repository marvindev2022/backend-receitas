import { makeHash } from '../hash/makeHash';
import { compareToEncrypted } from './compareToEncrypted';

describe('Encrypted text and Received text comparision', () => {
  it('Should return false if not the same text', () => {
    const nonEncryptedText = 'hello world';
    const encryptedString = makeHash(nonEncryptedText);

    const textsAreEqual = compareToEncrypted({
      receivedString: nonEncryptedText,
      encryptedString: encryptedString,
    });

    expect(textsAreEqual).toBeTruthy();
  });

  it('Should return false if not the same text', () => {
    const nonEncryptedText = 'hello world';

    const textToEncrypt = 'hi world';
    const encryptedString = makeHash(textToEncrypt);

    const textsAreEqual = compareToEncrypted({
      receivedString: nonEncryptedText,
      encryptedString: encryptedString,
    });

    expect(textsAreEqual).toBeFalsy();
  });
});
