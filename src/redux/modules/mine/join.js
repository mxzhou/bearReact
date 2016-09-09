const LOAD_JOIN = 'redux-example/join/LOAD_JOIN';
const LOAD_JOIN_SUCCESS = 'redux-example/join/LOAD_JOIN_SUCCESS';
const LOAD_JOIN_FAIL = 'redux-example/join/LOAD_JOIN_FAIL';
const LOAD_CODE_JOIN = 'redux-example/join/LOAD_CODE_JOIN';
const LOAD_CODE_JOIN_SUCCESS = 'redux-example/join/LOAD_CODE_JOIN_SUCCESS';
const LOAD_CODE_JOIN_FAIL = 'redux-example/join/LOAD_CODE_JOIN_FAIL';
const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_JOIN:
      return {
        ...state,
        loading: true
      };
    case LOAD_CODE_JOIN:
      return {
        ...state,
        loading: true
      };
    case LOAD_JOIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_CODE_JOIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        code: action.result,
        error: null
      };
    case LOAD_JOIN_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    case LOAD_CODE_JOIN_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        code: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.join;
}

export function load(data) {
  return {
    types: [LOAD_JOIN, LOAD_JOIN_SUCCESS, LOAD_JOIN_FAIL],
    promise: (client) => client.post('/user/buyLog/list',{data:data}) // params not used, just shown as demonstration
  };
}
export function loadCodes(id) {
  alert(id)
  return {
    types: [LOAD_CODE_JOIN, LOAD_CODE_JOIN_SUCCESS, LOAD_CODE_JOIN_FAIL],
    promise: (client) => client.post('/user/buyInfo/codes',{data:{id:id}}) // params not used, just shown as demonstration
  };
}
