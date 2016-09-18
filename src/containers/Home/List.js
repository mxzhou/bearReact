import React, { Component,PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux';
import { load } from 'redux/modules/home';
import { loading,unloading } from '../../redux/modules/loading';
import { loadToast,removeToast } from '../../redux/modules/toast';
import Single from './Single'
import { Paging } from '../../components/index'
import { Link } from 'react-router';
import {slyFunc} from '../../utils/sly'

@connect(
  state => ({result: state.home.data}),
  {load,loading,unloading,loadToast,removeToast})
export default class List extends Component {

  static propTypes = {
    result: PropTypes.object,
    pageSize: PropTypes.number,
  };
  static defaultProps = {
    pageSize: 10,
  };
  componentWillMount(){
  }
  render() {
    const {result,pageSize} = this.props;
    const styles = require('./Home.scss');

    return (
      <div className={styles.home}>
        <div className={styles.section}>
          <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500}>
              <div className={styles.content}>
                <div className={styles.homeList}>
                  <div className={styles.frame} id="frame">
                    <ul className={styles.list+' f-cb'} id="slidee">
                      {
                        result && result.data && result.data.goodsList.map((item,index) =>
                          <Single key={'home-list'+index} item={item} index={index}></Single>
                        )
                      }
                    </ul>
                  </div>
                  { result &&
                    <Paging total={result.data.total} pageSize={pageSize} onLoadPaging={this.loadPaging.bind(this)} ></Paging>
                  }
                  <div className="scrollbar" id="scrollbar">
                    <div className="handle">
                      <div className="mousearea"></div>
                    </div>
                  </div>
                </div>
              </div>
            </ReactCSSTransitionGroup>
          </div>
        </div>
    );
  }
  loadPaging (nums) {
    this.props.loading()
    this.props.load({type:0,pageSize:this.props.pageSize,pageNumber:nums});
  }
  componentDidMount(){
    this.props.loading()
    this.loadPaging(1);
  }
  componentWillUpdate(){
    this.props.unloading()

  }
  componentDidUpdate() {
    var result = this.props.result;
    if(result && result.data && result.data.goodsList.length>0){
      slyFunc({bLoadMore : false, parataxis :2})
    }
  }
  componentWillUnmount(){

  }
}
