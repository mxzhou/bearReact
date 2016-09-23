import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadConsumeMoney } from '../../../redux/modules/consume';
import { paySubmit } from '../../../redux/modules/pay';
import { loading,unloading } from '../../../redux/modules/loading';
import ApiClient from '../../../helpers/ApiClient'
import { loadToast,removeToast } from '../../../redux/modules/toast';

import alipay from '../../../assets/img_alipay.jpg'
import wechat from '../../../assets/img_wechatpay.jpg'

@connect(
  state => ({result: state.consumeMoney.data}),
  {loadConsumeMoney, paySubmit, loading, unloading,loadToast})
export default class Pay extends Component {
  static propTypes = {
    consumeMoney: PropTypes.number,
    money: PropTypes.number,
    goodsId: PropTypes.number,
    robId: PropTypes.number,
    loadData: PropTypes.func,
    updateComponent: PropTypes.func,
  };
  // porps 的默认值
  static defaultProps = {
    typeIndex: 0,
    useConsume: false,
    otherPayMoney: 0,
    useConsumeMoney: 0,
    orderNo: 0,
    checkResult: 0,
    showPayResult: false,
    showPayProgress: false,
    typePayList: [
      {img:wechat,text:'微信',type:1},
      {img:alipay,text:'支付宝',type:2},
    ]
  }
  // 构造器
  constructor(props, context) {
    super(props, context);
    this.state = {
      hasInitData: false,
      money: props.money,
      orderNo: props.orderNo,
      otherPayMoney: props.otherPayMoney,
      consumeMoney: props.consumeMoney,
      useConsume: props.useConsume,
      typeIndex: props.typeIndex,
      useConsumeMoney: props.useConsumeMoney,
      showPayResult: props.showPayResult,
      showPayProgress: props.showPayProgress,
      checkResult: props.checkResult,
    }
  }
  render() {
    const {typePayList,result,money} = this.props
    const {typeIndex,useConsume,useConsumeMoney,consumeMoney,otherPayMoney,showPayResult,showPayProgress,checkResult} = this.state;
    const styles = require('./Pay.scss');
    return (
      <div>
      	<div className={styles.payBlock} id="payBlock">
          <div className={styles.paySelect} id="paySelect">
    	    	<div className={styles.title}>
    	    		商品合计：<em>{money}</em>夺宝币
    	    	</div>
    	    	<div className={styles.consume}>
    	    		<span className={styles.fr}>余额：{consumeMoney}夺宝币</span>
              <span className="f-fl"><i className={styles.btnCheck+' '+ (useConsume ? styles.active:'')} onClick={this.selectConsume.bind(this)}></i>
              余额支付：<em>{useConsumeMoney}</em>夺宝币</span>
    	    	</div>
    	    	<div className={styles.otherPay}>
    	    		<div className={styles.title}>其他支付方式：<em>{otherPayMoney}</em>夺宝币</div>
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
    		        <div className={styles.btnBottom}>
                    	<a className={styles.btn} id="btnGoPay" onClick={this.goPay.bind(this)}>立即支付</a>
                    	<a onClick={this.cancelPay.bind(this)}>取消支付</a>
    		        </div>
    	    	</div>
          </div>
          <div className={styles.payCode} id="payCode">
            <a className={styles.btnBack} onClick={this.backSelectCode.bind(this)}>&lt;上一步</a>
            <h3 className={styles.qtitle}>微信支付</h3>
            <p className={styles.desc}>请使用微信扫码完成付款</p>
            <div className={styles.codeImg}><img id="codeImg"/></div>
            <div className={styles.payNum}><em>{otherPayMoney}</em>元</div>
            <div className={styles.btnBottom}>
                <a className={styles.btn} onClick={this.goPayCodeSuccess.bind(this,event)}>支付成功</a>
                <a className={styles.btn + ' ' +styles.normal} onClick={this.goPayCodeFail.bind(this)}>支付失败</a>
            </div>
          </div>
      	</div>
        <div style={{display:showPayResult?"block":"none"}}>
          <div className={styles.mask}></div>
          <div className={styles.content}>
            <div className={styles.result}>
              <div style={{display:checkResult==1?"block":"none"}}>
                <div className={styles.imgResult}></div>
                <h3>支付成功</h3>
                <p>请等待系统为您揭晓</p>
                <div className={styles.btnBottom}>
                  <a className={styles.btn} onClick={this.goHome.bind(this)}>继续夺宝</a>
                  <a className={styles.btn + ' ' +styles.normal} onClick={this.cancelPay.bind(this)}>查看夺宝详情</a>
                </div>
              </div>
              <div style={{display:checkResult==3?"block":"none"}}>
                <div className={styles.imgResultFail} style={{marginTop:'10px'}}></div>
                <h3>支付还未完成</h3>
                <p>支付完成前请不要关闭此窗口。<br/>支付失败时，可以迅速联系客服<br/>400-9012-210</p>
                <div className={styles.btnBottom}>
                  <a className={styles.btn} onClick={this.goPayCodeSuccess.bind(this)}>支付成功</a>
                  <a className={styles.btn + ' ' +styles.normal} onClick={this.backPay.bind(this)}>支付失败</a>
                </div>
              </div>
              <div style={{display:checkResult==2?"block":"none"}}>
                <div className={styles.imgResultFail}></div>
                <h3>支付失败</h3>
                <p>请重新支付</p>
                <div className={styles.btnBottom}>
                  <a className={styles.btn} onClick={this.goHome.bind(this)}>继续夺宝</a>
                  <a className={styles.btn + ' ' +styles.normal} onClick={this.backPay.bind(this)}>返回</a>
                </div>
              </div>
              <div style={{display:checkResult==0?"block":"none",marginTop:'90px'}}>
                <p style={{paddingBottom:'55px'}}>查询支付结果中...</p>
                <div className={styles.btnBottom}>
                  <a className={styles.btn} href="http://www.baidu.com" target="_blank" onClick={this.goHome.bind(this)}>继续夺宝</a>
                  <a className={styles.btn + ' ' +styles.normal} onClick={this.backPay.bind(this)}>返回</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  goHome () {
    location.href = '#/';
  }
  backPay () {
    this.setState({showPayResult:false})
  }
  goPayCodeSuccess () {
    const client = new ApiClient();
    const _this = this;
    this.setState({showPayResult:true,checkResult:0});
    _this.getPayCount++    
    client.post('/cart/pay',{data:{payOrderNo:this.state.orderNo}}).then(function(data) {
      if(data.status==1){
        let payStatus = data.data.payStatus
        if(payStatus==1){
          //支付成功但是剩余购买数不足，钱充到余额
          if(data.data.successList.length!=0){            
            _this.props.loadData()
            _this.setState({checkResult:1});
          }else{
            _this.props.loadToast('剩余购买数不足，钱已充至余额')
            _this.setState({showPayResult:false});
          }
        }else if(payStatus==2){
          _this.setState({checkResult:2});          
        }else if(payStatus==-1){
          _this.setState({checkResult:2});          
        }else{
          if(_this.state.showPayResult && _this.getPayCount<=5){
            setTimeout(function(){
              _this.goPayCodeSuccess()
            },1000)
          }else {
            _this.setState({checkResult:2});   
          }
        }
      }else{
      }
    }, function(value) {
        _this.setState({checkResult:2});
    });
  }
  goPayCodeFail () {
    $('#paySelect').show();
    $('#payCode').hide();
  }
  backSelectCode () {
    $('#paySelect').show();
    $('#payCode').hide();
    $('#codeImg').hide();
  }
  goPay (e) {    
    if(this.loading){ return }
    let money = this.props.money
    let typeIndex = this.state.typeIndex
    if(typeIndex==1){
      return;
    }
    this.getPayCount = 0
    let data = {
      consumeCost: this.state.useConsumeMoney,
      otherPayType: typeIndex+1,
      redEnvelopeId: 0,
      source: 'kugou_live',
      goodsList: [{goodsId:this.props.goodsId,total:money,robId:this.props.robId}]
    }
    const client = new ApiClient();
    const _this = this;

    $('#codeImg').hide();
    //this.props.loading()
    this.loading = true
    client.post('/cart/submit',{data:data}).then(function(data) {
      _this.loading = false
      //_this.props.unloading()
      _this.props.updateComponent()
      if(data.status==1){
        _this.setState({orderNo:data.data.orderNo});
        if(typeIndex==-1){
          _this.props.loadData()
          $('#payBlock').animate({top:570,opacity:0},300)
          $('#btnBottomArea').animate({top: 422,opacity:1},300)
          _this.props.loadToast('购买成功')
        }
        if(typeIndex==0){
          $('#paySelect').hide();
          $('#payCode').show();
          $('#codeImg').attr('src',data.data.twoUrl).show();
        }
        if(typeIndex==1){
          _this.setState({showPayResult:true,checkResult:3});
          $('#btnGoPay').attr({'href':encodeURI(data.data.twoUrl),'target':'_blank'})
          //window.open(encodeURI(data.data.twoUrl))
        }
      }
    }, function(value) {
      //_this.props.unloading()
      _this.loading = false
    });

  }
  selectConsume () {
    let consume = this.state.consumeMoney
    let money = this.props.money
    if(this.state.useConsume){
        this.setState({useConsume:false,useConsumeMoney:0,otherPayMoney:money,typeIndex:0})
    }else{
      if(consume==0){
        this.setState({useConsume:false,useConsumeMoney:0})
      }else{
        if(consume>=money){
          this.setState({useConsume:true,useConsumeMoney:money,otherPayMoney:0,typeIndex:-1})
        }else{
          this.setState({useConsume:true,useConsumeMoney:consume,otherPayMoney:(money-consume),typeIndex:0})
        }
      }
    }
  }
  cancelPay () {
    $('#btnGoPay').removeAttr('href target');
    $('#codeImg').hide();
  	$('#payBlock').animate({top:570,opacity:0},300)
  	$('#btnBottomArea').animate({top: 422,opacity:1},300)
    this.setState({typeIndex:-1,money:0,otherPayMoney:0,showPayResult:false})
  }
  componentDidMount(){
    //this.props.loading()
    this.props.loadConsumeMoney({id:1})
    $('#payBlock').css({opacity:0})
    this.setState({typeIndex:-1,money:0})
  }
  componentWillMount () {

  }
  componentDidUpdate () {
    let money = this.props.money
    if(this.props.result && money!=this.state.money){
      let consume = this.props.result.data
      this.setState({money:money})
      if(consume>=money){
        this.setState({consumeMoney:consume,hasInitData:true,typeIndex:-1,useConsumeMoney:money,useConsume:true})
      }else{
        if(consume!=0){
          this.setState({consumeMoney:consume,hasInitData:true,typeIndex:0,useConsumeMoney:money,useConsume:true,otherPayMoney:(money-consume)})
        }else{
          this.setState({consumeMoney:consume,hasInitData:true,typeIndex:0,useConsume:false,otherPayMoney:money})
        }
      }
    }
  }

  componentWillUnmount(){
    this.setState({showPayResult:false})
    $('#btnGoPay').removeAttr('href target');
  }
  updateMoney () {

  }
  selectType(index){
    let consume = this.state.consumeMoney
    let money = this.props.money
    let typeIndex = this.state.typeIndex
    let useConsumeMoney = 0
    if(index == typeIndex){
      if(consume>=this.props.money){
        useConsumeMoney = money
        this.setState({typeIndex:-1,useConsumeMoney:money,useConsume:true,otherPayMoney:0})
      }else{
        if(consume!=0){
          useConsumeMoney = money
          this.setState({typeIndex:typeIndex,useConsumeMoney:money,useConsume:true,otherPayMoney:(money-consume)})
        }else{
          useConsumeMoney = 0
          this.setState({typeIndex:typeIndex,useConsumeMoney:0,useConsume:false,otherPayMoney:money})
        }
      }
    }else{
      if(consume>=this.props.money){
        useConsumeMoney = 0
        this.setState({typeIndex:index,useConsumeMoney:0,useConsume:false,otherPayMoney:money})
      }else{
        if(consume!=0){
          useConsumeMoney = money
          this.setState({typeIndex:index,useConsumeMoney:money,useConsume:true,otherPayMoney:(money-consume)})
        }else{
          useConsumeMoney = 0
          this.setState({typeIndex:index,useConsumeMoney:0,useConsume:false,otherPayMoney:money})
        }
      }
    }
    if(index == 1 && index != typeIndex){
      let data = {
        consumeCost: useConsumeMoney,
        otherPayType: 2,
        redEnvelopeId: 0,
        source: 'kugou_live',
        goodsList: [{goodsId:this.props.goodsId,total:money,robId:this.props.robId}]
      }
      const client = new ApiClient();
      const _this = this;
      //this.props.loading()
      _this.loading = true
      client.post('/cart/submit',{data:data}).then(function(data) {
        _this.loading = false
        //_this.props.unloading()
        _this.props.updateComponent()
        if(data.status==1){
          _this.setState({orderNo:data.data.orderNo});
          $('#btnGoPay').attr({'href':encodeURI(data.data.twoUrl),'target':'_blank'})
        }
      }, function(value) {
        //_this.props.unloading()
        _this.loading = false
      });
    }else{
      $('#btnGoPay').removeAttr('href target');
    }
  }
}
