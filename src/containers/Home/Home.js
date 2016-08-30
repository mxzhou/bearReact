import React, { Component,PropTypes } from 'react';
export default class Home extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    const styles = require('./Home.scss');

    return (
      <div className={styles.home}>
        {this.props.children}
      </div>
    );
  }
}
