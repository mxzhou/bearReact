import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';
import ApiClient from '../../../helpers/ApiClient'
import { connect } from 'react-redux';

@connect(
  state => ({}),
  {loading,unloading})
export default class GoodsJoiner extends Component {

  static propTypes = {
    result: PropTypes.object
  };
  static defaultProps = {
    result: null,
    lastId: 0,
  }
  // 构造器
  constructor(props, context) {
    super(props, context);
    this.state = {
      result: props.result,
      lastId: props.lastId,
    }
  }
  render() {
    const {result} = this.state;
    const styles = require('./GoodsJoiner.scss');
    return (
      <div>
        { result && result.data &&
          <div>
            {
              result.data.userList.map((item,index) =>
                <div className={styles.item} key={'joiner-item'+index}>
                  <span className={styles.time}>{this.formateYMD(item.joinTime)}<br/>{this.formateDate(item.joinTime)}</span>
                  <span className={styles.pic}><img src={item.avatarUrl}/></span>
                  <p className={styles.info}>
                    <span className={styles.nickname}>{item.nickname}</span><br/>
                    <span>{item.address} {item.ip}</span>
                  </p>
                  <div className={styles.join}>参与<em>{item.joinNumber}</em>人次</div>
                </div>
              )
            }
          </div>
        }
        { !result &&
          <div style={{textAlign:'center',clear:'both',lineHeight:'50px'}}>
            暂无夺宝参与记录
          </div>
        }
      </div>
    );
  }
  formateYMD (time) {
    let t = new Date(time)
    return t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate()
  }
  formateDate (time) {
    let t = new Date(time)
    return this.intNum(t.getHours())+':'+this.intNum(t.getMinutes())+':'+this.intNum(t.getSeconds())+'.'+t.getMilliseconds()
  }
  intNum (num) {
    return num < 10 ? '0'+num:num
  }
  componentDidMount() {
    this.loadData()
  }
  loadData () {
    const client = new ApiClient();
    const _this = this;
    let result = _this.state.result
    let data = {
      lastId: this.state.lastId,
      pageSize: 10,
      id: this.props.location.query.id,
    }
    this.loading = true;
    //this.props.loading()
    client.post('/goods/joiner/list',{data:data}).then(function(data) {
      _this.loading = false
      //_this.props.unloading()
      let list = data.data.userList
      if(list.length!=0){
        if( result != null){
          result.data.userList = result.data.userList.concat(list)
          _this.setState({
            result: result,
            lastId: list[list.length-1].id
          })
        }else{
          _this.setState({
            result: data,
            lastId: list[list.length-1].id
          })
        }
      }
      if(list.length<10){
        _this.hasMore = false
      }else{
        _this.hasMore = true
      }
    }, function(value) {
      //_this.props.unloading()
      this.loading = false
    });
  }
  componentWillUpdate(){

  }
  componentDidUpdate() {
    const _this = this
    $('#scrollBlock').unbind('scroll');
    $('#scrollBlock').on('scroll',function(e){
      if(!(_this.loading || !_this.hasMore)){
        let $this = $(this)
        if($this.scrollTop()+550>$('#slidee').height()){
          _this.loadData()
        }
      }
    })
  }
  componentWillUnmount () {
    $('#scrollBlock').unbind('scroll')
  }
}
