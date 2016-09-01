import React, { Component,PropTypes } from 'react';
import { IndexLink,Link } from 'react-router';

export default class Mine extends Component {
  static propTypes = {
  };
  render() {
    const styles = require('./Mine.scss');
    const wallet = require('../../../static/assets/ic_wallet.png')
    const msg = require('../../../static/assets/ic_msg.png')

    return (
      <div>
        <div className={styles.avatar}>
        </div>
        <p className={styles.name}>炫舞我最牛</p>
        <p className={styles.desc}>ID: 51926298<br/>
          夺宝币: 0</p>
        <ul className={styles.navList}>
          <li className={styles.li1}>
            <Link to="/mine/recharge"  className={styles.linkClass}>
              <img src={wallet} className={styles.iconList + ' f-ib'}/>充值
            </Link>
          </li>
          <li className={styles.li2}>
            <Link to="/mine/msg" className={styles.linkClass}>
              <img src={msg} className={styles.iconList + ' f-ib'}/>消息
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
