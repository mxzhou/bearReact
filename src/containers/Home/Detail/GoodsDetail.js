import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { loadDetailGoods } from '../../../redux/modules/detail/detail.goods';
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';

@connect(
  state => ({result:state.detailGoods.data}),
  {loadDetailGoods,loading,unloading})
export default class PayRecord extends Component {

  static propTypes = {
    result: PropTypes.object
  };
  render() {
    const {result} = this.props;
    const styles = require('./GoodsDetail.scss');
    return (
      <div>
        { result &&
          <div>
            {
              result.data.map((item,index) =>
                <img className={styles.img} key={'detail-item'+index} src={item}/>
              )
            }
          </div>
        }
      </div>
    );
  }
  componentDidMount() {
    //this.props.loading()
    this.props.loadDetailGoods({id:this.props.location.query.goodsId})
  }
  componentWillUpdate(){
    //this.props.unloading()
  }
  componentDidUpdate() {

  }
}
