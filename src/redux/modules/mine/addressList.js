const LOAD_ADDRESS_LIST = 'redux-example/address/LOAD_ADDRESS_LIST';
const LOAD_ADDRESS_LIST_SUCCESS = 'redux-example/address/LOAD_ADDRESS_LIST_SUCCESS';
const LOAD_ADDRESS_LIST_FAIL = 'redux-example/address/LOAD_ADDRESS_LIST_FAIL';
const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ADDRESS_LIST:
      return {
        ...state,
        loading: true
      };
    case LOAD_ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_ADDRESS_LIST_FAIL:
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
    types: [LOAD_ADDRESS_LIST, LOAD_ADDRESS_LIST_SUCCESS, LOAD_ADDRESS_LIST_FAIL],
    promise: (client) => client.post('/user/address/list') // params not used, just shown as demonstration
  };
}
