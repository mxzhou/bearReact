import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from 'redux/modules/home';
import { loading,unloading } from '../../redux/modules/loading';

import { Link } from 'react-router';
@connect(
  state => ({result: state.home.data}),
  {load,loading,unloading})
export default class List extends Component {

  static propTypes = {
    result: PropTypes.object,
  };
  componentWillMount(){
    console.log('componentWillMount')
  }
  render() {
    const {result} = this.props;
    const styles = require('./Home.scss');
    console.log('listRender');

    return (
        <div className={styles.section}>
          <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeaveTimeout={300} transitionAppearTimeout={300} transitionEnterTimeout={300}>
            <div className={styles.content}>
              <div className={styles.homeList}>
                <div className={styles.frame} id="frame">
                  <ul className={styles.list+' f-cb'} id="slidee">
                    {
                      result && result.data && result.data.goodsList.map((item,index) =>
                        <li key={'home-list'+index} className={styles.item + (index%2 != 0 ? (' '+styles.even):'')}>
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
                              <Link to={`/home/detail/${item.id}`} className={styles.btn + ' f-fr'}>立即夺宝</Link>
                            </div>
                          </div>
                        </li>
                      )
                    }
                  </ul>
                </div>
                <div className="scrollbar">
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
    console.log('componentDidMount')
    this.props.loading()
    this.props.load();

  }
  componentWillUpdate(){
    this.props.unloading()
    console.log('componentWillUpdate')

  }
  componentDidUpdate() {
    require('../../utils/plugin')
    require('../../utils/jquery.sly')
    var _that = this
    setTimeout(function(){
      var $frame  = $('#frame'),
        $slidee = $('#slidee'),
        $wrap = $frame.parent(),
        result = _that.props.result;

      if(result && result.data && result.data.goodsList.length>0){
        $frame.sly({
          slidee:$slidee,
          average:2,
          itemNav: 'basic',
          smart: 2,
          mouseDragging: 1,
          touchDragging: 1,
          releaseSwing: 1,
          startAt: 0,
          scrollBar: $wrap.find('.scrollbar'),
          scrollBy: 2,
          speed: 300,
          elasticBounds: 1,
          easing: 'easeOutExpo',
          dragHandle: 1
        });
      }
    },200)
    console.log('componentDidUpdate')


  }
  componentWillUnmount(){
    console.log('componentWillUnmount')

  }
}
