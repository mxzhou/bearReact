import React, { Component,PropTypes } from 'react';

export default class Sly extends Component {
  static propTypes = {
    result: PropTypes.object.isRequired,
    height: PropTypes.string.isRequired
  }
  render() {
    const {height} = this.props; // eslint-disable-line no-shadow
    console.log(height)

    const styles = require('./Sly.scss');
    return (
      <div>
        <div className={styles.frame} id="frame" Style={{height:height}}>

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
      $wrap = $frame.parent(),
      result = this.props.result;

    console.log(result)
    if(result && result.data && result.data.goodsList.length>0){
      $frame.sly({
        itemNav: 'basic',
        smart: 2,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        startAt: 0,
        scrollBar: $wrap.find('.scrollbar'),
        scrollBy: 1,
        activatePageOn: 'click',
        speed: 300,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1
      });
    }

  }
}
