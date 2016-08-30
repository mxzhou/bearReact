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
  NotFound
} from 'containers';

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
        <Route path="detail/:id" component={Detail} />
      </Route>
      <Route path="announce" component={Announce}></Route>
      <Route path="mine" component={Mine}></Route>
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
