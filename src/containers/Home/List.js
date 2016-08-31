import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from 'redux/modules/home';
import { loading,unloading } from '../../redux/modules/loading';
import { loadToast,removeToast } from '../../redux/modules/toast';
import Single from './Single'
import { Link } from 'react-router';
@connect(
  state => ({result: state.home.data}),
  {load,loading,unloading,loadToast,removeToast})
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
      <div className={styles.home}>
        <div className={styles.section}>
            <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeaveTimeout={300} transitionAppearTimeout={300} transitionEnterTimeout={300}>
              <div className={styles.content}>
                <div className={styles.homeList}>
                  <div className={styles.frame} id="frame">
                    <ul className={styles.list+' f-cb'} id="slidee">
                      {
                        result && result.data && result.data.goodsList.map((item,index) =>
                          <Single key={'home-list'+index} item={item} index={index}></Single>
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
        </div>
    );
  }

  componentDidMount(){
    console.log('componentDidMount')
    this.props.loading()
    this.props.loadToast('11225444')

    this.props.load();

  }
  componentWillUpdate(){
    this.props.unloading()
    console.log('componentWillUpdate')

  }
  componentDidUpdate() {
    require('../../utils/plugin')
    require('../../utils/jquery.sly')
    setTimeout(() =>{
      var $frame  = $('#frame'),
        $slidee = $('#slidee'),
        $wrap = $frame.parent(),
        result = this.props.result;

      if(result && result.data && result.data.goodsList.length>0){
        $frame.sly({
          slidee:$slidee,
          parataxis:2,
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
