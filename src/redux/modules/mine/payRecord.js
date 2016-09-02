const LOAD_PAY_RECORD = 'redux-example/payRecord/LOAD_PAY_RECORD';
const LOAD_PAY_RECORD_SUCCESS = 'redux-example/payRecord/LOAD_PAY_RECORD_SUCCESS';
const LOAD_PAY_RECORD_FAIL = 'redux-example/payRecord/LOAD_PAY_RECORD_FAIL';
const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PAY_RECORD:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAY_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_PAY_RECORD_FAIL:
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
  return globalState.payRecord;
}

export function load() {
  return {
    types: [LOAD_PAY_RECORD, LOAD_PAY_RECORD_SUCCESS, LOAD_PAY_RECORD_FAIL],
    promise: (client) => client.post('/user/payLog') // params not used, just shown as demonstration
  };
}
