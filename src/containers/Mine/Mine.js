import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { IndexLink,Link } from 'react-router';

export default class Mine extends Component {
  static propTypes = {
  };
  render() {
    const styles = require('./Mine.scss')
    return (
      <div className={styles.mine + ' f-cb'}>
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeaveTimeout={300} transitionAppearTimeout={300} transitionEnterTimeout={300}>
          <div className={styles.left}>
            <div>

            </div>
            <p></p>
            <p><br/></p>
            <ul>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className={styles.right}>
            <ul class={styles.linkList + ' f-cb'}>
              <li className={styles.li}>
                <Link to="/aaa" className={styles.linkClass}>
                  <div></div>
                  <p className={styles.linkText}>111</p>
                </Link>
              </li>
              <li>
              </li>
              <li>
              </li>
              <li>
              </li>
              <li>
              </li>
            </ul>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
