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
export default class Join extends Component {

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
      {name:'全部'},
      {name:'进行中'},
      {name:'已揭晓'}
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
          </ul>        </h3>
        <div className="f-pr">
          <div id="frame" className={styles.frame}>
            <ul id="slidee" className="f-cb">
              {result && result.data && result.data.buyLogList.map((item,index) =>
                <li key={index} className={styles.paragraph +' '+styles.luckyList+ ' f-cb'}>
                  <div className={styles.luckyLeft}>
                    <img src={item.coverImgUrl} className={styles.coverImg}/>
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
                      <a className={styles.textBlue+' f-ib'}>查看夺宝号></a>
                    </div>
                    <div className={styles.goodsStatus + ' f-cb'}>
                      {orderStatus[item.status]}
                      <a className={styles.goodsBtn+' f-fr'}>设置收货地址</a>
                    </div>
                  </div>
                </li>
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
