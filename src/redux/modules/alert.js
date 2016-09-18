const LOAD = 'redux-example/alert/LOAD';
const UNLOAD = 'redux-example/alert/UNLOAD';

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
// 加载loading
export function loadAlert(text) {
  return {
    type: LOAD
  };
}
// 移除loading
export function removeAlert() {
  return {
    type: UNLOAD
  };
}