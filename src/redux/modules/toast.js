const LOAD = 'redux-example/toast/LOAD';
const UNLOAD = 'redux-example/toast/UNLOAD';

const initialState = {
  show: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        time:action.time,
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
// 加载Toast
export function loadToast(text,time = 2000) {
  return {
    text:text,
    time:time,
    type: LOAD
  };
}
// 移除Toast
export function removeToast() {
  return {
    type: UNLOAD
  };
}