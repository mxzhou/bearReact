import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink,Link } from 'react-router';
import { load as loadMask,unload} from '../../../../redux/modules/mine/mask';
import { loadToast,removeToast } from '../../../../redux/modules/toast';
import marker from '../../../../../static/assets/btn_select.png'
import aMarker from '../../../../../static/assets/btn_select_a.png'
import ApiClient from '../../../../helpers/ApiClient'

@connect(
  state => ({}),
  {loadMask,unload,loadToast})
export default class EditAddress extends Component {
  static propTypes = {
  };
  static defaultProps = {
    userAddressId:'',
    receiver:'',
    provinceId:'',
    cityId:'',
    areaId:'',
    provinceList:[],
    cityList:[],
    areaList:[],
    addressDetail:'',
    mobile:'',
    defaultFlag:true
  }
  // 构造器
  constructor(props, context) {
    super(props, context);
    // 在这里设置初始出台
    this.state = {
      userAddressId:'',
      defaultFlag:props.defaultFlag,
      receiver:props.receiver,
      provinceId:props.provinceId,
      cityId:props.cityId,
      areaId:props.areaId,
      provinceList:props.provinceList,
      cityList:props.cityList,
      areaList:props.areaList,
      addressDetail:props.addressDetail,
      mobile:props.mobile,
    }
  }
  handlerChange(type,e){
    // input change
    var state = e.target.value;
    switch(type){
      case 'receiver':
        this.setState({receiver:state})
        break;
      case 'mobile':
        this.setState({mobile:state})
        break;
      case 'addressDetail':
        this.setState({addressDetail:state})
        break;
      default:;
    }
  }
  handlerSelect(type,e){
    // select change
    var state = e.target.value;
    this.setState({
      addressId:state
    })
    switch(type){
      case 'province':
        this.setState({
          provinceId:state,
          cityId:'',
          cityList:[],
          areaId:'',
          areaList:[]
        })
        if(state == ''){
          return;
        }
        this.getCity(1,2,state)
        break;
      case 'city':
        this.setState({
          cityId:state,
          areaId:'',
          areaList:[]
        })
        if(state == ''){
          return;
        }
        this.getArea(1,3,state)
        break;
      case 'area':
        this.setState({areaId:state})
        break;
      default:;
    }
  }
  getAreaData(type,state = 1){
    const client = new ApiClient();
    // 异步获取数据 promise
    return client.post('/address/get',{
      data:{addressType:type,addressId:state}
    })
  }
  getProvince(type,addressType){
    var promise = this.getAreaData(addressType);
    var _this = this;
    promise.then(function(data){
      _this.setState({provinceList:data.data})
      if(type == 2){
        _this.setState({provinceId:addressObject.provinceId})
        _this.getCity(type,2,addressObject.provinceId);
      }
    })
  }
  getCity(type,addressType,state){
    var promise = this.getAreaData(addressType,state);
    var _this = this;
    promise.then(function(data){
      _this.setState({cityList:data.data})
      if(type == 2){
        _this.setState({cityId:addressObject.cityId})
        _this.getArea(type,3,addressObject.cityId);
      }
    })
  }
  getArea(type,addressType,state){
    var promise = this.getAreaData(addressType,state);
    var _this = this;
    promise.then(function(data){
      _this.setState({areaList:data.data})
      if(type == 2){
        _this.setState({areaId:addressObject.areaId})
      }
    })
  }
  checkFunc(){
    this.setState({
      defaultFlag:!this.state.defaultFlag
    })
  }
  submitFunc(){
    const client = new ApiClient();
    const id = this.props.params.id;

    var data = {
      userAddressId:this.state.userAddressId,
      provinceId:this.state.provinceId,
      cityId:this.state.cityId,
      areaId:this.state.areaId,
      addressDetail:this.state.addressDetail,
      mobile:this.state.mobile,
      defaultFlag:this.state.defaultFlag,
      receiver:this.state.receiver,
    };
    var rMobile = /^1[3|4|5|7|8]\d{9}$/;
    if(data.receiver.trim() == ''){
      this.props.loadToast('收货人不能为空！')
      return;
    }
    if(data.mobile.trim() == ''){
      this.props.loadToast('手机号码不能为空！')
      return;
    }
    if(!rMobile.test(data.mobile.trim())){
      this.props.loadToast('手机号码不合规范！')
      return;
    }
    if(data.provinceId == ''){
      this.props.loadToast('请选择省/直辖市')
      return;
    }
    if(data.cityId == ''){
      this.props.loadToast('请选择地级市')
      return;
    }
    if(data.areaId == ''){
      this.props.loadToast('请选择县/区')
      return;
    }
    if(data.addressDetail.trim() == ''){
      this.props.loadToast('街道地址不能为空！')
      return;
    }
    var _this = this;
    //异步获取数据 promise
    client.post('/user/address/update',{
      data:data
    }).then(function(data){
      if(data.errorCode!=0){
        _this.props.loadToast(data.errorMessage)
        return;
      }
      _this.props.loadToast('保存成功！')
      if(id){
        location.href="#/mine/selectAddress/"+id
      }else{
        location.href="#/mine/address"
      }
    })
  }
  deleteFunc(){
    const client = new ApiClient();
    const id = this.props.params.id;
    const userAddressId = this.state.userAddressId;
    var _this = this;
    client.post('/user/address/delete',{
      data:{userAddressId:userAddressId}
    }).then(function(data){
      if(data.errorCode!=0){
        _this.props.loadToast(data.errorMessage)
        return;
      }
      _this.props.loadToast('删除成功！')
      if(id){
        location.href="#/mine/selectAddress/"+id
      }else{
        location.href="#/mine/address"
      }
    })
  }
  closeHandler(){
    history.back()
  }
  render() {
    const {numPayList,typePayList} = this.props
    const {defaultFlag,receiver,provinceId,cityId,areaId,addressDetail,mobile,provinceList,cityList,areaList} = this.state;

    const styles = require('../../Mine.scss')
    const back = require('../../../../../static/assets/ic_backpage.png')

    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <a><img src={back} className={styles.close} onClick={this.closeHandler.bind(this)}/></a>
          修改收货地址
        </h3>
        <div className={styles.addressForm}>
          <div className={styles.control+' f-cb'}>
            <label className={styles.label}>收货人</label>
            <div className="f-fl">
              <input type="text" className={styles.formControl} value={receiver} maxLength="8" placeholder="请使用真实姓名，长度不超过8个字" onChange={this.handlerChange.bind(this,'receiver')}/>
            </div>
          </div>
          <div className={styles.control+' f-cb'}>
            <label className={styles.label}>手机号码</label>
            <div className="f-fl">
              <input type="text" className={styles.formControl} placeholder="" value={mobile}  onChange={this.handlerChange.bind(this,'mobile')}/>
            </div>
          </div>
          <div className={styles.control+' f-cb'}>
            <label className={styles.label}>所在地区</label>
            <div className="f-fl">
              <select className={'f-ib '+styles.selectControl} value={provinceId} onChange={this.handlerSelect.bind(this,'province')}>
                <option value="">省/直辖市</option>
                {provinceList && provinceList.map((item,i)=>
                <option key={i} value={item.id}>{item.addressName}</option>)}
              </select>
              <select className={'f-ib '+styles.selectControl} value={cityId} onChange={this.handlerSelect.bind(this,'city')}>
                <option value="">地级市</option>
                {cityList && cityList.map((item,i)=>
                  <option key={i} value={item.id}>{item.addressName}</option>)}
              </select>
              <select className={'f-ib '+styles.selectControl} value={areaId} onChange={this.handlerSelect.bind(this,'area')}>
                <option value="">县/区</option>
                {areaList && areaList.map((item,i)=>
                  <option key={i} value={item.id}>{item.addressName}</option>)}
              </select>
            </div>
          </div>
          <div className={styles.control+' f-cb'}>
            <label className={styles.label}>街道地址</label>
            <div className="f-fl">
              <textarea rows="2" className={styles.formControl} placeholder="" value={addressDetail}  onChange={this.handlerChange.bind(this,'addressDetail')}></textarea>
            </div>
          </div>
          <div className={styles.control+' f-cb'}>
            <div className={styles.offset}>
              <a className={styles.default} onClick={this.checkFunc.bind(this)}>
                <img src={defaultFlag ? aMarker:marker} className={styles.image}/>
                设置为默认收货地址
              </a>
            </div>
          </div>
        </div>
        <div className={styles.blockBtn}>
          <a className={styles.btn + ' '+styles.addressBtn+' f-ib f-mr15'} onClick={this.deleteFunc.bind(this)}>删除</a>
          <a className={styles.btn + ' '+styles.addressBtn+' f-ib'} onClick={this.submitFunc.bind(this)}>保存</a>
        </div>
      </div>
    );
  }
  componentDidMount(){
    this.setState({
      userAddressId:addressObject.id,
      defaultFlag:addressObject.ifDefault,
      receiver:addressObject.receiver,
      addressDetail:addressObject.addressDetail,
      mobile:addressObject.mobile,
    })
    this.props.loadMask()
    this.getProvince(2,1)
  }
}