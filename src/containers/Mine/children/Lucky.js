import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from '../../../redux/modules/mine/lucky';
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';
import Close from './Close';
import {slyFunc} from '../../../utils/sly'
import ApiClient from '../../../helpers/ApiClient'
import { loadToast,removeToast } from '../../../redux/modules/toast';
import { load as loadHistory } from '../../../redux/modules/history';

@connect(
  state => ({result:state.lucky.data}),
  {load,loading,unloading,loadToast,loadHistory})
export default class Lucky extends Component {

  static propTypes = {
    result:PropTypes.array
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
    result:[]
  }
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      result:props.result,
      bAdd:false,
      lLeng:0,
      pageNumber:1
    }

  }
  domFunc(bLast = false){
    const {result} = this.state;

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
    const client = new ApiClient();
    const _this = this;
    // 异步获取数据 promise
    this.props.loading()
    client.post('/user/win/log',{data:data}).then(function(data) {
      _this.props.unloading()
      if(data.errorCode!=0){
        _this.props.loadToast(data.errorMessage)
        return;
      }

      var list,lLeng,bLast;
      if(_this.state.bAdd){
        list = _this.state.result.concat(data.data.winLogList);
        lLeng = parseInt(_this.state.result.length);
      }else{
        list = data.data.winLogList;
        lLeng = 0;
      }

      _this.setState({
        result:list,
        lLeng:lLeng
      })
      if(data.data.winLogList.length == 0){
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
  detailFunc(item){
    this.props.loadHistory('mine/lucky')
    location.href = '#/mine/detail/goods?id='+item.id+'&goodsId='+item.goodsId
  }
  stopPropagation(e){
    e.stopPropagation();
  }
  render() {
    const {orderStatus} = this.props;
    const {result} = this.state;
    const styles = require('../Mine.scss');
    const close = require('../../../../static/assets/ic_closepage.png')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
           幸运记录
        </h3>
        <div className="f-pr">
          <div id="frame" className={styles.frame}>
            <ul id="slidee" className="f-cb">
              {result && result.map((item,index) =>
                <li key={index} className={styles.paragraph +' '+styles.luckyList+ ' f-cb'}  onClick={this.detailFunc.bind(this,item)}>
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
                      <Link to={'/mine/joinDetail/'+item.id} className={styles.textBlue+' f-ib'} onClick={this.stopPropagation}>查看夺宝号></Link>
                    </div>
                    <div className={styles.goodsStatus + ' f-cb'}>
                      {orderStatus[item.orderStatus]}
                      {item.orderStatus == 0 && <Link to={'/mine/selectAddress/'+item.id} className={styles.goodsBtn+' f-fr'} onClick={this.stopPropagation}>设置收货地址</Link>}
                      {item.orderStatus == 3 && <Link to={'/mine/selectAddress/'+item.id} className={styles.goodsBtn+' f-fr'} onClick={this.stopPropagation}>查看物流</Link>}
                    </div>
                  </div>
                </li>
              )}
            </ul>
            {result.length==0 &&
              <div className={"errorMsg "+styles.payRecordMsg}>暂时还未有数据哦！</div>
            }
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
