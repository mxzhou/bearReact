import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { loadToast,removeToast } from '../../redux/modules/toast';

@connect(
  state => ({show: state.toast.show,text:state.toast.text,time:state.toast.time}),
  {loadToast,removeToast})
export default class Toast extends Component {
  static propTypes = {
    text: PropTypes.string
  }
  static defaultProps = {
    time:2000,
  }
  handlerFunc(){
    this.props.removeToast()
  }
  timeOut(){
    const {time} = this.props;
    setTimeout(()=>{
      this.props.removeToast()
    },time)
  }
  render() {
    const {text,show} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Toast.scss');
    const display = show ? 'block':'none';
    if(show){
      this.timeOut()
    }
    return (
      <div style={{'display':display}} onClick={this.handlerFunc.bind(this)}>
        <div className={styles.mask}></div>
        <div className={styles.content}>
          <div className={styles.toast}>
            <p className={styles.p}>{text}</p>
          </div>
        </div>
      </div>
    );
  }
  componentDidUpdate(){

  }
  componentDidMount(){
  }
}
