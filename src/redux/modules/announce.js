const LOAD_ANNOUNCE = 'redux-example/announce/LOAD_LIST';
const LOAD_ANNOUNCE_SUCCESS = 'redux-example/announce/LOAD_LIST_SUCCESS';
const LOAD_ANNOUNCE_FAIL = 'redux-example/announce/LOAD_LIST_FAIL';

//const LOAD_ANNOUNCE = 'redux-example/announce/LOAD_LIST';
//const LOAD_ANNOUNCE_SUCCESS = 'redux-example/announce/LOAD_LIST_SUCCESS';
//const LOAD_ANNOUNCE_FAIL = 'redux-example/announce/LOAD_LIST_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ANNOUNCE:
      return {
        ...state,
        loading: true
      };
    case LOAD_ANNOUNCE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_ANNOUNCE_FAIL:
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
  return globalState.announce;
}

export function load() {
  return {
    types: [LOAD_ANNOUNCE, LOAD_ANNOUNCE_SUCCESS, LOAD_ANNOUNCE_FAIL],
    promise: (client) => client.post('/goods/open') // params not used, just shown as demonstration
  };
}
export function win() {
  return {
    types: [LOAD_ANNOUNCE, LOAD_ANNOUNCE_SUCCESS, LOAD_ANNOUNCE_FAIL],
    promise: (client) => client.post('/goods/win') // params not used, just shown as demonstration
  };
}
