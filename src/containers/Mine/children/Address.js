import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { IndexLink,Link } from 'react-router';
import Close from './Close';

export default class Address extends Component {
  static propTypes = {
  };
  render() {
    const styles = require('../Mine.scss')
    return (
      <div className={3}>
        Address
      </div>
    );
  }
}
