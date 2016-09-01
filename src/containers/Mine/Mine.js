import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { IndexLink,Link } from 'react-router';
import Left from './Left';


export default class Mine extends Component {
  static propTypes = {
  };
  render() {
    const styles = require('./Mine.scss');
    const wallet = require('../../../static/assets/ic_wallet.png')
    const msg = require('../../../static/assets/ic_msg.png')

    return (
      <div className={styles.mine + ' f-cb'}>
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeaveTimeout={300} transitionAppearTimeout={300} transitionEnterTimeout={300}>
          <div className={styles.left}>
            <div></div>
            <Left></Left>
          </div>
          <div className={styles.right}>
            {this.props.children}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
