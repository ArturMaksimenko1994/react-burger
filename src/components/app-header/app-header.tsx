import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, NavLink, useLocation} from 'react-router-dom';

import styles from './app-header.module.css';
import {FC} from "react";

const AppHeader: FC = () => {

  const location = useLocation();

  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <div className={styles.row}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={`${styles.item} pb-4 pt-4 pl-5 pr-5`}>
              <NavLink
                to='/'
                className={({ isActive }) =>
                   isActive ? `${styles.link} ${styles.linkActive} text text_type_main-default` : `${styles.link} text text_type_main-default `
                }
              >
                <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'}/>
                <p className={`${styles.text} pl-2`}>Конструктор</p>
              </NavLink>
            </li>
            <li className={`${styles.link} pb-4 pt-4 pl-5 pr-5`}>
              <NavLink
                to='/feed'
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.linkActive} text text_type_main-default` : `${styles.link} text text_type_main-default `
                }
              >
                <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
                <p className="text text_type_main-default">Лента заказов</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to='/'>
          <Logo/>
        </Link>
        <NavLink
          to='/profile'

          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.linkActive} text text_type_main-default` : `${styles.link} text text_type_main-default `
          }
        >
          <ProfileIcon type={location.pathname === '/profile' || location.pathname === '/profile/orders' ? 'primary' : 'secondary'} />
          <p className="text text_type_main-default">Личный кабинет</p>
        </NavLink>


      </div>
    </header>
  )
}

export default AppHeader;