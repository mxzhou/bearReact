import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink,Link } from 'react-router';
import { load as loadMask,unload} from '../../../redux/modules/mine/mask';
import { loadCodes} from '../../../redux/modules/mine/join';

import marker from '../../../../static/assets/btn_select.png'
import aMarker from '../../../../static/assets/btn_select_a.png'
@connect(
  state => ({data:state.join.code}),
  {loadMask,unload,loadCodes})

export default class JoinDetail extends Component {
  static propTypes = {
  };
  static defaultProps = {
    bSelect:true
  }
  // 构造器
  constructor(props, context) {
    super(props, context);

    // 在这里设置初始出台
    this.state = {
      bSelect:props.bSelect
    }
  }
  selectNum(index){
    this.setState({numIndex:index})
  }
  selectType(index){
    this.setState({typeIndex:index})

  }
  checkFunc(){
    this.setState({
      bSelect:!this.state.bSelect
    })
  }
  focusFunc(){
  }
  submitFunc(){
  }
  closeHandler(){
    history.back()
  }
  render() {
    const {data} = this.props
    const {bSelect} = this.state;

    const styles = require('../Mine.scss')
    const back = require('../../../../static/assets/ic_backpage.png')

    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Link to="/mine"><img src={back} className={styles.close} onClick={this.closeHandler.bind(this)}/></Link>
          查看夺宝号
        </h3>
        <div className={styles.secondContent +' f-cb'}>
          {data && data.data != null && data.data.map((item,i)=>
          <div key={i} className={styles.item}>
            {item}
          </div>)}
        </div>
      </div>
    );
  }
  componentDidMount(){
    this.props.loadMask()
    this.props.loadCodes(this.props.params.id)
  }
}