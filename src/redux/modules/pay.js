const LOAD_PAY = 'redux-example/home/LOAD_PAY';
const LOAD_PAY_SUCCESS = 'redux-example/home/LOAD_PAY_SUCCESS';
const LOAD_PAY_FAIL = 'redux-example/home/LOAD_PAY_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_PAY:
      return {
        ...state,
        loading: true
      };
    case LOAD_PAY_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_PAY_FAIL:
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
  return globalState.paySubmit;
}

export function paySubmit(option) {
  console.log(option)
  return {
    types: [LOAD_PAY, LOAD_PAY_SUCCESS, LOAD_PAY_FAIL],
    promise: (client) => client.post('/cart/submit',{data:option}) // params not used, just shown as demonstration
  };
}
