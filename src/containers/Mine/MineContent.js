import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import Left from './Left';
import { load,unload } from '../../redux/modules/mine/mask';

@connect(
  state => ({show:state.mask.show}),
  {load,unload})

export default class Mine extends Component {
  static propTypes = {

  };
  static defaultProps = {
    show:false
  }
  render() {
    const styles = require('./Mine.scss');
    const wallet = require('../../assets/ic_wallet.png')
    const msg = require('../../assets/ic_msg.png')
    const {show} =this.props;
    return (
      <div className={styles.mine + ' f-cb'}>
        <ReactCSSTransitionGroup transitionName="example"  transitionAppear={true} transitionAppearTimeout={500}>
          <div className={styles.left}>
            <div className={styles.mask} style={{display:show ? 'block':'none'}}  onClick={this.closeHandler.bind(this)}></div>
            <Left></Left>
          </div>
          <div className={styles.shadow}></div>
          <div className={styles.right}>
            {this.props.children}
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
  closeHandler () {
    history.back()
  }
  componentWillUpdate(){

  }
  componentDidUpdate() {
    const path = this.props.location.pathname
    if(path == '/mine'){
      this.props.unload()
    }
  }
  componentDidMount(){
  }
}
