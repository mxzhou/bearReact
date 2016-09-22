import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { IndexLink,Link } from 'react-router';
import Close from './Close';
import alipay from '../../../assets/img_alipay.jpg'
import wechat from '../../../assets/img_wechatpay.jpg'
import ApiClient from '../../../helpers/ApiClient'
import { loading,unloading } from '../../../redux/modules/loading';
import { loadToast,removeToast } from '../../../redux/modules/toast';
import {Alert} from '../../../components'
import { loadAlert,removeAlert } from '../../../redux/modules/alert';
import imgFail from '../../../assets/img_joinfail.png'
import imgSuccess from '../../../assets/img_joinsuccessed.png'
import {loadConsumeMoney } from '../../../redux/modules/mine/user';

import { connect } from 'react-redux';
@connect(
  state => ({}),
  {loading,unloading,loadToast,loadAlert,loadConsumeMoney})
export default class Recharge extends Component {
  static propTypes = {
  };
  static defaultProps = {
    numIndex:0,
    numPayList:[10,50,100,200,500,1000,2000],
    typeIndex:0,
    typePayList:[
      {img:wechat,text:'微信',type:1},
      {img:alipay,text:'支付宝',type:2},
      //{img:'',text:'储蓄卡',type:3},
      //{img:'',text:'信用卡',type:4}
    ],
    money:10,
    payObject:{},
    bSuccess:true,
    interval:10,
    bPay:false,
  }
  // 构造器
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      numIndex: props.numIndex,
      typeIndex:props.typeIndex,
      bWechat:false,
      payObject:props.payObject,
      money:props.money,
      bSuccess:props.bSuccess,
      interval:props.interval,
      bPay:props.bPay
    }
  }
  selectNum(index){
    this.setState({numIndex:index})
  }
  selectType(index){
    this.setState({typeIndex:index})

  }
  inputFunc(){
  }
  focusFunc(){
    this.setState({numIndex:this.props.numPayList.length+1})
  }
  submitFunc(){
    $('#btnGoPay').removeAttr('href target');
    const client = new ApiClient();
    const _this = this;
    // 异步获取数据 promise

    let val,type;
    const {numIndex,typeIndex} = this.state;
    const {numPayList,typePayList} = this.props;
    if(numIndex == this.props.numPayList.length+1){
      val = $(".j-input").val()
    }else{
      val = numPayList[numIndex];
    }
    type = typePayList[typeIndex].type;
    const data = {
      payType:type,
      money:val
    }
    if(val == ''){
      this.props.loadToast('金额不能为空！')
      return;
    }
    let reg = /^\d+(\.\d+)?$/g
    if(!reg.test(val)){
      this.props.loadToast('请输入数字！')
      return;
    }
    if(val<1){
      this.props.loadToast('最少充值1元！')
      return;
    }
    this.setState({money:val})
    this.props.loading()
    client.post('/pay/submit',{data:data}).then(function(data) {
      _this.props.unloading()
      if(data.errorCode!=0){
        _this.props.loadToast(data.errorMessage)
        return;
      }
      // 支付宝地址
      if(data.data && data.data.wapalipay != null){
        _this.setState({bWechat:true,payObject:data.data})
        $('#btnGoPay').attr({'href':encodeURI(data.data.twoUrl),'target':'_blank'})
        window.open(encodeURI(data.data.wapalipay));
      }
      // 微信二维码
      if(data.data && data.data.weChat != null){
        $('#btnGoPay').removeAttr('href target');
        _this.setState({bWechat:true,payObject:data.data})
      }
      // success
    }, function(value) {
      // failure
    });
  }
  render() {
    const {numPayList,typePayList} = this.props
    const {numIndex,typeIndex,bWechat,payObject,money,bSuccess,interval,bPay} = this.state;
    const styles = require('../Mine.scss')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          充值
        </h3>
        { !bWechat &&
          <div className={styles.blockRecharge}>
            <h3 className={styles.h3}>选择充值金额（元）</h3>
            <ul className={styles.ulList + ' f-cb'}>
              {numPayList.map((item,index)=>
                <li key={index} className={styles.item+(index == numIndex ? ' '+styles.active:'')}
                    onClick={this.selectNum.bind(this,index)}>
                  <a>{item}</a>
                </li>
              )}
              <li className={styles.item+(numIndex == (numPayList.length+1) ? ' '+styles.active:'')}>
                <input className={styles.input+' j-input'} onFocus ={this.focusFunc.bind(this)} onChange={this.changeFunc.bind(this)}/>
              </li>

            </ul>
            <h3 className={styles.h3}>选择支付方式</h3>
            <ul className={styles.ulList + ' f-cb'}>
              {typePayList.map((item,index)=>
                <li key={index} className={styles.item + ' '+styles.type+(index == typeIndex ? ' '+styles.active:'')}
                    onClick={this.selectType.bind(this,index)}>
                  <a>
                    {item.img == '' ? item.text : <img src={item.img}/>}
                  </a>
                </li>
              )}

            </ul>
            <div className={styles.blockBtn}>
              <a className={styles.btn+' '+styles.pay}  id="btnGoPay" onClick={this.submitFunc.bind(this)}>确认充值</a>
            </div>
          </div>
        }
        {
          bWechat && payObject &&
            <div>
              { bSuccess &&
                <Alert text={this.successContent()} btn1={'继续充值'} btn2={'查看充值记录'} onClose={this.onSuccessClose.bind(this)} onCancel={this.onSuccessCancel.bind(this)}/>
              }
              { !bSuccess &&
              <Alert text={this.failContent()} btn1={'支付成功'} btn2={'支付失败'} onClose={this.onFailClose.bind(this)} onCancel={this.onFailCancel.bind(this)}/>
              }
              { payObject.weChat !=null &&
                <div className={styles.payContent}>
                  <p className={styles.payTitle}>微信支付</p>
                  <p className={styles.payDesc}>请使用微信扫码完成付款</p>
                  <img  className={styles.payQrcode} src={payObject.weChat}/>
                  <p className={styles.payMoney}>
                    <em>{money}</em>元
                  </p>
                </div>
              }
              { payObject.weChat ==null &&
              <div className={styles.payContent}>
                <p className={styles.payTitle}>支付宝支付</p>
                <p className={styles.payDesc}>请使用支付宝完成付款</p>
                <p className={styles.payMoney}>
                  <em>{money}</em>元
                </p>
              </div>
              }
              <div className={styles.payFoot}>
                <a className={styles.button+' '+styles.single} onClick={this.paySuccess.bind(this)}>支付完成</a>
                <a className={styles.button}  onClick={this.payFailure.bind(this)}>取消</a>
              </div>
            </div>
        }
        {
          bPay &&
          <div className={styles.rechargeLast}>
            <div className={styles.mask}></div>
            <div className={styles.lastContent}>
              <div className={styles.content}>
                支付正在处理中...<br/>
                {interval}秒后确认支付结果
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
  changeFunc(e){
    let val = e.target.value
  }
  successContent(){
    const styles = require('../Mine.scss')
    return (
      <div className={styles.rechargeAlert}>
        <img src={imgSuccess} className={styles.successImg}/>
        <p className={styles.alertDesc}>支付成功</p>
      </div>
    )
  }
  failContent(){
    const styles = require('../Mine.scss')
    return (
      <div className={styles.rechargeAlert}>
        <img src={imgFail} className={styles.failImg}/>
        <p className={styles.alertDesc}>支付还未成功</p>
        <div className={styles.alertInro}>支付完成前请不要关闭此窗口。<br/>
          支付失败时，可以迅速联系客服<br/>
          400-9012-210</div>
      </div>
    )
  }
  onSuccessClose(){
    this.setState({
      numIndex: 0,
      typeIndex:0,
      bWechat:false,
      payObject:{},
      money:`0`,
      bSuccess:true
    })
  }
  onFailClose(){
    this.paySuccess()
  }
  onSuccessCancel(){
    location.href = "#/mine/payRecord"
  }
  onFailCancel(){
    this.payFailure()
  }
  paySuccess(){
    this.setState({interval:10,bPay:true});
    var _this = this;
    this.countDown = setInterval(()=>{
      if(_this.state.interval < 0 ){
        clearInterval(_this.countDown)
        return;
      }
      _this.getResult();
      _this.setState({interval:_this.state.interval - 1})
    },1000)
  }
  getResult(){
    const {payObject} = this.state;
    const client = new ApiClient();
    const _this = this;
    client.post('/pay/result/get',{data:{payOrderNo:payObject.payOrderNo}}).then(function(data) {
      if(data.data.payStatus == 1){
        _this.setState({bSuccess:true,bPay:false});
        clearInterval(this.countDown)
        _this.props.loadAlert();
        _this.props.loadConsumeMoney();
        return;
      }
      if(_this.state.interval == 0){
        _this.setState({bSuccess:false,bPay:false});
        clearInterval(_this.countDown)
        _this.props.loadAlert();
      }
    },function(){

    })
  }
  payFailure(){
    this.setState({
      numIndex: 0,
      typeIndex:0,
      bWechat:false,
      payObject:{},
      money:0,
      bSuccess:true,
      bPay:false
    })
  }
}
