import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class Pay extends Component {
  static propTypes = {
    result: PropTypes.object,
    time: PropTypes.number
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      time: props.time,
    }
  }
  render () {
    const {time} = this.state;
    const {result} = this.props;
    const styles = require('../Detail.scss');

    return (
    	<div>
	    	<div className={styles.countdown}>
            <p>期号：{result.data.id}</p>
            <h3>{time<=0 ? '':'揭晓倒计时'} {time<=0?'正在揭晓':time} </h3>
          </div>
    	</div>
    );
  }
  begin () {
    let minus = Date.now() - this.timetag;
    if (minus >= 10) {
      this.times = this.times - minus;
      if (this.times<=0) {
        this.remain_minute = this.remain_sec = this.remain_hour = 0;
        this.setState({time: -1});
        this.loadData()
        return;
      }
      this.timetag = Date.now();
      let minutes = parseInt(this.times/60000)
      let seconds = parseInt((this.times-minutes*60000)/1000)
      let milliseconds = parseInt((this.times-minutes*60000-seconds*1000)/10)
      this.setState({time: this.intNum(minutes)+':'+this.intNum(seconds) +':'+this.intNum(milliseconds)});
    }
    if(this.times > 0){
      this.reqAni = window.requestAnimationFrame(this.begin.bind(this));
    }else{
      window.cancelAnimationFrame(this.reqAni);
    }
  }
  countDownFunc(){
    this.times = this.props.result.data.startTime+3*60*1000-this.props.result.servertime;
    this.timetag = Date.now(); // 上一帧的时间
    this.reqAni = window.requestAnimationFrame(this.begin.bind(this));
  }
  componentDidMount(){
    if(this.props.result.data.status!=3){
      return;
    }
    this.countDownFunc()
  }
  componentWillMount () {

  }
  componentWillUnmount () {
    this.setState({time:0})
    window.cancelAnimationFrame(this.reqAni);
  }
  componentDidUpdate () {
    
  }
  intNum (num) {
    return num < 10 ? '0'+num:num
  }

}
