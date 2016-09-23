import React, {Component, PropTypes} from 'react';
import { IndexLink,Link } from 'react-router';
export default class Paging extends Component {
  static propTypes = {
    onLoadPaging: PropTypes.func,
    pageSize: PropTypes.number,
    total: PropTypes.number,
    pageNumber: PropTypes.number,
    totalPage: PropTypes.number,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      totalPage: 0,
      pageNumber: 1
    }
  }
  render() {
    const { totalPage, pageNumber } = this.state
    const { pageSize, total } = this.props; // eslint-disable-line no-shadow
    const styles = require('./Paging.scss')
    return (
      <div className={styles.paging}>
        <a className={styles.btn + ' ' + styles.btnFirst} onClick={this.first.bind(this)}>首页</a>
        <a className={styles.btn + ' ' + styles.btnPrev} onClick={this.prev.bind(this)}>上一页</a>
        <span className={styles.page}>{pageNumber}/{totalPage}</span>
        <a className={styles.btn + ' ' + styles.btnNext} onClick={this.next.bind(this)}>下一页</a>
        <a className={styles.btn + ' ' + styles.btnLast} onClick={this.last.bind(this)}>末页</a>
      </div>
    );
  }
  componentDidMount(){
    const {total,pageSize} = this.props;
    let totalPage = parseInt(total/pageSize)
    if(total%pageSize!=0){
      totalPage++
    }
    if(total==pageSize){
      totalPage=1
    }
    this.setState({
      totalPage: totalPage,
      pageNumber: 1
    })
  }
  first () {
    if(this.state.pageNumber>1) {
      this.setState({pageNumber:1})
      this.props.onLoadPaging(1)
    }
  }
  next () {
    let num = this.state.pageNumber
    if(num<this.state.totalPage){
      this.setState({pageNumber:num+1})
      this.props.onLoadPaging(num+1)
    }
  }
  prev () {
    let num = this.state.pageNumber
    if(num>1){
      this.setState({pageNumber:num-1})
      this.props.onLoadPaging(num-1)
    }
  }
  last () {
    if(this.state.pageNumber<this.state.totalPage) {
      this.setState({pageNumber:this.state.totalPage})
      this.props.onLoadPaging(this.state.totalPage)
    }
  }
}
