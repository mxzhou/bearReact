const LOAD_USER = 'redux-example/user/LOAD_USER';
const LOAD_USER_SUCCESS = 'redux-example/user/LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'redux-example/user/LOAD_USER_FAIL';
const LOAD_CONSUMEMONEY = 'redux-example/user/LOAD_CONSUMEMONEY';
const LOAD_CONSUMEMONEY_SUCCESS = 'redux-example/user/LOAD_CONSUMEMONEY_SUCCESS';
const LOAD_CONSUMEMONEY_FAIL = 'redux-example/user/LOAD_CONSUMEMONEY_FAIL';
const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case LOAD_CONSUMEMONEY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        consume: action.result,
        error: null
      };
    case LOAD_CONSUMEMONEY_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        consume: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.join;
}

export function load() {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: (client) => client.post('/user/detail',{data:{}}) // params not used, just shown as demonstration
  };
}

export function loadConsumeMoney(data) {
  return {
    types: [LOAD_CONSUMEMONEY, LOAD_CONSUMEMONEY_SUCCESS, LOAD_CONSUMEMONEY_FAIL],
    promise: (client) => client.post('/user/consumeMoney',{data:{}}) // params not used, just shown as demonstration
  };
}
