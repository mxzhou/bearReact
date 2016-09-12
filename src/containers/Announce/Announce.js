import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from '../../redux/modules/announce';
import { loading,unloading } from '../../redux/modules/loading';
import Single from './Single'
import { Link } from 'react-router';
import {slyFunc} from '../../utils/sly'
import ApiClient from '../../helpers/ApiClient'
import { loadToast,removeToast } from '../../redux/modules/toast';

@connect(
  state => ({result: state.announce.data}),
  {load,loading,unloading,loadToast})

export default class Announce extends Component {

  static propTypes = {
    result: PropTypes.array,
  };
  static defaultProps = {
    result:[]
  }
  // 构造器
  constructor(props, context) {
    super(props, context);
    // 在这里设置初始出台
    this.state = {
      result:props.result,
      bAdd:false,
      lLeng:0
    }
  }
  domFunc(bLast = false){
    const {result} = this.state;
    var _this = this;
    if(result.length>0) {
      slyFunc(
        function(){
          var lastId = result[result.length-1].id
          _this.setState({
            bAdd:true
          })
          _this.fetchData({lastId:lastId,pageSize:10})
        },
        function(){
          _this.fetchData({lastId:0,pageSize:10})
        },
        this.state.lLeng,
        bLast
      )
    }
  }
  fetchData(data){
    const client = new ApiClient();
    const _this = this;
    // 异步获取数据 promise
    this.props.loading()
    client.post('/goods/open',{data:data}).then(function(data) {
      _this.props.unloading()
      if(data.errorCode!=0){
        _this.props.loadToast(data.errorMessage)
        return;
      }
      var list,lLeng,bLast;
      if(_this.state.bAdd){
        list = _this.state.result.concat(data.data.goodsList);
        lLeng = parseInt(_this.state.result.length/2);
      }else{
        list = data.data.goodsList;
        lLeng = 0;
      }
      console.log(lLeng)
      _this.setState({
        result:list,
        lLeng:lLeng
      })
      if(data.data.goodsList.length == 0){
        bLast = true
      }else{
        bLast = false
      }
      _this.domFunc(bLast)
      // success
    }, function(value) {
      // failure
    });
  }

  componentWillMount(){
    console.log('componentWillMount')
  }
  render() {
    const {result} = this.state;
    const styles = require('./Announce.scss');
    console.log('listRender');

    return (
      <div className={styles.section}>
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500}>
          <div className={styles.content}>
            <div className={styles.homeList}>
              <div className={styles.frame} id="frame">
                <ul className={styles.list+' f-cb'} id="slidee">
                  {
                    result && result.map((item,index) =>
                      <Single key={'home-list'+index} item={item} index={index} servertime={result.servertime}></Single>
                    )
                  }
                </ul>
              </div>
              <div className="scrollbar" id="scrollbar">
                <div className="handle">
                  <div className="mousearea"></div>
                </div>
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
  componentDidMount(){
    this.fetchData({lastId:0,pageSize:10})
  }
}
