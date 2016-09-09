import React, { Component,PropTypes } from 'react';
import { IndexLink,Link } from 'react-router';
import { load,loadConsumeMoney } from '../../redux/modules/mine/user';
import { connect } from 'react-redux';

@connect(
  state => ({user:state.user.data,consume:state.user.consume}),
  {load,loadConsumeMoney})
export default class Mine extends Component {
  static propTypes = {
    user:PropTypes.object,
    consume:PropTypes.object
  };
  render() {
    const styles = require('./Mine.scss');
    const wallet = require('../../../static/assets/ic_wallet.png')
    const msg = require('../../../static/assets/ic_msg.png')
    const {user,consume} = this.props;
    return (
      <div>
        <div className={styles.avatar}>
        </div>
        <p className={styles.name}>炫舞我最牛</p>
        <p className={styles.desc}>ID: 51926298<br/>
             夺宝币: {consume &&consume.data}
        </p>
        <ul className={styles.navList}>
          <li className={styles.li1}>
            <Link to="/mine/recharge"  className={styles.linkClass}>
              <img src={wallet} className={styles.iconList + ' f-ib'}/>充值
            </Link>
          </li>
          <li className={styles.li2}>
            <Link to="/mine/msg" className={styles.linkClass}>
              <img src={msg} className={styles.iconList + ' f-ib'}/>消息
              <em className={styles.em + ' f-ib'}>5</em>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  componentDidMount(){
    this.props.load()
    this.props.loadConsumeMoney()
  }
}
