const LOAD_DETAIL_GOODS = 'redux-example/DETAIL/GOODS/LOAD_LIST';
const LOAD_DETAIL_GOODS_SUCCESS = 'redux-example/DETAIL/GOODS/LOAD_LIST_SUCCESS';
const LOAD_DETAIL_GOODS_FAIL = 'redux-example/DETAIL/GOODS/LOAD_LIST_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DETAIL_GOODS:
      return {
        ...state,
        loading: true
      };
    case LOAD_DETAIL_GOODS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_DETAIL_GOODS_FAIL:
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
  return globalState.detailGoods;
}

export function loadDetailGoods(option) {
  return {
    types: [LOAD_DETAIL_GOODS, LOAD_DETAIL_GOODS_SUCCESS, LOAD_DETAIL_GOODS_FAIL],
    promise: (client) => client.get('/goods/'+option.id+'/info')
  };
}