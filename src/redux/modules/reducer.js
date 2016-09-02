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
import detailJoiner from './detail/detail.joiner';
import payRecord from './mine/payRecord';
import lucky from './mine/lucky';
import join from './mine/join';
import mask from './mine/mask';


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
  detailUser,
  payRecord,
  lucky,
  join,
  mask
});
