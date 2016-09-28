import React, { Component,PropTypes } from 'react';
import { IndexLink,Link } from 'react-router';

export default class Nav extends Component {
  static propTypes = {
  };
  render() {
    const styles = require('../Mine.scss')
    return (
      <ul className={styles.linkList + ' f-cb'}>
        <li className={styles.li}>
          <Link to="/mine/join/0" className={styles.linkClass+" t"}>
            <div className={styles.icon + ' '+styles.join}></div>
            <p className={styles.linkText}>夺宝记录</p>
          </Link>
        </li>
        <li className={styles.li}>
          <Link to="/mine/lucky" className={styles.linkClass+" t"}>
            <div className={styles.icon + ' '+styles.lucky}></div>
            <p className={styles.linkText}>幸运记录</p>
          </Link>
        </li>
        <li className={styles.li+' '+styles.noMargin}>
          <Link to="/mine/address" className={styles.linkClass+" t"}>
            <div className={styles.icon + ' '+styles.address}></div>
            <p className={styles.linkText}>收货地址</p>
          </Link>
        </li>
        <li className={styles.li}>
          <Link to="/mine/payRecord" className={styles.linkClass+" t"}>
            <div className={styles.icon + ' '+styles.payRecord}></div>
            <p className={styles.linkText}>充值记录</p>
          </Link>
        </li>
        <li className={styles.li}>
          <Link to="/mine/intro" className={styles.linkClass+" t"}>
            <div className={styles.icon + ' '+styles.intro}></div>
            <p className={styles.linkText}>夺宝说明</p>
          </Link>
        </li>
      </ul>
    );
  }
}
