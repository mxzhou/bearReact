const LOAD_LIST = 'redux-example/home/LOAD_LIST';
const LOAD_LIST_SUCCESS = 'redux-example/home/LOAD_LIST_SUCCESS';
const LOAD_LIST_FAIL = 'redux-example/home/LOAD_LIST_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_LIST:
      return {
        ...state,
        loading: true
      };
    case LOAD_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_LIST_FAIL:
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
  return globalState.home && globalState.widgets.loaded;
}

export function load() {
  return {
    types: [LOAD_LIST, LOAD_LIST_SUCCESS, LOAD_LIST_FAIL],
    promise: (client) => client.post('/goods/list') // params not used, just shown as demonstration
  };
}
