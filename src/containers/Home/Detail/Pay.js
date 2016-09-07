import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { loadConsumeMoney } from '../../../redux/modules/consume';
import { loading,unloading } from '../../../redux/modules/loading';

import alipay from '../../../../static/assets/img_alipay.jpg'
import wechat from '../../../../static/assets/img_wechatpay.jpg'

@connect(
  state => ({result: state.consumeMoney.data}),
  {loadConsumeMoney, loading, unloading})
export default class Single extends Component {
  static propTypes = {
  	consumeMoney: PropTypes.object,
    money: PropTypes.object,
  };
  // porps 的默认值
  static defaultProps = {
    typeIndex:0,
    typePayList:[
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
      typeIndex:props.typeIndex
    }
  }
  render() {
    const {typePayList,result,money} = this.props
    const {typeIndex} = this.state;
    const styles = require('./Pay.scss');
    return (
    	<div className={styles.payBlock} id="payBlock">
	    	<div className={styles.title}>
	    		商品合计：<em>{money}</em>夺宝币
	    	</div>
	    	<div className={styles.consume}>
	    		{ result && 
	    			<span className={styles.fr}>余额：{result.data}夺宝币</span>
	    		}
		    	<span className="f-fl">余额支付：<em>4</em>夺宝币</span>
	    	</div>
	    	<div className={styles.otherPay}>
	    		<div className={styles.title}>其他支付方式：<em>32</em>夺宝币</div>
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

  }
  cancelPay () {
  	$('#payBlock').animate({top:600,opacity:0},300)
  	$('#btnBottomArea').animate({top: 452,opacity:1},300)
  }
  componentDidMount(){
    this.props.loading()
    this.props.loadConsumeMoney()
    $('#payBlock').css({opacity:0})
  }
  componentWillUnmount(){
    
  }
  selectType(index){
    this.setState({typeIndex:index})
  }
}
