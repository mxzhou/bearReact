import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  Home,
  List,
  Detail,
  Announce,
  Mine,
  GoodsDetail,
  GoodsJoiner,
  GoodsPast,
  NotFound
} from 'containers';
import {
  Nav,
  Join,
  JoinDetail,
  Lucky,
  Address,
  Select,
  AddAddress,
  EditAddress,
  PayRecord,
  Intro,
  Recharge,
  PayEnd,
  Msg
} from './containers/Mine';
export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route
       <IndexRoute component={Home}>
       <IndexRoute component={List}/>
       <Route path="detail/:id" component={Detail}/>
       </IndexRoute>
       */ }
      <Route path="home" component={Home}>
        <IndexRoute component={List}/>
        <Route path="detail" component={Detail} >
          <IndexRoute component={GoodsDetail}/>
          <Route path="goods" component={GoodsDetail} />
          <Route path="join" component={GoodsJoiner} />
          <Route path="past" component={GoodsPast} />
        </Route>
      </Route>
      <Route path="announce" component={Announce}></Route>
      <Route path="mine" component={Mine}>
        <IndexRoute component={Nav}/>
        <Route path="join/:id" component={Join} />
        <Route path="joinDetail/:id" component={JoinDetail} />
        <Route path="lucky" component={Lucky} />
        <Route path="address" component={Address} />
        <Route path="selectAddress/:id" component={Select} />
        <Route path="addAddress" component={AddAddress} />
        <Route path="addAddress/:id" component={AddAddress} />
        <Route path="editAddress" component={EditAddress} />
        <Route path="editAddress/:id" component={EditAddress} />
        <Route path="payRecord" component={PayRecord} />
        <Route path="intro" component={Intro} />
        <Route path="recharge" component={Recharge} />
        <Route path="payEnd" component={PayEnd} />

        <Route path="msg" component={Msg} />
      </Route>
      {
        /*
        <Route path="home" component={Home}>
         <Route path="list" component={List}/>
         <Route path="detail/:id" component={Detail} />
         </Route>
         */
      }


      {/* Routes requiring login */ }
      {/*
      <Route onEnter={requireLogin}>
        <Route path="chat" component={Chat}/>
        <Route path="loginSuccess" component={LoginSuccess}/>
      </Route>
      */}

      { /* Routes */ }
      {/*
       <Route path="about" component={About}/>
      <Route path="login" component={Login}/>
      <Route path="survey" component={Survey}/>
      <Route path="widgets" component={Widgets}/>
      */}
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
