import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from '../../../redux/modules/mine/join';
import Close from './Close';
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';

@connect(
  state => ({result:state.join.data}),
  {load,loading,unloading})
export default class Msg extends Component {

  static propTypes = {
    result:PropTypes.object
  };
  static defaultProps = {
    payType:{
      1:'微信',
      2:'支付宝'
    },
    payStatus:{
      1:'已支付'
    },
    orderStatus:{
      '0':'恭喜您获得商品',
      '1':'等待奖品派发',
      '2':'奖品已派发',
      '3':'已发货',
      '5':'已晒单'
    },
    navList:[
      {name:'物流信息'},
      {name:'系统信息'},
    ],
    activeIndex:0
  }
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      activeIndex: props.activeIndex
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
  changeType(index){
    this.setState({activeIndex:index})
    this.props.loading()
    this.props.load()
  }
  domFunc(bLast = false){
    const {result} = this.state;
    const type = this.props.params.id;

    var _this = this;
    slyFunc(
      {
        loadMore: function () {
          _this.setState({
            bAdd: true,
            pageNumber:(_this.state.pageNumber+1)
          })
          _this.fetchData({pageNumber:_this.state.pageNumber,pageSize:20,type:type})
        },
        lLeng: this.state.lLeng,
        bLast: bLast
      })
    //function(){
    //  _this.fetchData({lastId:0,pageSize:10})
    //},
  }
  fetchData(data){
    const client = new ApiClient();
    const _this = this;
    // 异步获取数据 promise
    this.props.loading()
    client.post('/user/buyLog/list',{data:data}).then(function(data) {
      _this.props.unloading()
      if(data.errorCode!=0){
        _this.props.loadToast(data.errorMessage)
        return;
      }
      var list,lLeng,bLast;
      if(_this.state.bAdd){
        list = _this.state.result.concat(data.data.buyLogList);
        lLeng = parseInt(_this.state.result.length);
      }else{
        list = data.data.buyLogList;
        lLeng = 0;
      }
      _this.setState({
        result:list,
        lLeng:lLeng
      })
      if(data.data.buyLogList.length == 0){
        bLast = true
      }else{
        bLast = false
      }
      _this.domFunc(bLast)
      // success
    }, function(value) {
      // failure
    });
  }
  render() {
    const {result,payType,payStatus,orderStatus,navList} = this.props;
    const {activeIndex} = this.state;
    const styles = require('../Mine.scss');
    const close = require('../../../../static/assets/ic_closepage.png')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          <ul className={styles.joinNav+' f-cb'}>
            {
              navList.map((item,index) =>
                <li key={index} className={(index == 2 ? '' : styles.rMargin) + ' '+(index == activeIndex ? styles.active:' ')}>
                  <a onClick={this.changeType.bind(this,index)}>{item.name}</a>
                </li>)
            }
            <li></li>
          </ul>
        </h3>
        <div className="f-pr">
          <div id="frame" className={styles.frame}>
            <ul id="slidee" className="f-cb">
              {result && result.data && result.data.buyLogList.map((item,index) =>
              {  return activeIndex == 0 ?
                <li key={index} className={styles.paragraph +' '+styles.luckyList+ ' f-cb'}>
                  <div className={styles.luckyLeft}>
                    <img src={item.coverImgUrl} className={styles.coverImg}/>
                  </div>
                  <div className={styles.luckyRight}>
                    <div className={styles.logic+' f-cb'}>
                      <span className={styles.name}>外星人 15.6 英寸游戏本</span>
                      <span className={' f-fr'}>2016-01-12 18:23</span>
                    </div>
                    <p className={styles.logicDesc}>
                      您中奖的商品“（第12345期）外星人 15.6 英寸游戏本”已经发货，请耐心等待哦！
                    </p>
                  </div>
                </li> :
                <li key={index} className={styles.paragraph +' '+styles.system+ ' f-cb'}>
                  <div className={styles.systemTitle}>
                    9月23号凌晨服务器升级公告<span className={styles.time}>今天</span>
                  </div>
                  <p className={styles.desc}>
                    亲爱的用户：<br/>
                    为给广大用户提供更顺畅的夺宝体验，9月23日凌晨2:00，我们将对服务器进行全面升级。届时零钱夺宝将对服务器进行停机维护，预计时间为1月3日9…
                  </p>
                </li>
              }
              )}
            </ul>
          </div>
          <div className={"scrollbar " +styles.scroll}>
            <div className="handle">
              <div className="mousearea"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.loading()
    this.props.load()
  }
  componentWillUpdate(){
    this.props.unloading()
  }
  componentDidUpdate() {
    require('../../../utils/plugin')
    require('../../../utils/jquery.sly')
    setTimeout(() =>{
      var $frame  = $('#frame'),
        $slidee = $('#slidee'),
        $wrap = $frame.parent(),
        result = this.props.result;
      if(result && result.data && result.data.buyLogList.length>0){
        $frame.sly({
          slidee:$slidee,
          itemNav: 'basic',
          smart: 2,
          mouseDragging: 1,
          touchDragging: 1,
          releaseSwing: 1,
          startAt: 0,
          scrollBar: $wrap.find('.scrollbar'),
          scrollBy: 2,
          speed: 300,
          elasticBounds: 1,
          easing: 'easeOutExpo',
          dragHandle: 1
        });
      }
    },500)
  }
}
