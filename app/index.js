import { Client } from 'irc';
import { nickname, host, channels } from '../config';
import { reducer } from './state';
import { createStore } from 'redux';
import lookupCommand from './commands';

const bot = new Client(host, nickname, { channels });
const store = createStore(reducer);

const recieved = (from, to, msg) => {
  console.log(`MESSAGE < ${to} | ${from}: ${msg}`);
};

bot.addListener('message', (from, to, message) => {
  recieved(from, to, message);
  console.log(message.split(' '));
  const [init, command, ...args] = message.split(' ');
  if (init === nickname + ':') {
    lookupCommand(command)(bot, store, to, args);
  }
});
