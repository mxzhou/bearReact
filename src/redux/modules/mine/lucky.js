const LOAD_LUCKY = 'redux-example/lucky/LOAD_LUCKY';
const LOAD_LUCKY_SUCCESS = 'redux-example/lucky/LOAD_LUCKY_SUCCESS';
const LOAD_LUCKY_FAIL = 'redux-example/lucky/LOAD_LUCKY_FAIL';
const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_LUCKY:
      return {
        ...state,
        loading: true
      };
    case LOAD_LUCKY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_LUCKY_FAIL:
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
  return globalState.lucky;
}

export function load() {
  return {
    types: [LOAD_LUCKY, LOAD_LUCKY_SUCCESS, LOAD_LUCKY_FAIL],
    promise: (client) => client.post('/user/win/log') // params not used, just shown as demonstration
  };
}
