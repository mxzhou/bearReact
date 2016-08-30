import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { connect } from 'react-redux';
import { load } from 'redux/modules/home';
import { Link } from 'react-router';
@connect(
  state => ({result: state.home.data}),
  {load})
export default class Detail extends Component {

  static propTypes = {
    result: PropTypes.object,
  };
  handleClick(item){
    console.log(item)
  }
  render() {
    const {result} = this.props;
    const styles = require('./Home.scss');

    return (
      <div>
        <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionLeaveTimeout={300} transitionAppearTimeout={300} transitionEnterTimeout={300}>
          <div className={styles.homeDetail +' f-cb'}>
            <div className={styles.left}>

            </div>
            <div className={styles.right}>

            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
  componentDidUpdate() {

  }
  componentDidMount(){
    //alert(this.props.params.id)
  }
}
