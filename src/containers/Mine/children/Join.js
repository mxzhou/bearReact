import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from '../../../redux/modules/mine/join';
import Close from './Close';
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';
import {slyFunc} from '../../../utils/sly'
import ApiClient from '../../../helpers/ApiClient'
import { loadToast,removeToast } from '../../../redux/modules/toast';

@connect(
  state => ({result:state.join.data}),
  {load,loading,unloading,loadToast})
export default class Join extends Component {

  static propTypes = {
    result:PropTypes.array
  };
  static defaultProps = {
    orderStatus:{
      '0':'恭喜您获得商品',
      '1':'等待奖品派发',
      '2':'奖品已派发',
      '3':'已发货',
      '5':'已晒单'
    },
    navList:[
      {name:'全部',type:0},
      {name:'进行中',type:3},
      {name:'已揭晓',type:5}
    ],
    activeIndex:0,
    result:[]
  }
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      activeIndex: props.activeIndex,
      result:props.result,
      bAdd:false,
      type:0,
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
    const {navList} =this.props;
    this.setState({
      bAdd:false
    })
    location.href="#/mine/join/"+navList[index].type
    this.fetchData({pageNumber:1,pageSize:20,type:navList[index].type})

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
    const {orderStatus,navList} = this.props;
    const {activeIndex,result} = this.state;
    const styles = require('../Mine.scss');
    const close = require('../../../../static/assets/ic_closepage.png')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          <ul className={styles.joinNav+' f-cb'}>
            {
              navList.map((item,index) =>
                <li key={index} className={(index == 2 ? '' : styles.rMargin) + ' '+(navList[index].type == this.props.params.id ? styles.active:' ')}>
                  <a onClick={this.changeType.bind(this,index)}>{item.name}</a>
                </li>)
            }
            <li></li>
          </ul>
        </h3>
        <div className="f-pr">
          <div id="frame" className={styles.frame}>
            <ul id="slidee" className="f-cb">
              {result.map((item,index) =>
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
                      <Link to={'/mine/joinDetail/'+item.id} className={styles.textBlue+' f-ib'}>查看夺宝号></Link>
                    </div>
                    <div className={styles.goodsStatus + ' f-cb'}>
                      {orderStatus[item.status]}
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
    const type = this.props.params.id;
    this.fetchData({pageNumber:1,pageSize:20,type:type})
  }
}
