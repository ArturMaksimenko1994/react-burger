import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, NavLink, useLocation} from 'react-router-dom';

import style from './app-header.module.css';

const AppHeader = () => {

  const location = useLocation();

  return (
    <header className={`${style.header} pb-4 pt-4`}>
      <div className={style.row}>
        <nav className={style.nav}>
          <ul className={style.list}>
            <li className={`${style.item} pb-4 pt-4 pl-5 pr-5`}>
              <NavLink
                to='/'
                exact={"true"}
                className={({ isActive }) =>
                   isActive ? `${style.link} ${style.linkActive} text text_type_main-default` : `${style.link} text text_type_main-default `
                }
              >
                <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'}/>
                <p className={`${style.text} pl-2`}>Конструктор</p>
              </NavLink>
            </li>
            <li className={`${style.link} pb-4 pt-4 pl-5 pr-5`}>
              <NavLink
                to='/feed'
                exact={"true"}
                className={({ isActive }) =>
                  isActive ? `${style.link} ${style.linkActive} text text_type_main-default` : `${style.link} text text_type_main-default `
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
          exact={"true"}
          className={({ isActive }) =>
            isActive ? `${style.link} ${style.linkActive} text text_type_main-default` : `${style.link} text text_type_main-default `
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