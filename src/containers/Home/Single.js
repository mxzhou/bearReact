import React, { Component,PropTypes } from 'react';
import { Link } from 'react-router';
import { load } from '../../redux/modules/history';
import { connect } from 'react-redux';

@connect(
  state => ({}),
  {load})
export default class Single extends Component {

  static propTypes = {
    item: PropTypes.object,
  };
  detailFunc(item){
    this.props.load('home')
    location.href = '#/detail/goods?id='+item.id+'&goodsId='+item.goodsId
  }
  render() {
    const {item,index} = this.props;
    const styles = require('./Home.scss');

    return (
      <li className={styles.item + (index%2 != 0 ? (' '+styles.even):'')}>
        <div className={styles.left}>
          <img src={item.coverImgUrl} className={styles.coverImg}/>
        </div>
        <div className={styles.right}>
          <p title={item.goodsName} className={styles.name + ' f-pre'}>{item.goodsName}</p>
          <div className={styles.bar}>
            <div className={styles.active} style={{width:(item.needNumber-item.surplusNumber)/item.needNumber*100+'%'}}></div>
          </div>
          <div className={styles.p + ' f-cb'}>
            总需：{item.needNumber}
            <div className="f-fr">
              剩余:<span className={styles.blue}>{item.surplusNumber}</span>
            </div>
          </div>

          <div className='f-cb'>
            <a  className={styles.btn + ' f-fr'} onClick={this.detailFunc.bind(this,item)}>立即夺宝</a>
          </div>
        </div>
      </li>
    );
  }
}
