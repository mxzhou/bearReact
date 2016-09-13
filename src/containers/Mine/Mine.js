import React, { Component,PropTypes } from 'react';
export default class Home extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div id="Mine">
        {this.props.children}
      </div>
    );
  }
}
