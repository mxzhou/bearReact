import React, { Component,PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink,Link } from 'react-router';
import { load as loadMask,unload} from '../../../redux/modules/mine/mask';
import marker from '../../../assets/btn_select.png'
import aMarker from '../../../assets/btn_select_a.png'
@connect(
  state => ({}),
  {loadMask,unload})

export default class PayEnd extends Component {
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
    const {numPayList,typePayList} = this.props
    const {bSelect} = this.state;

    const styles = require('../Mine.scss')
    const back = require('../../../assets/ic_backpage.png')

    return (
      <div className={styles.content}>
        <h3 className={styles.title + ' f-cb'}>
          <Link to="/mine"><img src={back} className={styles.close} onClick={this.closeHandler.bind(this)}/></Link>
          充值
        </h3>
        <div></div>
      </div>
    );
  }
  componentDidMount(){
    this.props.loadMask()
  }
}