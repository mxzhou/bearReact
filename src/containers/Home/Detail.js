import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from '../../redux/modules/detail';
import { loading,unloading } from '../../redux/modules/loading';
import Swiper from './Swiper'
import { Link } from 'react-router';
@connect(
  state => ({result: state.detail.data}),
  {load,loading,unloading})
export default class Detail extends Component {

  static propTypes = {
    result: PropTypes.object,
  };
  handleClick(item){
    console.log(item)
  }
  render() {
    const {result} = this.props;
    const homeStyles = require('./Home.scss');
    const styles = require('./Detail.scss');
    const iconBack = require('../../../static/assets/ic_backpage.png');
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeaveTimeout={300} transitionAppearTimeout={300} transitionEnterTimeout={300}>
          { result && 
          <div className={homeStyles.homeDetail +' f-cb'}>
            <div className={homeStyles.left}>
              <div className={styles.swiper}>
                <ul className={styles.item} id="swiperList">
                  {
                    result.data.goodsImgList.map((item,index) =>
                      <li key={'detail'+index}><img src={item.goodsImgUrl}/></li>
                    )
                  }
                </ul>
              </div>
              <ul className="point" id="swiperPage">
                {
                  result.data.goodsImgList.map((item,index) =>
                    <li key={'detail-item'+index} className={index==0?'active':''}></li>
                  )
                }
              </ul>
            </div>
            <div className={homeStyles.right}>
              <div className={styles.title}>
                <h3>{result.data.goodsName}</h3>
                <p className={styles.desc}>{result.data.goodsDesc}</p>
                <div className={styles.bar}>

                  <div className={styles.active} style={{width:((result.data.needNumber-result.data.surplusNumber)/result.data.needNumber)*100+'%'}}></div>
                </div>
                <p className={styles.number}><span className="f-fr">剩余: <em>{result.data.surplusNumber}</em></span><span className="f-fl">总需: {result.data.needNumber}</span></p>
              </div>              
            </div>
            <a className={styles.btnBack} id="btnBack"><img src={iconBack}/></a>
          </div>
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
  componentDidUpdate() {

  }
  componentDidMount(){
    console.log('componentDidMount')
    this.props.loading()
    this.props.load()
  }
  componentWillUpdate(){
    this.props.unloading()
  }
  componentDidUpdate () {
    this.swiperInit()
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  swiperInit() {
    $('#btnBack').on('click',function(){
      history.back()
    })
    let $swiperList = $('#swiperList')
    let $swiperPage = $('#swiperPage')
    let len = $swiperList.find('li').length
    let idx = 0
    this.timer = setInterval(autoMove,3000)
    function autoMove(){
      if(idx < len-1){
        idx++
        $swiperList.animate({'margin-left':-idx*290})
        $swiperPage.find('li').eq(idx).addClass('active').siblings('li').removeClass('active')
      }else{
        idx = 0
        $swiperList.animate({'margin-left':0})
        $swiperPage.find('li').eq(0).addClass('active').siblings('li').removeClass('active')
      }
    }
    let _this = this;
    $swiperPage.find('li').on('click',function(){
      clearInterval(_this.timer)
      _this.timer = setInterval(autoMove,3000)
      idx = $(this).index()
      $swiperList.animate({'margin-left':-idx*290})
      $swiperPage.find('li').eq(idx).addClass('active').siblings('li').removeClass('active')
    })
    $swiperList.on('mouseover',function(){
      clearInterval(_this.timer)
    })
    $swiperList.on('mouseout',function(){
      _this.timer = setInterval(autoMove,3000)
    })
  }
}
