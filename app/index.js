import { Client } from 'irc';
import { nickname, host, channels } from '../config';
import { words } from 'lodash/fp';
import { reducer, actions } from './state';
import { createStore, bindActionCreators } from 'redux';

const bot = new Client(host, nickname, { channels });
const store = createStore(reducer);

const { loadPayload, clearPayload } =
  bindActionCreators(actions, store.dispatch);

const recieved = (from, to, msg) => {
  console.log(`MESSAGE < ${to} | ${from}: ${msg}`);
};

const notice = (to, msg) => {
  console.log(`NOTICE > ${to} : ${msg}`);
  bot.notice(to, msg);
};

const say = (to, msg) => {
  console.log(`MESSAGE > ${to} : ${msg}`);
  bot.say(to, msg);
};

bot.addListener('message', (from, to, message) => {
  recieved(from, to, message);
  const [init, command, ...args] = words(message);
  if (init === nickname) {
    switch (command) {

    case 'load':
      notice(to, 'loading payload');
      loadPayload(args.join(' '));
      break;

    case 'fire':
      const payload = store.getState().get('payload');
      if (payload) {
        notice(to, 'firing for effect');
        say(to, payload);
        clearPayload();
      } else {
        notice(to, 'need to reload');
      }
      break;

    default:
      say(to, '*shrug*');
      break;

    }
  }
});
