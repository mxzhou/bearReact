const LOAD_DETAIL_JOINER = 'redux-example/DETAIL/JOINER/LOAD_LIST';
const LOAD_DETAIL_JOINER_SUCCESS = 'redux-example/DETAIL/JOINER/LOAD_LIST_SUCCESS';
const LOAD_DETAIL_JOINER_FAIL = 'redux-example/DETAIL/JOINER/LOAD_LIST_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DETAIL_JOINER:
      return {
        ...state,
        loading: true
      };
    case LOAD_DETAIL_JOINER_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_DETAIL_JOINER_FAIL:
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
  return globalState.detailJoiner;
}

export function loadDetailJoiner() {
  return {
    types: [LOAD_DETAIL_JOINER, LOAD_DETAIL_JOINER_SUCCESS, LOAD_DETAIL_JOINER_FAIL],
    promise: (client) => client.post('/goods/joiner') 
  };
}