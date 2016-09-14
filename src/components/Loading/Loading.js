import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { loading,unloading } from '../../redux/modules/loading';

@connect(
  state => ({show: state.loading.show}),
  {loading,unloading})
export default class Loading extends Component {
  static propTypes = {
    text: PropTypes.string
  }
  static defaultProps ={
    text: '努力加载中。。。'
  }
  handlerFunc(){
    this.props.unloading()
  }
  render() {
    const {text,show} = this.props; // eslint-disable-line no-shadow
    const loading = require('../../assets/loading.gif');
    const display = show ? 'block':'none';
    const styles = require('./Loading.scss');
    return (
      <div style={{'display':display}} onClick={this.handlerFunc.bind(this)}>
        <div className={styles.mask}></div>
        <div className={styles.content}>
          <div className={styles.loading}>
            <img src={loading} className={styles.img}/>
            <p className={styles.p}>{text}</p>
          </div>
        </div>
      </div>
    );
  }
}
