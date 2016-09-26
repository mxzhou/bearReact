import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink,Link } from 'react-router';
import { load as loadMask,unload} from '../../../redux/modules/mine/mask';
import { loadCodes} from '../../../redux/modules/mine/join';
import { loadToast,removeToast } from '../../../redux/modules/toast';
import {slyFunc} from '../../../utils/sly'

import marker from '../../../assets/btn_select.png'
import aMarker from '../../../assets/btn_select_a.png'
import ApiClient from '../../../helpers/ApiClient'
@connect(
  state => ({link2:state.history.link}),
  {loadMask, unload, loadCodes, loadToast})

export default class JoinDetail extends Component {
  static propTypes = {};
  static defaultProps = {
    bSelect: true,
    data: {}
  }
  // 构造器
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      bSelect: props.bSelect,
      data: props.data
    }
  }

  selectNum(index) {
    this.setState({numIndex: index})
  }

  selectType(index) {
    this.setState({typeIndex: index})

  }

  checkFunc() {
    this.setState({
      bSelect: !this.state.bSelect,
    })
  }

  focusFunc() {
  }

  submitFunc() {
  }

  closeHandler() {
    location.href='#/'+this.props.link2;
  }

  fetchData() {
    const client = new ApiClient();
    const id = this.props.params.id
    var _this = this;
    //异步获取数据 promise
    client.post('/goods/user', {
      data: {id: id}
    }).then(function (data) {
      if (data.errorCode != 0) {
        //_this.props.loadToast(data.errorMessage)
        return;
      }
      _this.setState({
        data: data
      });
    })
  }

  render() {
    const {data,bSelect} = this.state;
    const styles = require('../Mine.scss')
    const back = require('../../../assets/ic_backpage.png')

    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <a onClick={this.closeHandler.bind(this)}><img src={back} className={styles.close}/></a>
          查看夺宝号
        </h3>
        <div className=" f-pr">
          <div className={styles.frame+' scroll'} id="frame">
              <ul className={styles.secondContent +' f-cb'}  id="slidee">
                {data && data.data != null && data.data.joinCodeList != null && data.data.joinCodeList.map((item, i)=>
                  <li key={i} className={styles.item}>
                    {item}
                  </li>)
                }
              </ul>
              {data && data.data != null && data.data.joinNumber == 0 &&
              <div className="errorMsg">暂时还未有数据哦！</div>
              }
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.props.loadMask()
    this.fetchData()
  }
  componentDidUpdate() {
    const {data} = this.state;
    if(data && data.data != null && data.data.joinCodeList.length>0){
      slyFunc({bLoadMore: false,parataxis:8})
    }
  }
}