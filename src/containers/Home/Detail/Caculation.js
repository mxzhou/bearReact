import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Pay extends Component {
  static propTypes = {
    result: PropTypes.object,
  }
  static defaultProps = {
    showTips1: false,
    showTips2: false,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      showTips1: props.showTips1,
      showTips2: props.showTips2,
    }
  }
  render () {
    const {showTips1,showTips2} = this.state;
    const {result} = this.props;
    const styles = require('./Caculation.scss');
    const close = require('../../../assets/ic_closepage.png')

    return (
    	<div id="caculationBlock" style={{display:'none'}}>
          <div className={styles.caculation}>
            <div className={styles.left}>
              <div className={styles.mask} onClick={this.closeHandler.bind(this)}></div>
            </div>
            { result && 
              <div className={styles.right + ' ' +styles.forCalculation}>
                <div className={styles.btnClose}><img src={close} onClick={this.closeHandler.bind(this)}/></div>
                  <div className={styles.title}>计算详情</div>
                  <div className={styles.caculationList + ' scroll'}>
                    <div className={styles.wrap}>
                      <div className={styles.calTitle}>
                        计算公式
                      </div>
                      <div className={styles.calContent}>
                        (数值A ÷ 商品所需分数) 取余数 + 10000001
                      </div>  
                      <a className="f-fr" onClick={this.showTips1.bind(this)}>详情</a>
                      <div className={styles.detail} style={{display:showTips1?'block':'none'}}>
                        <p>幸运号码计算方式：</p>
                        <p>1、取该商品最后购买时间前网站所有商品100条购买时间记录（限时揭晓商品取截止时间前网站所有商品100条购买时间记录）</p>
                        <p>2、时间按时、分、秒、毫秒依次排列组成一组数值。 例如：15:13:14.334换算成数值为151314334</p>
                        <p>3、将这100组数值之和除以商品总需参与人次后取余数，余数加上10,000,001即为“幸运号”。</p>
                      </div>
                    </div>
                    <div className={styles.wrap}>
                      <h2>数值A</h2>
                      <p>= 截止取该商品最后购买时间前网站所有商品100条购买时间记录</p>
                      <p>= <span className={styles.red}>{result.data.winCode}</span></p>
                      <a className="f-fr" onClick={this.showTips2.bind(this)}>详情</a>
                    </div>
                    <div className={styles.wrap} style={{display:showTips2?'block':'none'}}>
                      <table className={styles.table}>
                        <thead>
                          <th>酷买时间</th>
                          <th>转化值</th>
                          <th>会员</th>
                        </thead>
                        <tbody>
                          { result.data && result.data.buyList.length!=0 && 
                            <div> 
                              {
                                result.data.buyList.map((item,index) =>
                                  <tr key={'joiner-item'+index}>
                                    <td>{item.dateString}</td>
                                    <td><span className={styles.red}>{item.buyTime}</span></td>
                                    <td>{item.nickname}</td>
                                  </tr>
                                )
                              }
                            </div>
                          }
                        </tbody>
                      </table>
                    </div>
                    <div className={styles.wrap}>
                      <h2>计算结果</h2>
                      <p>幸运号码：<span className={styles.red}>{result.data.winCode}</span></p>
                    </div>
                  </div>
              </div>
            }
          </div>
    	</div>
    );
  }
  showTips1 (e) {
    if(this.state.showTips1){
      $(e.target).html('详情')
    }else{
      $(e.target).html('收起')
    }
    this.setState({showTips1:!this.state.showTips1})
  }
  showTips2 (e) {
    if(this.state.showTips2){
      $(e.target).html('详情')
    }else{
      $(e.target).html('收起')
    }
    this.setState({showTips2:!this.state.showTips2})
  }
  closeHandler () {
    $('#caculationBlock').hide();
  }
  componentDidMount(){
   
  }
  componentWillMount () {

  }
  componentWillUnmount () {
    
  }
  componentDidUpdate () {
    
  }

}
