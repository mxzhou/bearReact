import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { IndexLink,Link } from 'react-router';

export default class PayRecord extends Component {
  static propTypes = {
  };
  render() {
    const styles = require('../Mine.scss')
    return (
      <div className={4}>
        PayRecord
      </div>
    );
  }
}
