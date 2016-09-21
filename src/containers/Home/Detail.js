import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { loadDetailUser } from '../../redux/modules/detail/detail.user';
import { loading,unloading } from '../../redux/modules/loading';
import { Link } from 'react-router';
import Pay from './Detail/Pay';
import CountDown from './Detail/CountDown';
import Caculation from './Detail/Caculation';
import {slyFunc} from '../../utils/sly'
import ApiClient from '../../helpers/ApiClient'

@connect(
  state => ({link:state.history.link}),
  { loading, unloading})
export default class Detail extends Component {

  static propTypes = {
    num: PropTypes.number,
    children: PropTypes.object.isRequired,
    time: PropTypes.string,
    resultUser: PropTypes.object,
    caculationResult: PropTypes.object,
  }
  static defaultProps = {
    num: 1,
    result: null,
    caculationResult: null,
    resultUser: null,
    result: null,
    link: 'home',
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      num: props.num,
      time: props.time,
      result: PropTypes.object,
      resultUser: PropTypes.object,
      caculationResult: props.caculationResult,
      result: PropTypes.object,
      link: props.link
    }
  }
  render() {
    const {num, result,resultUser,caculationResult, time, link} = this.state;
    const homeStyles = require('./Home.scss');
    const styles = require('./Detail.scss');
    const iconBack = require('../../assets/ic_backpage.png');
    return (
      <div>
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeaveTimeout={300} transitionAppearTimeout={300} transitionEnterTimeout={300}>
          { result && result.data &&
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
            <div className={homeStyles.right + " scroll"} id="scrollBlock">
              <div id="slidee">
                <div className={styles.title}>
                  <h3>{result.data.goodsName}</h3>
                  <p className={styles.desc}>{result.data.goodsDesc}</p>
                  { result.data.status != 3 && result.data.status != 5 &&
                      <div>
                        <div className={styles.bar}>
                          <div className={styles.active} style={{width:((result.data.needNumber-result.data.surplusNumber)/result.data.needNumber)*100+'%'}}></div>
                        </div>
                        <p className={styles.number}><span className="f-fr">剩余: <em>{result.data.surplusNumber}</em></span><span className="f-fl">总需: {result.data.needNumber}</span></p>
                      </div>
                  }
                </div>
                {/* 奖品状态 */}
                { result.data.status == 3 &&
                  <CountDown loadData={this.loadData.bind(this)} result={result}></CountDown>
                }
                { result.data.status == 5 &&
                  <div className={styles.winner}>
                    <div className={styles.userPic}>
                       <img src={result.data.winner.avatarUrl}/>
                    </div>
                    <h4>获奖者：<span className={styles.winnerName}>{result.data.winner.nickname}</span></h4>
                    <p style={{color:'#AAA'}}>（{result.data.winner.address} IP：{result.data.winner.ip}）</p>
                    <p>用户ID: {result.data.winner.kgUid}</p>
                    <p>本期参与: <span className={styles.red}>{result.data.winner.joinNumber}</span> 人次</p>
                    <p>本期期号: {result.data.id}</p>
                    <p>揭晓时间: {this.formateDate(result.data.winner.openTime)}</p>
                    <div className={styles.luckyNum}>
                        <a className="f-fr" onClick={this.showCaculation.bind(this)}>计算详情&gt;</a>
                        幸运号码：{result.data.winner.joinCode}
                    </div>
                  </div>
                }
                { result.data.status == -1 &&
                  <div className={styles.goodsDisabeld}>
                    商品已下架
                  </div>
                }
                {/* 是否参与 */}
                { resultUser && resultUser.data && resultUser.data.joinFlag &&
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
                  <Link to={{pathname:'/'+link+'/detail/goods',query:{id:this.props.location.query.id,goodsId:result.data.goodsId}}} activeClassName={styles.active}>
                    <span>图文详情</span>
                  </Link>
                  <Link to={{pathname:'/'+link+'/detail/join',query:{id:this.props.location.query.id,goodsId:result.data.goodsId}}} activeClassName={styles.active}>
                    <span>夺宝参与记录</span>
                  </Link>
                  <Link to={{pathname:'/'+link+'/detail/past',query:{id:this.props.location.query.id,goodsId:result.data.goodsId}}} activeClassName={styles.active}>
                    <span>往期揭晓</span>
                  </Link>
                </div>
                <div className={styles.detail}>
                 {this.props.children}
                </div>
                <div style={{height:'50px',clear:'both'}}></div>
              </div>
            </div>
            { result.data.status == 5 &&
              <Caculation result={caculationResult}></Caculation>
            }
            <div id="btnBottomArea" className={styles.btnBottomArea}>
              { result.data.status == -1 &&
                <div>
                  <div className="f-fr">
                    <Link className={styles.btn+' '+styles.active} to={'/'}>看看其他</Link>
                  </div>
                  <div className="f-fl">
                    <span className="f-fl">商品已下架</span>
                  </div>
                </div>
              }
              { (result.data.status == 5 || result.data.status == 3) &&
                <div>
                  <div className="f-fr">
                    <a className={styles.btn+' '+styles.active} onClick={this.goNew.bind(this,{id:0,goodsId:result.data.goodsId})}>立即前往</a>
                  </div>
                  <div className="f-fl">
                    <span className="f-fl">新的一期正在火爆进行中...</span>
                  </div>
                </div>
              }
              { result.data.status == 0 &&
                <div>
                  <div className="f-fr">
                    <a className={styles.btn+' '+styles.active} onClick={this.showPay.bind(this)}>立即夺宝</a>
                  </div>
                  <div className="f-fl">
                  <span className="f-fl">参与人数</span>
                    <a className={styles.btn+' '+styles.left} onClick={this.minus.bind(this)}>-</a>
                    <input id="money" type="text" ref="money" value={num} onChange={this.changeNum.bind(this)} />
                    <a className={styles.btn+' '+styles.right} onClick={this.plus.bind(this)}>+</a>
                    <a className={styles.btn+' '+styles.all} onClick={this.addAll.bind(this)}>包尾</a>
                  </div>
                </div>
              }
            </div>
            <Pay money={num} updateComponent={this.updateComponent.bind(this)} loadData={this.loadData.bind(this)} ref="pay" robId={result.data.id} goodsId={result.data.goodsId}></Pay>
            <a className={styles.btnBack} onClick={this.backFunc.bind(this)}><img src={iconBack}/></a>
          </div>
          }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
  showCaculation () {
    let robId = this.props.location.query.id
    const _this = this;
    const client = new ApiClient();
    _this.props.loading()
    client.get('/goods/'+robId+'/complete',{data:{id:robId}}).then(function(data) {
      _this.setState({caculationResult:data});
      _this.props.unloading()
    }, function(value) {
      _this.props.unloading()
    });
    $('#caculationBlock').show();
  }
  backFunc(){
    location.href="#/"+this.state.link;
  }
  goNew (params) {
    let goodsId = this.props.location.query.goodsId
    location.href = '#/'+this.state.link+'/detail/goods?id=0&goodsId='+goodsId
    this.props.loading()
    this.getNew = true
    this.loadData(0)
  }
  plus (e) {
    e.preventDefault()
    let surplusNumber = this.state.result.data.surplusNumber
    let num = this.state.num
    if(num<surplusNumber){
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
    let surplusNumber = this.state.result.data.surplusNumber
    if(val>0 && val < surplusNumber){
     this.setState({num: parseInt(e.target.value)});
    }
  }
  addAll (e) {
    let surplusNumber = this.state.result.data.surplusNumber
    this.setState({num: surplusNumber});
  }
  showPay (e) {
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
    this.times = 0
    this.setState({link:location.href.split('#/')[1].split('/')[0]});
    window.cancelAnimationFrame(this.reqAni);
    this.loadData()
  }
  updateComponent () {
    
  }
  loadData (id) {
    this.setState({num:1})
    let robId = this.props.location.query.id
    let goodsId = this.props.location.query.goodsId
    this.props.loading()
    const _this = this;
    const client = new ApiClient();
    if(id==0){
      robId = 0;
    }
    if(robId!=0){
      let time = 3000
      if(typeof _this.state.resultUser == 'function'){
        time = 0
      }else{
        time = 3000
      }
      setTimeout(function(){
        client.post('/goods/user',{data:{id:robId,goodsId:goodsId}}).then(function(data) {
          _this.setState({resultUser:data});
          if($('em.hideCodeItem').eq(0).css('display')!='none'){
            $('em.hideCodeItem').css('display','');
          }
        }, function(value) {
        });
      },time)
    }
    client.post('/goods/detail',{data:{id:robId,goodsId:goodsId}}).then(function(data) {
      _this.setState({result:data});
      if(id==0){
        client.post('/goods/user',{data:{id:data.data.id,goodsId:goodsId}}).then(function(data) {
          _this.setState({resultUser:data});
        }, function(value) {
        });
        setTimeout(function(){
          location.href = '#/'+_this.state.link+'/detail/goods?id='+data.data.id+'&goodsId='+goodsId
        },200)
      }
    }, function(value) {
     
    });
  }

  componentWillUpdate () {
    this.props.unloading()
  }
  componentDidUpdate () {
    let robId = this.props.location.query.id
    let goodsId = this.props.location.query.goodsId
    if(robId==0 && this.state.result.data){
      location.href = '#/'+this.state.link+'/detail/goods?id='+this.state.result.data.id+'&goodsId='+goodsId
    }
    
    this.swiperInit()
    if($('em.hideCodeItem').length==1){
      $('em.hideCodeItem').css('display','')
    }
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  formateDate (time) {
    let t = new Date(time)
    return t.getFullYear()+'-'+this.intNum(t.getMonth()+1)+'-'+this.intNum(t.getDate())+' '+this.intNum(t.getHours())+':'+this.intNum(t.getMinutes())+':'+this.intNum(t.getSeconds())+'.'+t.getMilliseconds()
  }
  intNum (num) {
    return num < 10 ? '0'+num:num
  }
  swiperInit() {
    let $swiperList = $('#swiperList')
    let $swiperPage = $('#swiperPage')
    if(this.timer==null && $swiperList.find('li').length !=0) {
      let len = $swiperList.find('li').length
      let idx = 0
      this.timer = setInterval(autoMove,3000)
      function autoMove(){
        if(idx < len-1){
          idx++
          $swiperList.animate({'margin-left':-idx*250})
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
        $swiperList.animate({'margin-left':-idx*250})
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
