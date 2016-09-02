const LOAD = 'redux-example/mask/LOAD';
const UNLOAD = 'redux-example/mask/UNLOAD';

const initialState = {
  show: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        show:true
      };
    case UNLOAD:
      return {
        show:false
      };
    default:
      return state;
  }
}
// 加载mask
export function load() {
  return {
    type: LOAD
  };
}
// 移除mask
export function unload() {
  return {
    type: UNLOAD
  };
}