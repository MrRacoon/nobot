import * as argon2 from 'argon2';

const salt = new Buffer('somesalt');

export const argon2i = (bot, store, to, args) => {
  return argon2
    .hash(args.join(' '), salt)
    .then(bot.say.bind(bot, to));
};

export const argon2d = (bot, store, to, args) =>
  argon2
    .hash(args.join(' '), salt, { argon2d: true })
    .then(bot.say.bind(bot, to));

export const verify = (bot, store, to, args) => {
  const [pass, hash] = args;
  return argon2
    .verify(hash, pass)
    .then(bot.say.bind(bot, to));
};
