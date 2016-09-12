const LOAD_CONSUME = 'redux-example/CONSUME/MONEY/LOAD_LIST';
const LOAD_CONSUME_SUCCESS = 'redux-example/CONSUME/MONEY/LOAD_LIST_SUCCESS';
const LOAD_CONSUME_FAIL = 'redux-example/CONSUME/MONEY/LOAD_LIST_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CONSUME:
      return {
        ...state,
        loading: true
      };
    case LOAD_CONSUME_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_CONSUME_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.consumeMoney;
}

export function loadConsumeMoney(option) {
  return {
    types: [LOAD_CONSUME, LOAD_CONSUME_SUCCESS, LOAD_CONSUME_FAIL],
    promise: (client) => client.post('/user/consumeMoney',{data:option}) 
  };
}