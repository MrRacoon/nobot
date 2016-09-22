import * as argon2 from 'argon2';

const salt = new Buffer('somesalt');

export const hashi  = (string)         => argon2.hash(string, salt);
export const hashd  = (string)         => argon2.hash(string, salt, { argon2d: true });
export const verify = (password, hash) => argon2.verify(hash, password);
