import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from '../../../redux/modules/mine/join';
import Close from './Close';
import { loading,unloading } from '../../../redux/modules/loading';
import { Link } from 'react-router';
import {slyFunc} from '../../../utils/sly'
import introduction from '../../../assets/img_introductionpic.jpg'
@connect(
  state => ({result: state.join.data}),
  {load, loading, unloading})
export default class Intro extends Component {

  static propTypes = {
    result: PropTypes.object
  };
  static defaultProps = {
    payType: {
      1: '微信',
      2: '支付宝'
    },
    payStatus: {
      1: '已支付'
    },
    orderStatus: {
      '0': '恭喜您获得商品',
      '1': '等待奖品派发',
      '2': '奖品已派发',
      '3': '已发货',
      '5': '已晒单'
    },
    navList: [
      {name: '物流信息'},
      {name: '系统信息'},
    ],
    activeIndex: 0
  }

  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      activeIndex: props.activeIndex
    }

  }

  formData(time) {
    let tmpDate = new Date(time);
    let year = tmpDate.getFullYear();
    let month = tmpDate.getMonth() + 1;
    month = month < 10 ? ('0' + month) : month;
    let day = tmpDate.getDate();
    day = day < 10 ? ('0' + day) : day;
    let hours = tmpDate.getHours();
    hours = hours < 10 ? ('0' + hours) : hours;

    let minutes = tmpDate.getMinutes();
    minutes = minutes < 10 ? ('0' + minutes) : minutes;

    let seconds = tmpDate.getSeconds();
    seconds = seconds < 10 ? ('0' + seconds) : seconds;

    return year + '.' + month + '.' + day + ' ' + hours + ':' + minutes + ':' + seconds
  }

  changeType(index) {
    this.setState({activeIndex: index})
    this.props.loading()
    this.props.load()
  }

  render() {
    const {result,payType,payStatus,orderStatus,navList} = this.props;
    const {activeIndex} = this.state;
    const styles = require('../Mine.scss');
    const close = require('../../../assets/ic_closepage.png')
    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Close></Close>
          夺宝说明
        </h3>
        <div className={"f-pr "+styles.mHelp}>
          <div id="frame" className={styles.frame+' scroll'}>
            <ul className={styles.introUl} id="slidee">
              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>1.怎样参加胖熊1元买？</div>
                <div className={styles.helpContent + ' j-content'}>
                  <img src={introduction}/>
                </div>
              </li>
              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>2.胖熊1元买是怎么计算幸运号码的？</div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>1、取该商品最后购买时间前网站所有商品100条购买时间记录（限时揭晓商品取截止时间前网站所有商品100条购买时间记录）</p>
                  <p>2、时间按时、分、秒、毫秒依次排列组成一组数值。 例如：15:13:14.334换算成数值为151314334</p>
                  <p>3、将这100组数值之和除以商品总需参与人次后取余数，余数加上10,000,001即为“幸运号”。</p>
                </div>
              </li>
              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>
                  3.怎样查看是否获得商品？
                </div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>个人中心有您的夺宝记录，点击对应的记录，即可知道该期夺宝的获得者；</p>
                  <p>如果您获得商品，将会有系统消息推送、短信等方式的通知。</p>
                </div>
              </li>

              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>
                  4.如何领取获得的商品？
                </div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>在您获得商品后会收到应用推送通知，如果验证了手机，还会有短信通知。</p>
                  <p>收到通知后，请到个人中心填写真实的收货地址，完善或确认您的个人信息，以便我们为您派发获得的商品。</p>
                </div>
              </li>
              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>
                  5.商品是正品吗？怎么保证？
                </div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>胖熊1元买所有商品均由繁星公司或经繁星公司确认的第三方商家提供及发货，100%正品，可享受厂家所提供的全国联保服务。</p>
                </div>
              </li>
              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>
                  6.我收到的商品可以换货或者退货吗？
                </div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>非质量问题，不在三包范围内，不给予退换货</p>
                  <p>请尽量亲自签收并当面拆箱验货，如果发现运输途中造成了商品的损坏，请不要签收，可以拒签退回。</p>
                  <p>如有质量问题，请先联系客服，沟通后填写换货卡寄回指定换货地址。</p>
                </div>
              </li>
              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>
                  7.如果一件商品很久都没达到总需人次怎么办？
                </div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>若某件商品的夺宝号码从开始分配之日起90天未分配完毕，则繁星公司有权取消该件商品的夺宝活动，并向用户退还夺宝币，所退还夺宝币将在3个工作日内退还至用户账户中。</p>
                </div>
              </li>
              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>
                  8.参与胖熊1元买需要注意什么？
                </div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>为了确保在您获得商品后第一时间收到通知，请务必正确填写真实有效的联系电话和收货地址。</p>
                </div>
              </li>
              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>
                  9.网上支付未及时到账怎么办？
                </div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>网上支付未及时到帐可能有以下几个原因造成：</p>
                  <p>第一，由于网速或者支付接口等问题，支付数据没有及时传送到支付系统造成的；</p>
                  <p>第二，网速过慢，数据传输超时使银行后台支付信息不能成功对接，导致银行交易成功而支付后台显示失败；</p>
                  <p>第三，如果使用某些防火墙软件，有时会屏蔽银行接口的弹出窗口。</p>
                  <p>如果支付过程问题遇到问题，请与我们联系。</p>
                </div>
              </li>

              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>
                  10.什么是夺宝币？
                </div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>夺宝币是胖熊1元买的代币，用户每充值1元，即可获得1个夺宝币；</p>
                  <p>1个夺宝币可以直接购买1个夺宝号码。</p>
                </div>
              </li>
              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>
                  11.夺宝币是否可以提现？
                </div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>很抱歉，夺宝币无法提现</p>
                </div>
              </li>
              <li className="">
                <div href="javascript:" className={styles.helpTitle + ' j-title'}>
                  12.您付款遇到问题了？看看是不是由于以下原因
                </div>
                <div className={styles.helpContent + ' j-content'}>
                  <p>问题一：支付平台（例如支付宝、微信、网银等）已经扣款，但夺宝币余额没有增加？</p>
                  <p>
                    答：请您不用担心，如果是因为银行单边账等原因造成的上述问题，已付款项将会在5-7个工作日内原路退回到您的银行账户；如果是因为银行网络延迟等原因造成的上述问题，则已付款项将会在会在5-7个工作日内以余额形式充值到您的1元买账户。</p>
                  <p>问题二：支付平台（支付宝、微信、网银等）已经扣款，但没有获得夺宝号码？</p>
                  <p>答：这是因为支付完成时当期商品的夺宝号码已经分配完毕，该笔款项将在24小时内以余额形式充值到您的1元买账户，请在“个人中心>账户余额”中查看。</p>
                  <p>问题三：支付平台重复多次付款了该怎么办？</p>
                  <p>答：由于支付平台没有即时传输数据给胖熊1元买，造成您在支付平台被重复扣款。不过请放心，胖熊1元买将在和支付平台对账确认您的付款后，将重复支付款项原路退回到您的支付平台账户。</p>
                </div>
              </li>
              {/*<li className="">
               <div href="javascript:" className={styles.helpTitle + ' j-title'}>
               13.所有活动以及商品均与苹果公司无关
               </div>
               <div className={styles.helpContent + ' j-content'}>
               <p>通过本产品（胖熊一元买）所从事的任何活动以及获得的任何商品均与苹果公司无关。苹果公司既不作为赞助商也不以任何形式参与。</p>
               </div>
               </li>
               <li className="">
               <div href="rule.html">
               14.用户使用条款
               </div>
               </li>*/
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    slyFunc({bLoadMore: false})
    $(".j-title").off().on('click',function(){
      var i = $(this).closest('li').index();
      $(this).toggleClass('helpActive')
      $(this).closest('li').find('.j-content').toggle(200);
      slyFunc({bLoadMore: false,lLeng:i})
    })
  }
}
