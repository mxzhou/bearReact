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
    const text2 = text || '加载中。。。';
    const loading = require('../../../static/assets/loading.gif');

    const styles = require('./Loading.scss');
    return (
      <div style={{'display':show ? 'block':'none'}} onClick={this.handlerFunc.bind(this)}>
        <div className={styles.mask}></div>
        <div className={styles.content}>
          <div className={styles.loading}>
            <img src={loading} className={styles.img}/>
            <p className={styles.p}>{text2}</p>
          </div>
        </div>
      </div>
    );
  }
}
