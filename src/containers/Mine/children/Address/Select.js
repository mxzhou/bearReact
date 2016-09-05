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
export default class Select extends Component {
  static propTypes = {
    list:PropTypes.object
  };
  static defaultProps = {
    index:0
  }
  // 构造器
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      index:props.index
    }
  }
  selectFunc(index){
    this.setState({index:index})
  }
  render() {
    const {list} = this.props
    const {index} = this.state;
    const styles = require('../../Mine.scss')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          收货地址
          <Link className={'f-fr ' +styles.goodsBtn} to="/mine/addAddress">添加收货地址</Link>
        </h3>
        <ul className={styles.addressList}>
          {list && list.data.map((item,i)=>
            <li key={i} className={styles.item} onClick={this.selectFunc.bind(this,i)}>
              <div className={styles.desc+' f-cb'}>
                <span className={styles.name}>{item.receiver}</span>
                <span className={styles.phone}>{item.mobile}</span>
              </div>
              <div className={'f-cb'}>
                <div className={styles.check}>
                  <img src={index == i ? aMarker:marker}/>
                </div>
                <div className={styles.sLeft}>
                  {item.ifDefault ? <span className={styles.default}>[默认]</span> :''}
                  {item.province+item.city+item.area+item.addressDetail}
                </div>
                <Link className={styles.aRight} to={"/mine/editAddress/"+item.id}>
                  编辑<img src={edit} className={styles.edit +' f-ib'}/>
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    );
  }
  componentDidMount(){
    alert(0)
    this.props.loading()
    this.props.load();

  }
  componentWillUpdate(){
    this.props.unloading()
  }
  componentDidUpdate() {
  }
}
