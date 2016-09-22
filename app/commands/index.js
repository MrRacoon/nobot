import { argon2i, argon2d, verify } from './hasher';
import { load, fire } from './cannons';
import { shrug } from './shrug';

export default (command) => {
  switch (command) {

  case 'hash':
  case 'hashi':
  case 'argon2i':
  case 'argon2':
  case 'argon':
    return argon2i;

  case 'hashd':
  case 'argon2d':
    return argon2d;

  case 'verify':
    return verify;

  case 'load':
    return load;

  case 'fire':
  case 'fire!':
  case 'fire!!':
  case 'fire!!!':
    return fire;

  default:
    return shrug;
  }
};
