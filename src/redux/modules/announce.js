const LOAD_ANNOUNCE = 'redux-example/announce/LOAD_LIST';
const LOAD_ANNOUNCE_SUCCESS = 'redux-example/announce/LOAD_LIST_SUCCESS';
const LOAD_ANNOUNCE_FAIL = 'redux-example/announce/LOAD_LIST_FAIL';
const WIN_ANNOUNCE = 'redux-example/announce/WIN';
const WIN_ANNOUNCE_SUCCESS = 'redux-example/announce/WIN_SUCCESS';
const WIN_ANNOUNCE_FAIL = 'redux-example/announce/WIN_FAIL';

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
    case WIN_ANNOUNCE:
      return {
        ...state,
        loading: true,
      };
    case WIN_ANNOUNCE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        win: action.result,
        error: null
      };
    case WIN_ANNOUNCE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        win: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.announce;
}

export function load(data) {
  return {
    types: [LOAD_ANNOUNCE, LOAD_ANNOUNCE_SUCCESS, LOAD_ANNOUNCE_FAIL],
    promise: (client) => client.post('/goods/open',{data:data}) // params not used, just shown as demonstration
  };
}
export function win() {
  return {
    types: [WIN_ANNOUNCE, WIN_ANNOUNCE_SUCCESS, WIN_ANNOUNCE_FAIL],
    promise: (client) => client.post('/goods/win') // params not used, just shown as demonstration
  };
}
