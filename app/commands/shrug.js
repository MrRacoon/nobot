import { sample } from 'lodash/fp';

const exasperations = [
  '*shrug*',
  '*sigh*',
  '*le* *sigh*',
  '*nod*',
  '*winks*'
];

export const shrug = (bot, store, to) => {
  bot.say(to, sample(exasperations));
  return Promise.resolve();
};
