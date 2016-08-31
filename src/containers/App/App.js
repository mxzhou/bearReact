import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getNav } from 'redux/modules/navlist';
import  {NavBar,Loading,Toast } from '../../components/index';
import config from '../../config';

@connect(
  state => ({nav: state.navlist.list,show: state.loading.show}),
  {getNav})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    nav: PropTypes.array.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {

  }

  render() {
    // 左侧菜单 nav
    const {nav} = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.app}>
        <div className={styles.appTitle}>

        </div>
        <div className={styles.appContent+' f-cb'}>
          <div className={styles.appNav}>
            <NavBar list={nav}/>
          </div>
          <div className={styles.appSection}>
            <Loading></Loading>
            <Toast></Toast>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
  componentDidMount(){
    // 获取菜单
    this.props.getNav()
  }
}
