const LOAD_DETAIL_USER = 'redux-example/DETAIL/USER/LOAD_LIST';
const LOAD_DETAIL_USER_SUCCESS = 'redux-example/DETAIL/USER/LOAD_LIST_SUCCESS';
const LOAD_DETAIL_USER_FAIL = 'redux-example/DETAIL/USER/LOAD_LIST_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DETAIL_USER:
      return {
        ...state,
        loading: true
      };
    case LOAD_DETAIL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_DETAIL_USER_FAIL:
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
  return globalState.detailUser;
}

export function loadDetailUser(option) {
  return {
    types: [LOAD_DETAIL_USER, LOAD_DETAIL_USER_SUCCESS, LOAD_DETAIL_USER_FAIL],
    promise: (client) => client.post('/goods/user',{data:option})
  };
}