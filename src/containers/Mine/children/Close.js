import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { load as loadMask,unload} from '../../../redux/modules/mine/mask';

@connect(
  state => ({}),
  {loadMask,unload})
export default class Close extends Component {
  static propTypes = {
  };
  static defaultProps = {
  }
  closeHandler(){
    this.props.unload();
  }
  render() {
    const styles = require('../Mine.scss');
    const close = require('../../../../static/assets/ic_closepage.png')
    return (
      <Link to="/mine"><img src={close} className={styles.close} onClick={this.closeHandler.bind(this)}/></Link>
    );
  }
  componentDidMount() {
    this.props.loadMask()
  }
}
