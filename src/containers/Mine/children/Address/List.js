import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { IndexLink,Link } from 'react-router';
import Close from './../Close';
import { connect } from 'react-redux';
import {load} from '../../../../redux/modules/mine/addressList'
import { loading,unloading } from '../../../../redux/modules/loading';
import edit from '../../../../../static/assets/img_edit.png'
import marker from '../../../../../static/assets/btn_marker.png'
import aMarker from '../../../../../static/assets/btn_marker_a.png'
@connect(
  state => ({list: state.addressList.data}),
  {load,loading,unloading})
export default class List extends Component {
  static propTypes = {
    list:PropTypes.object
  };
  static defaultProps = {
  }
  // 构造器
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
    }
  }
  editFunc(obj){
    addressObject = obj;
    location.href="#/mine/editAddress/"+obj.id;
  }
  render() {
    const {list} = this.props
    const {} = this.state;
    const styles = require('../../Mine.scss')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          收货地址
          <Link className={'f-fr ' +styles.goodsBtn} to="/mine/addAddress">添加收货地址</Link>
        </h3>
        <ul className={styles.addressList}>
          {list && list.data.map((item,index)=>
            <li key={index} className={styles.item}>
              <div className={styles.desc+' f-cb'}>
                <span className={styles.name}>{item.receiver}</span>
                <span className={styles.phone}>{item.mobile}</span>
              </div>
              <div className={'f-cb'}>
                <div className={styles.aLeft}>
                  {item.ifDefault ? <span className={styles.default}>[默认]</span> :''}
                  {item.province+item.city+item.area+item.addressDetail}
                </div>
                <a className={styles.aRight} onClick={this.editFunc.bind(this,item)}>
                  编辑<img src={edit} className={styles.edit +' f-ib'}/>
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
  componentDidMount(){
    this.props.loading()
    this.props.load();

  }
  componentWillUpdate(){
    this.props.unloading()
  }
  componentDidUpdate() {
  }
}
