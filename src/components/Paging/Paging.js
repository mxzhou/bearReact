import React, {Component, PropTypes} from 'react';
import { IndexLink,Link } from 'react-router';
export default class Paging extends Component {
  static propTypes = {
    onLoadFirst: PropTypes.func,
    onLoadNext: PropTypes.func,
    onLoadLast: PropTypes.func,
    onLoadPrev: PropTypes.func,
    list: PropTypes.array,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    curPage: PropTypes.number,
  }
  render() {
    const {list,pageSize,total,curPage} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Paging.scss')
    let page = parseInt(total/pageSize)
    if(total%pageSize!=0){
      page++
    }
    return (
      <div className={styles.paging}>
        <a className={styles.btn + ' ' + styles.btnFirst} onClick={this.first.bind(this)}>首页</a>
        <a className={styles.btn + ' ' + styles.btnPrev} onClick={this.prev.bind(this)}>上一页</a>
        { list && 
          <span className={styles.page}>{curPage}/{page}</span>
        }
        <a className={styles.btn + ' ' + styles.btnNext} onClick={this.next.bind(this)}>下一页</a>
        <a className={styles.btn + ' ' + styles.btnLast} onClick={this.last.bind(this)}>末页</a>
      </div>
    );
  }
  first () {
    this.props.onLoadFirst(1)
  }
  next () {
    this.props.onLoadNext(1)
  }
  prev () {
    this.props.onLoadPrev(1)
  }
  last () {
    this.props.onLoadLast(1)
  }
}
