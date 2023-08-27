import bcryptjs from 'bcryptjs';

export const passwordEncrypter = (password: string): string => {

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);

    return encryptedPassword;
}