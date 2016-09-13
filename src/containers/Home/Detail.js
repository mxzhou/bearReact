import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { loadDetail } from '../../redux/modules/detail/detail';
import { loadDetailUser } from '../../redux/modules/detail/detail.user';
import { loading,unloading } from '../../redux/modules/loading';
import { Link } from 'react-router';
import Pay from './Detail/Pay';
@connect(
  state => ({result: state.detail.data,resultUser: state.detailUser.data,link:state.history.link}),
  {loadDetail, loadDetailUser, loading, unloading})
export default class Detail extends Component {

  static propTypes = {
    result: PropTypes.object,
    num: PropTypes.number,
    children: PropTypes.object.isRequired,
  }
  static defaultProps = {
    num: 1
  }
  // 构造器
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      num: props.num
    }
  }
  render() {
    const num = this.state.num
    const {result,resultUser} = this.props;
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
            <div className={homeStyles.right} id="frame">
              <div id="slidee">
                <div className={styles.title}>
                  <h3>{result.data.goodsName}</h3>
                  <p className={styles.desc}>{result.data.goodsDesc}</p>
                  <div className={styles.bar}>

                    <div className={styles.active} style={{width:((result.data.needNumber-result.data.surplusNumber)/result.data.needNumber)*100+'%'}}></div>
                  </div>
                  <p className={styles.number}><span className="f-fr">剩余: <em>{result.data.surplusNumber}</em></span><span className="f-fl">总需: {result.data.needNumber}</span></p>
                </div>
                {/* 奖品状态 */}
                { result.data.status == 3 &&
                  <div className={styles.countdown}>
                    <p>期号：{result.data.id}</p>
                    <h3>揭晓倒计时 00:08:13</h3>
                  </div>
                }
                { result.data.status == 3 &&
                  <div className={styles.winner}>
                    <div className={styles.userPic}>
                       <img src={result.data.coverImgUrl}/>
                    </div>
                    <h4>获奖者：<span className={styles.winnerName}>是第三方的</span></h4>
                    <p style={{color:'#AAA'}}>（中国广东 IP：12423424234）</p>
                    <p>用户ID: 2434234</p>
                    <p>本期参与: <span className={styles.red}>234432</span> 人次</p>
                    <p>本期期号: 2434234</p>
                    <p>揭晓时间: 2434234</p>
                    <div className={styles.luckyNum}>
                        <a className="f-fr">计算详情&gt;</a>
                        幸运号码：10004435
                    </div>
                  </div>
                }
                { result.data.status == -1 &&
                  <div className={styles.goodsDisabeld}>
                    商品已下架
                  </div>
                }
                {/* 是否参与 */}
                { result.data.status == 0 && resultUser && resultUser.data.joinFlag &&
                  <div className={styles.codes}>
                    <p><span className={styles.title}>你参与了：</span><i>{resultUser.data.joinNumber}</i>人次</p>
                    <p><span className={styles.title}>夺宝号码：</span>
                      {
                        resultUser.data.joinCodeList.map((item,index) =>
                          <em key={'detail'+index} className={index>=11?'hideCodeItem':'showCodeItem'} style={{display:index>=11?'none':'inline-block'}}>{item}</em>
                        )
                      }
                    </p>
                    {
                      resultUser.data.joinCodeList.length > 12 &&
                      <a className={styles.showMore} data-len={resultUser.data.joinCodeList.length} onClick={this.showAllCodes.bind(this)}>查看全部</a>
                    }
                  </div>
                }
                <div className={styles.tabNav}>
                  <Link to={{pathname:'/home/detail/goods',query:{id:this.props.location.query.id,goodsId:result.data.goodsId}}} activeClassName={styles.active}>
                    <span>图文详情</span>
                  </Link>
                  <Link to={{pathname:'/home/detail/join',query:{id:this.props.location.query.id,goodsId:result.data.goodsId}}} activeClassName={styles.active}>
                    <span>夺宝参与记录</span>
                  </Link>
                  <Link to={{pathname:'/home/detail/past',query:{id:this.props.location.query.id,goodsId:result.data.goodsId}}} activeClassName={styles.active}>
                    <span>往期揭晓</span>
                  </Link>
                </div>
                <div className={styles.detail}>
                 {this.props.children}
                </div>
              </div>
            </div>
            <div id="btnBottomArea" className={styles.btnBottomArea}>
              <div className="f-fr">
                <a className={styles.btn+' '+styles.active} onClick={this.showPay.bind(this)}>立即夺宝</a>
              </div>
              <div className="f-fl">
              <span className="f-fl">参与人数</span>
                <a className={styles.btn+' '+styles.left} onClick={this.minus.bind(this)}>-</a>
                <input type="text" value={num} onChange={this.changeNum.bind(this)} />
                <a className={styles.btn+' '+styles.right} onClick={this.plus.bind(this)}>+</a>
                <a className={styles.btn+' '+styles.all} onClick={this.addAll.bind(this)}>包尾</a>
              </div>
            </div>
            <Pay money={num} ref="pay"></Pay>
            <div className="scrollbar">
              <div className="handle">
                <div className="mousearea"></div>
              </div>
            </div>
            <a className={styles.btnBack} onClick={this.backFunc.bind(this)}><img src={iconBack}/></a>
          </div>
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
  backFunc(){
    const {link} = this.props;
    location.href="#/"+link;
  }
  plus (e) {
    e.preventDefault()
    let needNumber = this.props.result.data.needNumber
    let num = this.state.num
    if(num<needNumber){
      this.setState({num: num-1+2});
    }
  }
  minus (e) {
    e.preventDefault()
    let num = this.state.num
    if(num>1){
      this.setState({num: this.state.num-1});
    }
  }
  changeNum (e) {
    let val = e.target.value
    let needNumber = this.props.result.data.needNumber
    if(val>0 && val < needNumber){
     this.setState({num: parseInt(e.target.value)});
    }
  }
  addAll (e) {
    let needNumber = this.props.result.data.needNumber
    this.setState({num: needNumber});
  }
  showPay (e) {
    console.log(this.refs.pay)
    $('#payBlock').animate({top:215,opacity:1},300)
    $('#btnBottomArea').animate({top: 500,opacity:0},300)
  }
  showAllCodes (e) {
    let $this = $(e.target)
    if($this.text()=='查看全部'){
      $('em.hideCodeItem').css('display','')
      $this.text('收起')
      if($this.attr('data-len')%6==0){
        $this.css({'position':'relative','margin-left':'94%','bottom':0,'right':0})
      }
    }else{
      $('em.hideCodeItem').css('display','none')
      $this.text('查看全部').css({'position':'absolute','margin-left':'0%','bottom':11,'right':10})
    }
  }
  componentDidMount(){
    console.log('componentDidMount')
    this.props.loading()
    this.props.loadDetail({id:this.props.location.query.id})
    this.props.loadDetailUser({id:this.props.location.query.id})
  }
  componentWillUpdate () {
    this.props.unloading()
  }
  componentDidUpdate () {
    this.swiperInit()
    if($('em.hideCodeItem').length==1){
      $('em.hideCodeItem').css('display','')
    }
    require('../../utils/plugin')
    require('../../utils/jquery.sly')
    setTimeout(() =>{
      var $frame  = $('#frame'),
        $slidee = $('#slidee'),
        $wrap = $frame.parent();
      $frame.sly({
        slidee:$slidee,
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
    },200)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  swiperInit() {
    if(this.timer==null) {
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
          $swiperList.animate({'margin-left':-idx*270})
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
        $swiperList.animate({'margin-left':-idx*270})
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
}
