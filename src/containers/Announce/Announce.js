import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Announce extends Component {
  static propTypes = {
  };
  render() {
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeaveTimeout={300} transitionAppearTimeout={300} transitionEnterTimeout={300}>
        <div>Announce</div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
