import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import navlist from './navlist';
import home from './home';
import loading from './loading';
import toast from './toast';
import alert from './alert';
import announce from './announce';
import detail from './detail/detail';
import detailUser from './detail/detail.user';
import detailGoods from './detail/detail.goods';
import detailJoiner from './detail/detail.joiner';
import detailPast from './detail/detail.past';
import payRecord from './mine/payRecord';
import consumeMoney from './consume';
import pay from './pay';
import lucky from './mine/lucky';
import join from './mine/join';
import mask from './mine/mask';
import addressList from './mine/addressList';
import user from './mine/user';
import history from './history';


export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  navlist,
  home,
  loading,
  toast,
  alert,
  announce,
  detail,
  detailJoiner,
  detailGoods,
  detailUser,
  detailPast,
  consumeMoney,
  payRecord,
  lucky,
  join,
  pay,
  mask,
  addressList,
  user,
  history
});
