const LOAD = 'redux-example/history/LOAD';
const UNLOAD = 'redux-example/toast/UNLOAD';

const initialState = {
  link: ''
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        link:action.link
      };
    default:
      return state;
  }
}
// 加载loading
export function load(link) {
  return {
    link:link,
    type: LOAD
  };
}