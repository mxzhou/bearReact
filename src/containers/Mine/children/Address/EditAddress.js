import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink,Link } from 'react-router';
import { load as loadMask,unload} from '../../../../redux/modules/mine/mask';
import marker from '../../../../../static/assets/btn_select.png'
import aMarker from '../../../../../static/assets/btn_select_a.png'
import ApiClient from '../../../../helpers/ApiClient'

@connect(
  state => ({}),
  {loadMask,unload})

export default class EditAddress extends Component {
  static propTypes = {
  };
  static defaultProps = {
    receiver:'',
    provinceId:'',
    cityId:'',
    areaId:'',
    provinceList:[],
    cityList:[],
    areaList:[],
    addressDetail:'',
    mobile:'',
    bSelect:true
  }
  // 构造器
  constructor(props, context) {
    super(props, context);
    // 在这里设置初始出台
    this.state = {
      bSelect:props.bSelect,
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
        this.getCity()
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
        this.getArea()
        break;
      case 'area':
        this.setState({areaId:state})
        break;
      default:;
    }
  }
  getAreaData(type){
    const client = new ApiClient();
    const _this = this;
    // 异步获取数据 promise
    return client.post('/address/get',{
      data:{addressType:type}
    })
  }
  getProvince(type){
    var promise = this.getAreaData(1);
    var _this = this;
    promise.then(function(data){
      _this.setState({provinceList:data.data})
      if(type == 2){
        _this.setState({provinceId:addressObject.provinceId})
        _this.getCity(type);
      }
    })
  }
  getCity(type){
    var promise = this.getAreaData(2);
    var _this = this;
    promise.then(function(data){
      _this.setState({cityList:data.data})
      if(type == 2){
        _this.setState({cityId:addressObject.cityId})
        _this.getArea(type);
      }
    })
  }
  getArea(type){
    var promise = this.getAreaData(3);
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
      bSelect:!this.state.bSelect
    })
  }
  submitFunc(){
    console.log(this.state);
  }
  closeHandler(){
    history.back()
  }
  render() {
    const {numPayList,typePayList} = this.props
    const {bSelect,receiver,provinceId,cityId,areaId,addressDetail,mobile,provinceList,cityList,areaList} = this.state;

    const styles = require('../../Mine.scss')
    const back = require('../../../../../static/assets/ic_backpage.png')

    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Link to="/mine"><img src={back} className={styles.close} onClick={this.closeHandler.bind(this)}/></Link>
          修改收货地址
        </h3>
        <div className={styles.addressForm}>
          <div className={styles.control+' f-cb'}>
            <label className={styles.label}>收货人</label>
            <div className="f-fl">
              <input type="text" className={styles.formControl} value={receiver} placeholder="请使用真实姓名，长度不超过8个字" onChange={this.handlerChange.bind(this,'receiver')}/>
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
    this.getProvince(2)
  }
}