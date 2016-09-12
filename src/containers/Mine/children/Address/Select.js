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
import ApiClient from '../../../../helpers/ApiClient'

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
  editFunc(obj){
    addressObject = obj;
    location.href="#/mine/editAddress/"+this.props.params.id;
  }
  submitFunc(){
    const {list} = this.props
    const client = new ApiClient();
    var data = {
      userAddressId:list.data[this.state.index].id,
      id:this.props.params.id
    }
    console.log(data)
    //异步获取数据 promise
    client.post('/user/win/setAddress',{
      data:data
    }).then(function(data){
      if(data.errorCode == 0){
        location.href="#/mine/lucky"
      }
      console.log(data)
    })
  }
  render() {
    const {list} = this.props
    const {index} = this.state;
    const id = this.props.params.id;
    const styles = require('../../Mine.scss')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          收货地址
          <Link className={'f-fr ' +styles.goodsBtn} to={"/mine/addAddress/"+id}>添加收货地址</Link>
        </h3>
        {list && list.data.length > 0 &&
          <ul className={styles.addressList}>
            {list && list.data.map((item, i)=>
              <li key={i} className={styles.item} onClick={this.selectFunc.bind(this,i)}>
                <div className={styles.desc+' f-cb'}>
                  <span className={styles.name} style={{'paddingLeft':'35px'}}>{item.receiver}</span>
                  <span className={styles.phone}>{item.mobile}</span>
                </div>
                <div className={'f-cb'}>
                  <div className={styles.check}>
                    <img src={index == i ? aMarker:marker}/>
                  </div>
                  <div className={styles.sLeft}>
                    {item.ifDefault ? <span className={styles.default}>[默认]</span> : ''}
                    {item.province + item.city + item.area + item.addressDetail}
                  </div>
                  <a className={styles.aRight} onClick={this.editFunc.bind(this,item)}>
                    编辑<img src={edit} className={styles.edit +' f-ib'}/>
                  </a>
                </div>
              </li>
            )}
          </ul>
        }
        {list && list.data && (list.data == null || list.data.length == 0) &&
          <div className={"errorMsg "+styles.payRecordMsg}>暂时还未有数据哦！</div>
        }
        <div className={styles.blockBtn+' '+styles.selectAddressBtn}>
          <a className={styles.btn + ' '+styles.addressBtn} onClick={this.submitFunc.bind(this)}>保存</a>
        </div>
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
