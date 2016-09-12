import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { loadToast,removeToast } from '../../redux/modules/toast';

@connect(
  state => ({show: state.toast.show,text:state.toast.text}),
  {loadToast,removeToast})
export default class Toast extends Component {
  static propTypes = {
    text: PropTypes.string
  }
  handlerFunc(){
    this.props.removeToast()
  }
  render() {
    const {text,show} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Toast.scss');
    const display = show ? 'block':'none';

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
