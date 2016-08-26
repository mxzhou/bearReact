import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { load } from 'redux/modules/home';
import {Scrollbars} from 'react-custom-scrollbars'

@connect(
  state => ({result: state.home.data}),
  {load})
export default class Home extends Component {

  static propTypes = {
    result: PropTypes.object.isRequired,
  };
  render() {
    const {result} = this.props;
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        <ul className={styles.list+' f-cb'}>
          {
            result && result.data && result.data.goodsList.map((item,index) =>
              <li key={index} className={styles.item + (index%2 != 0 ? (' '+styles.even):'')}></li>
            )
          }
        </ul>
      </div>
    );
  }
  componentDidMount(){
    this.props.load();
  }
}
