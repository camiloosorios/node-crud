import bcryptjs from 'bcryptjs';

const passwordEncrypter = (password: string): string => {

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);

    return encryptedPassword;
}

export default passwordEncrypter;