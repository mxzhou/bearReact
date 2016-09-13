import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from '../../../redux/modules/mine/join';
import Close from './Close';
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';
import {slyFunc} from '../../../utils/sly'

@connect(
  state => ({result:state.join.data}),
  {load,loading,unloading})
export default class Intro extends Component {

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
  render() {
    const {result,payType,payStatus,orderStatus,navList} = this.props;
    const {activeIndex} = this.state;
    const styles = require('../Mine.scss');
    const close = require('../../../../static/assets/ic_closepage.png')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          夺宝说明
        </h3>
        <div className="f-pr">
          <div id="frame" className={styles.frame}>
            <ul id="slidee" className="f-cb">

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
    slyFunc({bLoadMore: false})
  }
}
