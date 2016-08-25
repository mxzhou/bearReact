import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import  {NavBar } from 'components';
import { push } from 'react-router-redux';
import config from '../../config';

@connect(
  state => ({user: state.auth.user,info:state.info.data}),
  {logout,loadInfo})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {

  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {user} = this.props;
    const styles = require('./App.scss');
    const list = [
      {name:'幸运夺宝',link:''},
      {name:'最新揭晓',link:'announce'},
      {name:'个人中心',link:'mine'}
    ];
    return (
      <div className={styles.app}>
        <div className={styles.appTitle}>

        </div>
        <div className={styles.appContent+' f-cb'}>
          <div className={styles.appNav}>
            <NavBar list={list}/>
          </div>
          <div className={styles.appSection}>
            <div className={styles.content}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount(){
    this.props.loadInfo()
  }
}
