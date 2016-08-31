const LOAD = 'redux-example/toast/LOAD';
const UNLOAD = 'redux-example/toast/UNLOAD';

const initialState = {
  show: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        show:true,
        text:action.text
      };
    case UNLOAD:
      return {
        show:false
      };
    default:
      return state;
  }
}
// 加载loading
export function loadToast(text) {
  return {
    text:text,
    type: LOAD
  };
}
// 移除loading
export function removeToast() {
  return {
    type: UNLOAD
  };
}