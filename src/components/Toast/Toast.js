import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { loading,unloading } from '../../redux/modules/loading';

@connect(
  state => ({show: state.loading.show}),
  {loading,unloading})
export default class Loading extends Component {
  static propTypes = {
    text: PropTypes.string,
    show: PropTypes.boolean
  }
  handlerFunc(){
    this.props.unloading()
  }
  render() {
    const {text,show} = this.props; // eslint-disable-line no-shadow
    const text2 = text || '';
    const styles = require('./Toast.scss');
    return (
      <div style={{'display':show ? 'block':'none'}} onClick={this.handlerFunc.bind(this)}>
        <div className={styles.mask}></div>
        <div className={styles.content}>
          <div className={styles.toast}>
            <p className={styles.p}>{text2}</p>
          </div>
        </div>
      </div>
    );
  }
}
