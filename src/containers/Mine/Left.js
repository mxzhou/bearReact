import React, { Component,PropTypes } from 'react';
import { IndexLink,Link } from 'react-router';
import { load,loadConsumeMoney,loadMessageNum } from '../../redux/modules/mine/user';
import { connect } from 'react-redux';

@connect(
  state => ({user:state.user.data,consume:state.user.consume,message:state.user.message}),
  {load,loadConsumeMoney,loadMessageNum})
export default class Mine extends Component {
  static propTypes = {
    user:PropTypes.object,
    consume:PropTypes.object
  };
  render() {
    const styles = require('./Mine.scss');
    const wallet = require('../../assets/ic_wallet.png')
    const msg = require('../../assets/ic_msg.png')
    const {user,consume,message} = this.props;
    return (
      <div>
        <div className={styles.avatar}>
          <img src={user && user.data && user.data.avatarUrl}/>
        </div>
        <p className={styles.name}>{user &&user.data &&user.data.nickname}</p>
        <p className={styles.desc}>ID: {user &&user.data &&user.data.kgUid}<br/>
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
              {message && message.data !=null &&
                <em className={styles.em + ' f-ib'}>{message.data.sysNum + message.data.logisticsNum}</em>

              }
            </Link>
          </li>
        </ul>
      </div>
    );
  }
  componentDidMount(){
    this.props.load()
    this.props.loadConsumeMoney()
    this.props.loadMessageNum()

  }
}
