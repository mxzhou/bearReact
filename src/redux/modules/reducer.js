import { combineReducers } from 'redux';
import multireducer from 'multireducer';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import navlist from './navlist';
import home from './home';
import loading from './loading';
import toast from './toast';
import announce from './announce';
import detail from './detail/detail';
import detailUser from './detail/detail.user';
import detailGoods from './detail/detail.goods';
import detailJoiner from './detail/detail.joiner';
import detailPast from './detail/detail.past';
import payRecord from './mine/payRecord';
import consumeMoney from './consume';
import lucky from './mine/lucky';
import join from './mine/join';
import mask from './mine/mask';
import addressList from './mine/addressList';


export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  widgets,
  navlist,
  home,
  loading,
  toast,
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
  mask,
  addressList
});
