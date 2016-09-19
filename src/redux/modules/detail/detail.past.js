const LOAD_DETAIL_PAST = 'redux-example/DETAIL/PAST/LOAD_LIST';
const LOAD_DETAIL_PAST_SUCCESS = 'redux-example/DETAIL/PAST/LOAD_LIST_SUCCESS';
const LOAD_DETAIL_PAST_FAIL = 'redux-example/DETAIL/PAST/LOAD_LIST_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DETAIL_PAST:
      return {
        ...state,
        loading: true
      };
    case LOAD_DETAIL_PAST_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_DETAIL_PAST_FAIL:
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
  return globalState.detailPast;
}

export function loadDetailPast(option) {
  return {
    types: [LOAD_DETAIL_PAST, LOAD_DETAIL_PAST_SUCCESS, LOAD_DETAIL_PAST_FAIL],
    promise: (client) => client.post('/goods/past',{data:option}) 
  };
}