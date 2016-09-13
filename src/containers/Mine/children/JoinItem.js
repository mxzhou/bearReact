import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ApiClient from '../../../helpers/ApiClient'
import { load as loadHistory } from '../../../redux/modules/history';
import wonBg from '../../../../static/assets/img_bingostamp.png'
@connect(
  state => ({}),
  {loadHistory})
export default class JoinItem extends Component {

  static propTypes = {
  };
  static defaultProps = {
  }
  constructor(props, context) {
    super(props, context);
    // 在这里设置初始出台
    this.state = {
    }
  }
  formData(time){
    let tmpDate = new Date(time);
    let year = tmpDate.getFullYear();
    let month = tmpDate.getMonth() + 1;
    month = month<10 ? ('0'+month) : month;
    let day = tmpDate.getDate();
    day = day<10 ? ('0'+day) : day;
    let hours = tmpDate.getHours();
    hours = hours<10 ? ('0'+hours) : hours;
    let minutes = tmpDate.getMinutes();
    minutes = minutes<10 ? ('0'+minutes) : minutes;
    let seconds = tmpDate.getSeconds();
    seconds = seconds<10 ? ('0'+seconds) : seconds;
    return year + '.' + month + '.' + day + ' ' + hours + ':' + minutes+ ':' + seconds
  }

  detailFunc(item,e){
    console.log(e)
    const type = this.props.type;
    this.props.loadHistory('mine/join/'+type)
    location.href = '#/mine/detail/goods?id='+item.id+'&goodsId='+item.goodsId
  }
  stopPropagation(e){
    e.stopPropagation();
  }
  render() {
    const {item} = this.props;
    const styles = require('../Mine.scss');
    return (
      <li className={styles.paragraph +' '+styles.luckyList+ ' f-cb'}>
        <div className={styles.luckyLeft}>
          <img src={item.coverImgUrl} className={styles.coverImg} onClick={this.detailFunc.bind(this,item)}/>
        </div>
        <div className={styles.luckyRight}>
          <p className={styles.goodsName}>{item.goodsName}</p>
          <div className={styles.goodsDesc}>
            <p className={styles.id+' f-ib'}>
              期号: 31273474577
            </p>
            <p className={styles.joinNumber+' f-ib'}>
              本期参与: 2人次
            </p>
            <Link to={'/mine/joinDetail/'+item.id} className={styles.textBlue+' f-ib'} onClick={this.stopPropagation}>查看夺宝号></Link>
          </div>
          <div className={styles.goodsStatus + ' f-cb'}>
            {item.status == 5 &&
              <div className={'f-cb '+styles.won}>
                <img src={wonBg}/>
                <div className="f-fl">
                  获得者：<span className={styles.textBlue}>{item.nickname}</span>
                </div>
                <div className="f-fr">
                  幸运号码：{item.code}
                </div>
                </div>
            }
            {item.status ==3 &&
            <div className={'f-cb '+styles.won}>
              <div>
                揭晓倒计时：<span className={styles.time}></span>
              </div>
            </div>
            }
            {item.status ==0 &&
            <div className={'f-cb '+styles.won}>
              <img/>
              <div className="f-fl">
                获得者：<span className={styles.textBlue}>{item.nickname}</span>
              </div>
              <div className="f-fr">
                幸运号码：{item.code}
              </div>
            </div>
            }
          </div>
        </div>
      </li>
    );
  }
  componentDidMount() {
  }
}
