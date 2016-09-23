import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from '../../../redux/modules/mine/payRecord';
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';
import Close from './Close';
import {slyFunc} from '../../../utils/sly'

@connect(
  state => ({result:state.payRecord.data}),
  {load,loading,unloading})
export default class PayRecord extends Component {

  static propTypes = {
    result:PropTypes.object
  };
  static defaultProps = {
    payType:{
      1:'微信',
      2:'支付宝',
      3:'借记卡',
      4:'信用卡'
    },
    payStatus:{
      1:'已支付'
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
    const {result,payType,payStatus} = this.props;
    const styles = require('../Mine.scss');
    const close = require('../../../assets/ic_closepage.png')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          充值记录
        </h3>
        <div className="f-pr">
          <div id="frame" className={styles.frame+' scroll'}>
            {result && result.data &&
              <ul id="slidee" className="f-cb">
                {result.data.payLogList.map((item,index) =>
                  <li key={index} className={styles.paragraph +' '+styles.rechargeRecord+ ' f-cb'}>
                    <div className={styles.reLeft}>
                      <p className={styles.type}>{payType[item.payType]}</p>
                      <p className={styles.desc}>
                        {this.formData(item.createTime)}
                        <br/>
                        {payStatus[item.payStatus]}
                      </p>
                    </div>
                    <div className={styles.reRight}>
                      <p className={styles.money}>{item.money}元</p>
                    </div>
                  </li>
                )}
              </ul>
            }
            {result && result.data &&result.data.payLogList.length ==0 &&
              <div className={"errorMsg " + styles.payRecordMsg} >暂时还未有数据哦！</div>
            }
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    //this.props.loading()
    this.props.load({lastId:0,pageSize:10})
  }
  componentWillUpdate(){
    //this.props.unloading()
  }
  componentDidUpdate() {
    const {result,payType,payStatus} = this.props;
    if(result && result.data &&result.data.payLogList.length > 0){
      slyFunc({bLoadMore : false})
    }
  }
}
