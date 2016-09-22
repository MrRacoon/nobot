import { Client } from 'irc';
import { nickname, host, channels, attn } from '../config';
import { reducer } from './state';
import { createStore } from 'redux';
import lookupCommand from './commands';

const bot = new Client(host, nickname, { channels });
const store = createStore(reducer);

bot.addListener('message', (from, to, message) => {
  console.log(`MESSAGE < ${to} | ${from}: ${message}`);
  const [init, command, ...args] = message.split(' ');
  if (init === nickname + ':' || (attn && init === attn)) {
    lookupCommand(command)(bot, store, to, args)
      .catch(err => {
        console.error(err);
        bot.notice(to, 'ERROR PROCESSING COMMAND');
      });

  }
});
