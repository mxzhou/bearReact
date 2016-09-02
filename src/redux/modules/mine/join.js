const LOAD_JOIN = 'redux-example/join/LOAD_JOIN';
const LOAD_JOIN_SUCCESS = 'redux-example/join/LOAD_JOIN_SUCCESS';
const LOAD_JOIN_FAIL = 'redux-example/join/LOAD_JOIN_FAIL';
const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_JOIN:
      return {
        ...state,
        loading: true
      };
    case LOAD_JOIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_JOIN_FAIL:
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
  return globalState.join;
}

export function load() {
  return {
    types: [LOAD_JOIN, LOAD_JOIN_SUCCESS, LOAD_JOIN_FAIL],
    promise: (client) => client.post('/user/buyLog/list') // params not used, just shown as demonstration
  };
}