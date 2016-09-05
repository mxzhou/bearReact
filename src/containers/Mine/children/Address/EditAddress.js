import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { IndexLink,Link } from 'react-router';
import Close from './../Close';
import alipay from '../../../../../static/assets/img_alipay.jpg'
import wechat from '../../../../../static/assets/img_wechatpay.jpg'

export default class Address extends Component {
  static propTypes = {
  };
  static defaultProps = {
    numIndex:0,
    numPayList:[10,50,100,200,500,1000,2000],
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

    // 在这里设置初始出台
    this.state = {
      numIndex: props.numIndex,
      typeIndex:props.typeIndex
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
    let val,type;
    const {numIndex,typeIndex} = this.state;
    const {numPayList,typePayList} = this.props;
    if(numIndex == this.props.numPayList.length+1){
      val = $(".j-input").val()
    }else{
      val = numPayList[numIndex];
    }
    type = typePayList[typeIndex].type;
    alert(0)
    alert(val+':'+type)
  }
  render() {
    const {numPayList,typePayList} = this.props
    const {numIndex,typeIndex} = this.state;
    const styles = require('../../Mine.scss')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          充值
        </h3>
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
              <input className={styles.input+' j-input'} onFocus ={this.focusFunc.bind(this)}/>
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
            <a className={styles.payBtn} onClick={this.submitFunc.bind(this)}>确认充值</a>
          </div>
        </div>
      </div>
    );
  }
}
