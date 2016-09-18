import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadConsumeMoney } from '../../../redux/modules/consume';
import { paySubmit } from '../../../redux/modules/pay';
import { loading,unloading } from '../../../redux/modules/loading';
import ApiClient from '../../../helpers/ApiClient'

import alipay from '../../../assets/img_alipay.jpg'
import wechat from '../../../assets/img_wechatpay.jpg'

@connect(
  state => ({result: state.consumeMoney.data}),
  {loadConsumeMoney, paySubmit, loading, unloading})
export default class Pay extends Component {
  static propTypes = {
    consumeMoney: PropTypes.number,
    money: PropTypes.number,
    goodsId: PropTypes.number,
    robId: PropTypes.number,
    loadData: PropTypes.func,
  };
  // porps 的默认值
  static defaultProps = {
    typeIndex: 0,
    useConsume: false,
    otherPayMoney: 0,
    useConsumeMoney: 0,
    typePayList: [
      {img:wechat,text:'微信',type:1},
      {img:alipay,text:'支付宝',type:2},
      {img:'',text:'储蓄卡',type:3},
      {img:'',text:'信用卡',type:4}
    ]
  }
  // 构造器
  constructor(props, context) {
    super(props, context);
    this.state = {
      hasInitData: false,
      otherPayMoney: props.otherPayMoney,
      consumeMoney: props.consumeMoney,
      useConsume: props.useConsume,
      typeIndex: props.typeIndex,
      useConsumeMoney: props.useConsumeMoney,
    }
  }
  render() {
    const {typePayList,result,money} = this.props
    const {typeIndex,useConsume,useConsumeMoney,consumeMoney,otherPayMoney} = this.state;
    const styles = require('./Pay.scss');
    return (
    	<div className={styles.payBlock} id="payBlock">
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
                	<a className={styles.btn} onClick={this.goPay.bind(this)}>立即支付</a>
                	<a onClick={this.cancelPay.bind(this)}>取消支付</a>
		        </div>
	    	</div>
    	</div>
    );
  }
  goPay () {
    let money = this.props.money
    let data = {
      consumeCost: money,
      otherPayType: 0,
      goodsList:[{goodsId:this.props.goodsId,total:money,robId:this.props.robId}]
    }
    const client = new ApiClient();
    const _this = this;
    // 异步获取数据 promise
    client.post('/cart/submit',{data:data}).then(function(data) {
      if(data.status==1){
        _this.props.loadData()
        $('#payBlock').animate({top:600,opacity:0},300)
        $('#btnBottomArea').animate({top: 452,opacity:1},300)
      }
    }, function(value) {
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
  	$('#payBlock').animate({top:600,opacity:0},300)
  	$('#btnBottomArea').animate({top: 452,opacity:1},300)
  }
  componentDidMount(){
    this.props.loading()
    this.props.loadConsumeMoney({id:1})
    $('#payBlock').css({opacity:0})
    this.setState({typeIndex:-1})
  }
  componentWillMount () {

  }
  componentDidUpdate () {
    let money = this.props.money
    if(this.props.result && !this.state.hasInitData){
      let consume = this.props.result.data
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

  }
  updateMoney () {

  }
  selectType(index){
    let consume = this.state.consumeMoney
    let money = this.props.money
    let typeIndex = this.state.typeIndex
    if(index == typeIndex){
      if(consume>=this.props.money){
        this.setState({typeIndex:-1,useConsumeMoney:money,useConsume:true,otherPayMoney:0})
      }else{
        if(consume!=0){
          this.setState({typeIndex:typeIndex,useConsumeMoney:money,useConsume:true,otherPayMoney:(money-consume)})
        }else{
          this.setState({typeIndex:typeIndex,useConsumeMoney:0,useConsume:false,otherPayMoney:money})
        }
      }
    }else{
      if(consume>=this.props.money){
        this.setState({typeIndex:index,useConsumeMoney:0,useConsume:false,otherPayMoney:money})
      }else{
        if(consume!=0){
          this.setState({typeIndex:index,useConsumeMoney:money,useConsume:true,otherPayMoney:(money-consume)})
        }else{
          this.setState({typeIndex:index,useConsumeMoney:0,useConsume:false,otherPayMoney:money})
        }
      }
    }
  }
}
