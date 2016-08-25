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
            (index == 0 ?
              <li>
                <IndexLink key={String(item.name)} to={'/'} className={styles.nav} activeClassName={styles.active}>
                  <img src={tap1} className={styles.tap}/>{item.name}
                </IndexLink>
              </li>
              :
              <li>
                <Link key={String(item.name)} to={'/'+item.link} className={styles.nav} activeClassName={styles.active}>
                  <img src={index == 1 ? tap2 : tap3} className={styles.tap}/>{item.name}
                </Link>
              </li>)
          )
        }
      </ul>
    );
  }
}
