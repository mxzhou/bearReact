import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from '../../../redux/modules/mine/lucky';
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';
import Close from './Close';

@connect(
  state => ({result:state.lucky.data}),
  {load,loading,unloading})
export default class Lucky extends Component {

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
  render() {
    const {result,payType,payStatus,orderStatus} = this.props;
    console.log(result)
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
              {result && result.data && result.data.winLogList.map((item,index) =>
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
                      {orderStatus[item.orderStatus]}
                      {item.orderStatus == 0 && <Link to={'/mine/selectAddress/'+item.id} className={styles.goodsBtn+' f-fr'}>设置收货地址</Link>}
                      {item.orderStatus == 3 && <Link to={'/mine/selectAddress/'+item.id} className={styles.goodsBtn+' f-fr'}>查看物流</Link>}
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
    this.props.load({pageNumber:1,pageSize:10})
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

      if(result && result.data && result.data.winLogList.length>0){
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
    console.log('componentDidUpdate')
  }
}
