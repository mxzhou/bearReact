import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';
import ApiClient from '../../../helpers/ApiClient'
import { connect } from 'react-redux';

@connect(
  state => ({}),
  {loading,unloading})
export default class GoodsPast extends Component {

  static propTypes = {
    result: PropTypes.object
  };
  static defaultProps = {
    result: null,
  }
  // 构造器
  constructor(props, context) {
    super(props, context);
    this.state = {
      result: props.result,
    }
  }
  render() {
    const {result} = this.state;
    const styles = require('./GoodsPast.scss');
    return (
      <div>
        { result && result.data &&
          <div style={{paddingTop:15}}>
            {
              result.data.goodsList.map((item,index) =>
                <div className={styles.item} key={'joiner-item'+index}>
                  <div className={styles.title}>
                    <span className="f-fr">揭晓时间：{this.formateDate(item.openTime)}</span>
                    <span className="f-fl">期号：{item.id}</span>
                  </div>
                  <div className={styles.content}>
                    <span className={styles.pic}><img src={item.avatarUrl}/></span>
                    <h3><span className="f-fr">用户ID：{item.kgUid}</span><span className="f-fl">获奖者：<em>{item.nickname}</em></span></h3>
                    <p className={styles.gray}>{item.address} {item.ip}</p>
                    <p>
                      <span className="f-fr">参与人次：<em>{item.joinNumber}人次</em></span>
                      <span className="f-fl">幸运号码：<em>{item.winCode}</em></span>
                    </p>
                  </div>
                </div>
              )
            }
            { result.data.goodsList.length == 0 &&
              <div style={{textAlign:'center',clear:'both',lineHeight:'50px'}}>
                暂无往期揭晓记录
              </div>
            }
          </div>
        }
      </div>
    );
  }
  formateDate (time) {
    let t = new Date(time)
    return t.getFullYear()+'-'+(t.getMonth()+1)+'-'+t.getDate() + ' ' + this.intNum(t.getHours())+':'+this.intNum(t.getMinutes())+':'+this.intNum(t.getSeconds())
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
      goodsId: this.props.location.query.goodsId,
    }
    //this.props.loading()
    client.post('/goods/past',{data:data}).then(function(data) {
      //_this.props.unloading()
      _this.setState({
        result: data
      })
    }, function(value) {
      //_this.props.unloading()
    });
  }
  componentDidUpdate() {

  }
  componentWillUnmount () {
  }
  componentDidUpdate() {

  }
}
