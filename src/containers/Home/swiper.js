import React, { Component,PropTypes } from 'react';
import { Link } from 'react-router';
export default class Swiper extends Component {

  static propTypes = {
    list: PropTypes.object,
  };
  render() {
    const {list,index} = this.props;
    const styles = require('./Home.scss');
    console.log('listRender');
    console.log(list)
    return (
      <li>
        <div>
        
        </div>
      </li>
    );
  }
}
