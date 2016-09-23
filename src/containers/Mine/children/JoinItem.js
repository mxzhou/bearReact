import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ApiClient from '../../../helpers/ApiClient'
import { load as loadHistory } from '../../../redux/modules/history';
import { loadToast,removeToast } from '../../../redux/modules/toast';
import { load as loadUser } from '../../../redux/modules/mine/user';

import wonBg from '../../../assets/img_bingostamp.png'
@connect(
  state => ({user:state.user.data,}),
  {loadHistory,loadUser,loadToast})
export default class JoinItem extends Component {

  static propTypes = {
  };
  static defaultProps = {
    time: 0,
    result:{},
    imgShow:true
  }
  constructor(props, context) {
    super(props, context);
    // 在这里设置初始出台
    this.state = {
      time: props.time,
      result:props.result,
      imgShow:props.imgShow
    }
  }
  count(){
    this.timeTemp = parseInt(this.times/10);
    this.remain_ssec = this.timeTemp % 10;

    this.timeTemp = parseInt(this.timeTemp / 10);
    this.remain_msec = this.timeTemp % 10;

    this.timeTemp = parseInt(this.timeTemp / 10);
    // 秒数
    this.remain_sec = this.timeTemp % 60;
    this.timeTemp = parseInt(this.timeTemp / 60);
    // 分数
    this.remain_minute = this.timeTemp % 60;
    this.timeTemp = parseInt(this.timeTemp / 60);
    // 小时数
    this.remain_hour = this.timeTemp % 24;
    this.timeTemp = parseInt(this.timeTemp / 24);
  }
  begin(){
    const {item} = this.props;

    var hour = 0,                           // 最终显示小时
      min = 0,                            // 最终显示分钟
      sec = 0,                            // 最终显示秒
      ssec = 0,
      msec = 0;
    var minus = Date.now() - this.timetag;
    if ((minus) >= 10) {
      this.times = this.times - minus;
      this.count()
      //   当时间结束后倒计时停止
      if ((this.remain_minute <= 0) && (this.remain_sec <= 0) && (this.remain_hour <= 0)) {
        this.remain_minute = this.remain_sec = this.remain_hour = 0;
        this.setState({time: '正在揭晓'});
        const client = new ApiClient();
        const _this = this;
        // 异步获取数据 promise
        client.post('/goods/win',{data:{id:item.id}}).then(function(data) {
          if(data.errorCode!=0){
            //_this.props.loadToast(data.errorMessage)
            return;
          }
          if(data.data&&data.data.status != 5){
            return;
          }
          _this.setState({imgShow:!_this.state.imgShow});
          _this.setState({result:data});
          // success
        }, function(value) {
          // failure
        });
        return;
      }
      this.timetag = Date.now();
    }
    // 以下部分做为时间显示时补零
    hour = this.remain_hour < 10 ? '0' + this.remain_hour : this.remain_hour;
    min = this.remain_minute < 10 ? '0' + this.remain_minute : this.remain_minute;
    sec = this.remain_sec < 10 ? '0' + this.remain_sec : this.remain_sec;
    ssec = this.remain_ssec;
    msec = this.remain_msec;
    this.setState({time: min + ':' + sec + ':' + msec+ssec});
    this.reqAni = window.requestAnimationFrame(this.begin.bind(this));
  }
  countDownFunc(){
    const {item,servertime} = this.props;
    this.times = item.startTime+3*60*1000-servertime;
    this.timeTemp,                         // 临时时间
      this.remain_msec = 0,                    // mm
      this.remain_ssec = 0,                    // mm
      this.remain_sec = 0,                     // 秒
      this.remain_minute = 0,                  // 分钟
      this.remain_hour = 0,                    // 小时
      this.timetag = Date.now();               // 上一帧的时间
    this.count();
    this.reqAni = window.requestAnimationFrame(this.begin.bind(this));
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
    const type = this.props.type;
    this.props.loadHistory('mine/join/'+type)
    location.href = '#/mine/detail/goods?id='+item.id+'&goodsId='+item.goodsId
  }
  stopPropagation(e){
    e.stopPropagation();
  }
  render() {
    const {item,user} = this.props;
    const {time,imgShow,result} = this.state;
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
              期号: {item.id}
            </p>
            <p className={styles.joinNumber+' f-ib'}>
              本期参与: {item.userJoinNumber}人次
            </p>
            <Link to={'/mine/joinDetail/'+item.id} className={styles.textBlue+' f-ib'} onClick={this.stopPropagation}>查看夺宝号></Link>
          </div>
          <div className={styles.goodsStatus + ' f-cb'}>
            {item.status == 5 &&
              <div className={'f-cb '+styles.won}>
                { user &&user.data &&user.data.nickname ==item.nickname && <img src={wonBg}/>}
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

              {imgShow ?
                <div>揭晓倒计时：<span className={styles.time}>{time}</span></div>
                : <div>{
                    result.data &&　<div>
                      { user &&user.data &&user.data.nickname ==result.data.nickname && <img src={wonBg}/>}
                      <div className="f-fl">
                        获得者：<span className={styles.textBlue}>{result.data.nickname}</span>
                      </div>
                      <div className="f-fr">
                        幸运号码：{result.data.id}
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
            }
            {item.status ==0 &&
            <div className={'f-cb '+styles.won}>
              <div className="f-fl">
                <div className={styles.bar}>
                  <div className={styles.active} style={{width:(item.needNumber-item.surplusNumber)/item.needNumber*100+'%'}}></div>
                </div>
                <div className={"f-cb "+styles.going}>
                  总需: {item.needNumber}
                  <span className="f-fr">
                    剩余: <span className={styles.last}>{item.surplusNumber}</span>
                  </span>
                </div>
              </div>
              <div className="f-fr">
                <a className={styles.goodsBtn+' f-fr'} onClick={this.detailFunc.bind(this,item)}>追加</a>
              </div>
            </div>
            }
          </div>
        </div>
      </li>
    );
  }
  componentDidMount() {
    const {item} = this.props;
    if(item.status != 3){
      return;
    }
    this.countDownFunc()
  }
  componentWillUnmount(){
    // 解除倒计时
    window.cancelAnimationFrame(this.reqAni);
  }
}
