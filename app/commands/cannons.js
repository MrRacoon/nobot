import { actions } from '../state';

export const load = (bot, store, to, args) => {
  bot.notice(to, 'loading payload');
  store.dispatch(actions.loadPayload(args.join(' ')));
};

export const fire = (bot, store, to) => {
  const payload = store.getState().get('payload');
  if (payload) {
    bot.notice(to, 'firing for effect');
    bot.say(to, payload);
    store.dispatch(actions.clearPayload());
  } else {
    bot.notice(to, 'need to reload');
  }
};
