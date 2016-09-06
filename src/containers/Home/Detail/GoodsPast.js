import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { loadDetailPast } from '../../../redux/modules/detail/detail.past';
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';

@connect(
  state => ({result:state.detailPast.data}),
  {loadDetailPast,loading,unloading})
export default class GoodsPast extends Component {

  static propTypes = {
    result: PropTypes.object
  };
  render() {
    const {result} = this.props;
    const styles = require('./GoodsPast.scss');
    return (
      <div>
        { result &&
          <div style={{paddingTop:15}}> 
            {
              result.data.goodsList.map((item,index) =>
                <div className={styles.item}>
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
    this.props.loading()
    this.props.loadDetailPast()
  }
  componentWillUpdate(){
    this.props.unloading()
  }
  componentDidUpdate() {
    
  }
}
