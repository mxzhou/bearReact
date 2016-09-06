import React, {Component, PropTypes} from 'react';
import { IndexLink,Link } from 'react-router';
export default class NavBar extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
  }

  render() {
    const {list} = this.props; // eslint-disable-line no-shadow
    const tap1 = require('../../../static/assets/ic_tap1.png');
    const tap2 = require('../../../static/assets/ic_tap2.png');
    const tap3 = require('../../../static/assets/ic_tap3.png');

    const styles = require('./NavBar.scss');
    return (
      <ul className={styles.navBar}>
        {
          list && list.map((item,index) =>
            <li key={'nav-bar'+index}>
              <Link to={'/'+item.link} className={styles.nav+(index == 2 ? ' '+styles.last : '')} activeClassName={styles.active}>
                {index == 0 && <em className={styles.tap + ' '+styles.tap0 + ' f-ib'}></em>}
                {index == 1 && <em className={styles.tap + ' '+styles.tap1 + ' f-ib'}></em>}
                {index == 2 && <em className={styles.tap + ' '+styles.tap2 + ' f-ib'}></em>}
                {item.name}
              </Link>
            </li>
          )
        }
      </ul>
    );
  }
}
