import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { IndexLink,Link } from 'react-router';
import Close from './Close';

export default class Recharge extends Component {
  static propTypes = {
  };
  render() {
    const styles = require('../Mine.scss')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          充值
        </h3>
        <div className="f-pr">

        </div>
      </div>
    );
  }
}
