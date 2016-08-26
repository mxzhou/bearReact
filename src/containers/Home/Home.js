import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { load } from 'redux/modules/home';
@connect(
  state => ({result: state.home.data}),
  {load})
export default class Home extends Component {

  static propTypes = {
    result: PropTypes.object,
  };
  render() {
    const {result} = this.props;
    const styles = require('./Home.scss');

    return (
      <div  className={styles.home}>
        <div className={styles.frame} id="frame">
          <ul className={styles.list+' f-cb'} id="slidee">
            {
              result && result.data && result.data.goodsList.map((item,index) =>
                <li key={'home-list'+index} className={styles.item + (index%2 != 0 ? (' '+styles.even):'')}></li>
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
    );
  }
  componentDidUpdate() {
    require('../../utils/plugin')
    require('../../utils/jquery.sly')
    var $frame  = $('#frame'),
      $slidee = $('#slidee'),
      $wrap = $frame.parent(),
      result = this.props.result;
    if(result && result.data && result.data.goodsList.length>0){
      $frame.sly({
        slidee:$slidee,
        itemNav: 'basic',
        smart: 2,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: 0,
        scrollBar: $wrap.find('.scrollbar'),
        scrollBy: 2,
        activatePageOn: 'click',
        speed: 300,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,
      });
    }

  }
  componentDidMount(){
    this.props.load();

  }
}
