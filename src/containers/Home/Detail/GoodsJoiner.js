import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { loadDetailJoiner } from '../../../redux/modules/detail/detail.joiner';
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';

@connect(
  state => ({result:state.detailJoiner.data}),
  {loadDetailJoiner,loading,unloading})
export default class GoodsJoiner extends Component {

  static propTypes = {
    result: PropTypes.object
  };
  render() {
    const {result} = this.props;
    const styles = require('./GoodsJoiner.scss');
    return (
      <div>
        { result &&
          <div> 
            {
              result.data.userList.map((item,index) =>
                <div className={styles.item}>
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
    this.props.loading()
    this.props.loadDetailJoiner()
  }
  componentWillUpdate(){
    this.props.unloading()
  }
  componentDidUpdate() {
    
  }
}
