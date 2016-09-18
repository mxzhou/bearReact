import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { loadAlert,removeAlert } from '../../redux/modules/alert';
@connect(
  state => ({show: state.alert.show}),
  {loadAlert,removeAlert})
export default class Alert extends Component {
  static propTypes = {
    text: PropTypes.string,
    onClose:PropTypes.func
  }
  static defaultProps = {
    text:'',
    onClose(){},
    btn1:'确定',
    btn2:'取消'
  }
  handlerFunc(){
    this.props.removeAlert()
  }
  sureFunc(){
    this.props.removeAlert();
    this.props.onClose()
  }
  cancelFunc(){
    this.props.removeAlert()
  }
  render() {
    const {text,show,btn1,btn2} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Alert.scss');
    const display = show ? 'block':'none';
    return (
      <div style={{'display':display}} onClick={this.handlerFunc.bind(this)}>
        <div className={styles.mask}></div>
        <div className={styles.alert}>
          <div className={styles.content}>
            {text}
          </div>
          <div className={styles.foot}>
            <a className={styles.button + ' ' +styles.single} onClick={this.sureFunc.bind(this)}>{btn1}</a>
            <a className={styles.button} onClick={this.cancelFunc.bind(this)}>{btn2}</a>
          </div>
        </div>
      </div>
    );
  }
}
