import style from './page-profile.module.css';
import PropTypes from 'prop-types';
import {Link, NavLink, Route, Routes} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";

const PageProfile = () => {
  return (
    <div className={`${style['page-layout-full']}`}>
      <div className={style.row}>
        <ul className={`${style.list}`}>
          <li className={`${style.item}`}>
            <NavLink
              to='/profile'
              exact
              className={`${style.link} text text_type_main-medium text_color_inactive`}
              activeClassName={`${style.linkActive} text text_type_main-medium`}
            >
              Профиль
            </NavLink>
          </li>
          <li className={`${style.item}`}>
            <NavLink
              to='/profile/orders'
              exact
              className={`${style.link} text text_type_main-medium text_color_inactive`}
              activeClassName={`${style.linkActive} text text_type_main-medium`}
            >
              История заказов
            </NavLink>
          </li>
          <li className={`${style.item}`}>
            <NavLink
              to='/login'
              exact
              className={`${style.link} text text_type_main-medium text_color_inactive`}
              activeClassName={`${style.linkActive} text text_type_main-medium`}
            >
              Выход
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={`${style.redirect} pt-20`}>
        <p className="text text_type_main-default text_color_inactive">Ссылка, по которой вы перешли, никуда не ведет.
          Возможно, в ней была опечатка, или эта страница была удалена.</p>
        <Link className={style.link} to='/'>Перейти на главную</Link>
      </div>

    </div>
  )
}

export default PageProfile;