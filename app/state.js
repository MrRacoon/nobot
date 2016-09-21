import { Map } from 'immutable';
import { identity } from 'lodash/fp';
const lookup = {};
// =============================================================================
const LOAD_PAYLOAD = 'bot/payload/load';
const loadPayload = payload => ({ type: LOAD_PAYLOAD, payload });

lookup[LOAD_PAYLOAD] = (state, msg) => {
  console.log(`-- adding payload (${msg.payload})`);
  return state.set('payload', msg.payload);
};
// =============================================================================
const CLEAR_PAYLOAD = 'bot/payload/clear';
const clearPayload = () => ({ type: CLEAR_PAYLOAD });

lookup[CLEAR_PAYLOAD] = (state) => {
  console.log(`-- removing payload (${state.get('payload')})`);
  return state.set('payload', null);
};
// =============================================================================
export const actions = { loadPayload, clearPayload };
export const reducer = (state, msg) => {
  if (!state) { state = new Map(); }
  return apply(msg.type, state, msg);
};

const apply = (type, state, msg) => (lookup[type] || identity)(state, msg);
