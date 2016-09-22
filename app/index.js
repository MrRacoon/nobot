import { Client } from 'irc';
import { nickname, host, channels } from '../config';
import { reducer, actions } from './state';
import { createStore, bindActionCreators } from 'redux';
import { hashi, hashd, verify } from './hasher';

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
  console.log(message.split(' '));
  const [init, command, ...args] = message.split(' ');
  if (init === nickname + ':') {
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

    case 'hash':
    case 'hashi':
      hashi(args.join(' '))
        .then(say.bind(null, to));
      break;

    case 'hashd':
      hashd(args.join(' '))
        .then(say.bind(null, to));
      break;

    case 'verify':
      const [pass, hash] = args;
      verify(pass, hash)
        .then(match => {
          if (match) {
            say(to, 'Correct!')
          } else {
            say(to, 'Nope!')
          }
        })
        .catch(err => say(to, err));
      break;

    default:
      say(to, '*shrug*');
      break;

    }
  }
});
