import React, {Component, PropTypes} from 'react';
import { IndexLink,Link } from 'react-router';
export default class NavBar extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
  }

  render() {
    const {list} = this.props; // eslint-disable-line no-shadow
    const styles = require('./NavBar.scss');

    return (
      <ul className={styles.navBar}>
        {
          list && list.map((item,index) =>
            <li key={'nav-bar'+index}>
              {index == 0 && <IndexLink to="/" className={styles.nav+(index == 2 ? ' '+styles.last : '')} activeClassName={styles.active}><em className={styles.tap + ' '+styles.tap0 + ' f-ib'}></em>{item.name}</IndexLink>}
              { index != 0 &&
                <Link to={'/'+item.link} className={styles.nav+(index == 2 ? ' '+styles.last : '')} activeClassName={styles.active}>
                  {index == 1 && <em className={styles.tap + ' '+styles.tap1 + ' f-ib'}></em>}
                  {index == 2 && <em className={styles.tap + ' '+styles.tap2 + ' f-ib'}></em>}
                  {item.name}
                </Link>
              }
            </li>
          )
        }
      </ul>
    );
  }
}
