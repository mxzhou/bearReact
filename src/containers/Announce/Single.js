import React, { Component,PropTypes } from 'react';
import ApiClient from '../../helpers/ApiClient'
import { load } from '../../redux/modules/history';
import { connect } from 'react-redux';
import { loadToast,removeToast } from '../../redux/modules/toast';

@connect(
  state => ({}),
  {load,loadToast})
export default class Single extends Component {
  static propTypes = {
    item: PropTypes.object,
    result: PropTypes.object,
  };
  // porps 的默认值
  static defaultProps = {
    time: 0,
    result:{},
    imgShow:true,

  }
  // 构造器
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
    const {item,servertime} = this.props;

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
  formatDate(servertime,openTime){
    function intNumber(n){
      return n < 10 ? '0'+n:n;
    }
    var servertime = servertime;
    var date = openTime;
    var st = new Date(Number(servertime));
    var dt = new Date(Number(date));
    if(st.getFullYear()==dt.getFullYear() && st.getMonth()==dt.getMonth() && st.getDate()==dt.getDate()){
      return '今天'+intNumber(dt.getHours())+":"+intNumber(dt.getMinutes());
    }else {
      return dt.getFullYear()+'-'+(dt.getMonth()+1)+'-'+dt.getDate()+' '+intNumber(dt.getHours())+":"+intNumber(dt.getMinutes());
    }
  }
  detailFunc(item){
    this.props.load('announce')
    location.href = '#/announce/detail/goods?id='+item.id+'&goodsId='+item.goodsId
  }
  render() {
    const {item,index,servertime} = this.props;
    const {time,result,imgShow} = this.state;
    const styles = require('./Announce.scss');
    const label = require('../../assets/img_lable.png')
    return (
      <li className={styles.item + (index%2 != 0 ? (' '+styles.even):'')} onClick={this.detailFunc.bind(this,item)}>
        <div className={styles.left}>
          <img src={item.coverImgUrl} className={styles.coverImg}/>
        </div>
        <div className={styles.right}>
          <p title={item.goodsName} className={styles.name + ' f-pre'}>{item.goodsName}</p>
          {/*已揭晓*/}
          {item.status==5 &&
            <p className={styles.p}>
              <span className={styles.blue}>{item.nickname}</span> 获得该奖品<br/>
              幸运号码：{item.winCode}<br/>
              本期参与：{item.joinNumber}<br/>
              揭晓时间：{this.formatDate(servertime,item.openTime)}<br/>
            </p>
          }
          {/*未揭晓*/}
          {item.status==3 &&
            <div>
              {imgShow ?
                <div>
                  <img src={label} className={styles.label} alt=""/>
                  <p className={styles.p}>
                    总需：{item.needNumber}<br/>
                    期号：{item.id}<br/>
                  </p>
                  <div className='f-cb'>
                    <div className={styles.btn + ' f-fr'}><p className={styles.time}>{time}</p></div>
                  </div>
                </div> :
                <div>
                  {
                    result.data &&　<p className={styles.p}>
                      <span className={styles.blue}>{result.data.nickname}</span> 获得该奖品<br/>
                      幸运号码：{result.data.joinCode}<br/>
                      本期参与：{result.data.joinNumber}<br/>
                      揭晓时间：{this.formatDate(result.servertime,result.data.openTime)}<br/>
                    </p>
                  }
                </div>
              }

            </div>
          }
        </div>
      </li>
    );
  }
  componentDidMount(){
    const {item} = this.props;
    if(item.status == 5){
      return;
    }
    this.countDownFunc()
  }
  componentWillUnmount(){
    // 解除倒计时
    window.cancelAnimationFrame(this.reqAni);
  }
}
