import React, { Component,PropTypes } from 'react';
import { load as loadMask,unload} from '../../redux/modules/mine/mask';
import { connect } from 'react-redux';
@connect(
  state => ({}),
  {unload})
export default class Home extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };
  render() {
    this.props.unload()
    return (
      <div id="Mine">
        {this.props.children}
      </div>
    );
  }
}
