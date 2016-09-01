import React, { Component,PropTypes } from 'react';
import ApiClient from '../../helpers/ApiClient'

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
  static propTypes = {
    item: PropTypes.object,
  };
  countDownFunc(){
    const {item,servertime} = this.props;
    var times = item.startTime+60*1000-servertime;

    var timeTemp,                         // 临时时间
      remain_msec = 0,                    // mm
      remain_ssec = 0,                    // mm
      remain_sec = 0,                     // 秒
      remain_minute = 0,                  // 分钟
      remain_hour = 0,                    // 小时
      timetag = Date.now(),               // 上一帧的时间
      hour = 0,                           // 最终显示小时
      min = 0,                            // 最终显示分钟
      sec = 0,                            // 最终显示秒
      ssec = 0,
      msec = 0;
    var count =()=>{
      timeTemp = parseInt(times/10);
      remain_ssec = timeTemp % 10;

      timeTemp = parseInt(timeTemp / 10);
      remain_msec = timeTemp % 10;

      timeTemp = parseInt(timeTemp / 10);
      // 秒数
      remain_sec = timeTemp % 60;
      timeTemp = parseInt(timeTemp / 60);
      // 分数
      remain_minute = timeTemp % 60;
      timeTemp = parseInt(timeTemp / 60);
      // 小时数
      remain_hour = timeTemp % 24;
      timeTemp = parseInt(timeTemp / 24);
    }

    count();

    var begin = ()=>{
      var minus = Date.now() - timetag;
      if ((minus) >= 10) {
        times = times - minus;
        count()
        //   当时间结束后倒计时停止
        if ((remain_minute <= 0) && (remain_sec <= 0) && (remain_hour <= 0)) {
          remain_minute = remain_sec = remain_hour = 0;
          this.setState({time: '正在开奖'});
          const client = new ApiClient();
          const _this = this;
          // 异步获取数据 promise
          client.post('/goods/win').then(function(data) {
            _this.setState({imgShow:!_this.state.imgShow});
            _this.setState({result:data});
            // success
          }, function(value) {
            // failure
          });
          //
          //_this.$http.post('/api/goods/win',{aaa:1}).then((response) => {
          //  _this.$set('items', response.data);
          //  _this.$set('show', false);
          //}, (response) => {
          //  // error callback
          //});
          return;
        }
        timetag = Date.now();
      }
      // 以下部分做为时间显示时补零
      if (remain_hour < 10) {
        hour = '0' + remain_hour;
      } else {
        hour = remain_hour;
      }
      if (remain_minute < 10) {
        min = '0' + remain_minute;
      } else {
        min = remain_minute;
      }
      if (remain_sec < 10) {
        sec = '0' + remain_sec;
      } else {
        sec = remain_sec;
      }
      ssec = remain_ssec
      msec = remain_msec


      this.setState({time: min + ':' + sec + ':' + msec+ssec});
      window.requestAnimationFrame(begin);
    }
    window.requestAnimationFrame(begin);
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
  render() {
    const {item,index,servertime} = this.props;
    const {time,result,imgShow} = this.state;
    const styles = require('./Announce.scss');
    const label = require('../../../static/assets/img_lable.png')
    return (
      <li className={styles.item + (index%2 != 0 ? (' '+styles.even):'')}>
        <div className={styles.left}>
          <img src={item.coverImgUrl} className={styles.coverImg}/>
        </div>
        <div className={styles.right}>
          <p title={item.goodsName} className={styles.name + ' f-pre'}>{item.goodsName}</p>
          {/*已揭晓*/}
          {item.status==5 &&
            <p className={styles.p}>
              <span className={styles.blue}>{item.nickname}</span> 获得该奖品<br/>
              幸运号码：{item.id}<br/>
              本期参与：{item.winnerJoinNumber}<br/>
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
                      幸运号码：{result.data.id}<br/>
                      本期参与：{result.data.winnerJoinNumber}<br/>
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
}
