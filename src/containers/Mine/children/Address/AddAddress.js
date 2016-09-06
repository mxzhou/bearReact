import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink,Link } from 'react-router';
import { load as loadMask,unload} from '../../../../redux/modules/mine/mask';
import marker from '../../../../../static/assets/btn_select.png'
import aMarker from '../../../../../static/assets/btn_select_a.png'
@connect(
  state => ({}),
  {loadMask,unload})

export default class Address extends Component {
  static propTypes = {
  };
  static defaultProps = {
    bSelect:true
  }
  // 构造器
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      bSelect:props.bSelect
    }
  }
  selectNum(index){
    this.setState({numIndex:index})
  }
  selectType(index){
    this.setState({typeIndex:index})

  }
  checkFunc(){
    this.setState({
      bSelect:!this.state.bSelect
    })
  }
  focusFunc(){
  }
  submitFunc(){
  }
  closeHandler(){
    history.back()
  }
  render() {
    const {numPayList,typePayList} = this.props
    const {bSelect} = this.state;

    const styles = require('../../Mine.scss')
    const back = require('../../../../../static/assets/ic_backpage.png')

    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Link to="/mine"><img src={back} className={styles.close} onClick={this.closeHandler.bind(this)}/></Link>
          添加收货地址
        </h3>
        <div className={styles.addressForm}>
          <div className={styles.control+' f-cb'}>
            <label className={styles.label}>收货人</label>
            <div className="f-fl">
              <input type="text" className={styles.formControl} placeholder="请使用真实姓名，长度不超过8个字"/>
            </div>
          </div>
          <div className={styles.control+' f-cb'}>
            <label className={styles.label}>手机号码</label>
            <div className="f-fl">
              <input type="text" className={styles.formControl} placeholder=""/>
            </div>
          </div>
          <div className={styles.control+' f-cb'}>
            <label className={styles.label}>所在地区</label>
            <div className="f-fl">
              <select className={'f-ib '+styles.selectControl}></select>
              <select className={'f-ib '+styles.selectControl}></select>
              <select className={'f-ib '+styles.selectControl}></select>
            </div>
          </div>
          <div className={styles.control+' f-cb'}>
            <label className={styles.label}>街道地址</label>
            <div className="f-fl">
              <textarea rows="2" type="text" className={styles.formControl} placeholder=""></textarea>
            </div>
          </div>
          <div className={styles.control+' f-cb'}>
            <div className={styles.offset}>
              <a className={styles.default} onClick={this.checkFunc.bind(this)}>
                <img src={bSelect ? aMarker:marker} className={styles.image}/>
                设置为默认收货地址
              </a>
            </div>
          </div>
        </div>
        <div className={styles.blockBtn}>
          <a className={styles.btn + ' '+styles.addressBtn} onClick={this.submitFunc.bind(this)}>保存</a>
        </div>
      </div>
    );
  }
  componentDidMount(){
    this.props.loadMask()
  }
}