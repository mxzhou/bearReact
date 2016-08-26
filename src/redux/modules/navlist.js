const LOAD = 'redux-example/navlist/LOAD';

const initialState = {
  list: []
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        list: [
          {name:'幸运夺宝',link:''},
          {name:'最新揭晓',link:'announce'},
          {name:'个人中心',link:'mine'}
        ]
      };
    default:
      return state;
  }
}

export function getNav() {
  return {
    type: LOAD
  };
}