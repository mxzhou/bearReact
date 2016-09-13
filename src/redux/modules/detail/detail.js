const LOAD_DETAIL = 'redux-example/DETAIL/LOAD_LIST';
const LOAD_DETAIL_SUCCESS = 'redux-example/DETAIL/LOAD_LIST_SUCCESS';
const LOAD_DETAIL_FAIL = 'redux-example/DETAIL/LOAD_LIST_FAIL';

//const LOAD_DETAIL = 'redux-example/DETAIL/LOAD_LIST';
//const LOAD_DETAIL_SUCCESS = 'redux-example/DETAIL/LOAD_LIST_SUCCESS';
//const LOAD_DETAIL_FAIL = 'redux-example/DETAIL/LOAD_LIST_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DETAIL:
      return {
        ...state,
        loading: true
      };
    case LOAD_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_DETAIL_FAIL:
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
  return globalState.detail;
}

export function loadDetail(option) {
  option.id = parseInt(option.id)
  return {
    types: [LOAD_DETAIL, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL],
    promise: (client) => client.post('/goods/detail',{data:option})
  };
}
export function win() {
  return {
    types: [LOAD_DETAIL, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL],
    promise: (client) => client.post('/goods/win')
  };
}
