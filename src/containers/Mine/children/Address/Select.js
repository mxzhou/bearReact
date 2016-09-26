import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { IndexLink,Link } from 'react-router';
import Close from './../Close';
import { connect } from 'react-redux';
import {load} from '../../../../redux/modules/mine/addressList'
import { load as loadMask,unload} from '../../../../redux/modules/mine/mask';
import { loadToast,removeToast } from '../../../../redux/modules/toast';

import { loading,unloading } from '../../../../redux/modules/loading';
import edit from '../../../../assets/img_edit.png'
import marker from '../../../../assets/btn_marker.png'
import aMarker from '../../../../assets/btn_marker_a.png'
import ApiClient from '../../../../helpers/ApiClient'
import {slyFunc} from '../../../../utils/sly'
import { load as loadHistory } from '../../../../redux/modules/history';

@connect(
  state => ({list: state.addressList.data}),
  {load, loading, unloading,loadMask,loadToast,loadHistory})
export default class Select extends Component {
  static propTypes = {
    list: PropTypes.object
  };
  static defaultProps = {
    index: 0,
    list:{}
  }
  // 构造器
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      index: props.index
    }
  }

  selectFunc(index) {
    this.setState({index: index})
  }

  editFunc(obj) {
    sessionStorage.setItem('addressObject',JSON.stringify(obj))
    this.props.loadHistory('mine/selectAddress/'+this.props.params.id)
    location.href = "#/mine/editAddress/" + this.props.params.id;
  }
  fetchData(){
    const client = new ApiClient();
    var data = {};
    let _this = this
    //异步获取数据 promise
    client.post('/user/address/list', {
      data: data
    }).then((data)=> {
      console.log(data)
      this.setState({list: data})
      if (data && data.data && data.data.length > 0) {
        for(var i= 0,l=data.data.length;i<l;i++){
          if(data.data[i].ifDefault){
            this.setState({index: i})
          }
        }
        slyFunc({bLoadMore: false})
      }
    })
  }
  submitFunc() {
    const {list} = this.state
    const client = new ApiClient();
    var data = {
      userAddressId: list.data[this.state.index].id,
      id: this.props.params.id
    }
    let _this = this
    //异步获取数据 promise
    client.post('/user/win/setAddress', {
      data: data
    }).then(function (data) {
      if(data.errorCode!=0){
        //_this.props.loadToast(data.errorMessage)
        return;
      }
      _this.props.loadToast('保存成功')
      location.href = "#/mine/lucky"
    })
  }
  addFunc(){
    this.props.loadHistory('mine/selectAddress/'+this.props.params.id)
    location.href = "#/mine/addAddress/" + this.props.params.id;
  }
  render() {
    const {list,index} = this.state
    const styles = require('../../Mine.scss')
    const back = require('../../../../assets/ic_backpage.png')

    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Link to="/mine/lucky"><img src={back} className={styles.close}/></Link>
          收货地址
          <a className={'f-fr ' +styles.goodsBtn} onClick={this.addFunc.bind(this)}>添加收货地址</a>
        </h3>
        <div className="f-pr">
          <div id="frame" className={styles.addressList+' '+' scroll'}>
            {list && list.data.length > 0 &&
            <ul className={'f-cb'} id="slidee">
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
            <div className={"errorMsg "+styles.payRecordMsg}>请添加收货地址！</div>
            }
          </div>
        </div>
        {list && list.data && list.data != null && list.data.length > 0 &&
        <div className={styles.blockBtn+' '+styles.selectAddressBtn}>
          <a className={styles.btn + ' '+styles.addressBtn} onClick={this.submitFunc.bind(this)}>保存</a>
        </div>
        }

      </div>
    );
  }

  componentDidMount() {
    this.props.loadMask()
    //this.props.loading()
    this.fetchData();
  }
}
