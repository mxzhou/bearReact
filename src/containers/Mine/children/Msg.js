import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from '../../../redux/modules/mine/join';
import Close from './Close';
import { loading,unloading } from '../../../redux/modules/loading';
import { loadToast,removeToast } from '../../../redux/modules/toast';
import { Link } from 'react-router';
import {slyFunc} from '../../../utils/sly'
import ApiClient from '../../../helpers/ApiClient'
@connect(
  state => ({result:state.join.data}),
  {load,loading,unloading})
export default class Msg extends Component {

  static propTypes = {
    result:PropTypes.array
  };
  static defaultProps = {
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
      activeIndex: props.activeIndex,
      bAdd:false,
      result:[],
      lLeng:0,
      pageNumber:1
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
    setTimeout(()=>{
      this.fetchData({pageNumber:1,pageSize:20})
    },100)
  }
  domFunc(bLast = false){
    var _this = this;
    slyFunc(
      {
        loadMore: function () {
          _this.setState({
            bAdd: true,
            pageNumber:(_this.state.pageNumber+1)
          })
          _this.fetchData({pageNumber:_this.state.pageNumber,pageSize:20})
        },
        lLeng: this.state.lLeng,
        bLast: bLast
      })
    //function(){
    //  _this.fetchData({lastId:0,pageSize:10})
    //},
  }
  fetchData(data){
    const index = this.state.activeIndex;
    const url = index == 0 ? '/logisticsMessage/list' : '/sysMessage/list'
    const client = new ApiClient();
    const _this = this;
    // 异步获取数据 promise
    this.props.loading()
    client.post(url,{data:data}).then(function(data) {
      _this.props.unloading()
      if(data.errorCode!=0){
        _this.props.loadToast(data.errorMessage)
        return;
      }
      var list,lLeng,bLast;
      if(_this.state.bAdd){
        list = _this.state.result.concat(data.data.messageList);
        lLeng = parseInt(_this.state.result.length);
      }else{
        list = data.data.messageList;
        lLeng = 0;
      }
      _this.setState({
        result:list,
        lLeng:lLeng
      })
      if(data.data.messageList.length == 0){
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
    const {navList} = this.props;
    const {activeIndex,result} = this.state;
    const styles = require('../Mine.scss');
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
              {result && result.map((item,index) =>
              {return activeIndex == 0 ?
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
                    { item.sendType == 1 &&
                      <div>
                        <div className={styles.systemTitle}>
                          {item.title}<span className={styles.time}>今天</span>
                        </div>
                        <p className={styles.desc}>
                          亲爱的用户：<br/>
                          {item.sendDesc}
                        </p>
                      </div>
                    }
                    {item.sendType == 2 &&
                      <div>
                        <div className={styles.systemTitle}>
                          {item.title}<span className={styles.time}>今天</span>
                        </div>
                        <div className={styles.slucky}>
                          <img src={item.goodsImg}/>
                          <div className={styles.sendDesc}>{item.sendDesc}</div>
                        </div>
                      </div>
                    }
                    {
                      item.sendType == 3 &&
                      <div>
                        <div className={styles.systemTitle}>
                          {item.title}<span className={styles.time}>今天</span>
                        </div>
                        <p className={styles.desc}>
                          亲爱的用户：<br/>
                          {item.sendDesc}
                        </p>
                      </div>
                    }
                    {
                      item.sendType == 4 &&
                      <div>
                        <div className={styles.systemTitle}>
                          {item.title}<span className={styles.time}>今天</span>
                        </div>
                        <p className={styles.desc}>
                          亲爱的用户：<br/>
                          {item.sendDesc}
                        </p>
                      </div>
                    }
                  </li>
              }
              )}
            </ul>
          </div>
          <div className={"scrollbar " +styles.scroll} id="scrollbar">
            <div className="handle">
              <div className="mousearea"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.fetchData({pageNumber:1,pageSize:20})
  }
}
