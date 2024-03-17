
import style from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

//временный хардкор, пока не пройдем NavLink и напишем кастомную ссылку, в которую будет передаваться пропсом иконка и текст
const activeLink = {
  color: 'white'
};

const AppHeader = () => {
  return (
    <header className={`${style.header} pb-4 pt-4`} >
      <div className={style.row}>
        <nav className={style.nav}>
          <ul className={style.list}>
            <li className={`${style.link} pb-4 pt-4 pl-5 pr-5`} >
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default" style={activeLink}>Конструктор</p>
            </li>
            <li className={`${style.link} pb-4 pt-4 pl-5 pr-5`}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default" >Лента заказов</p>
            </li>
          </ul>
        </nav>
        <Logo />
        {/* заглушка профиля пока не пройдем Rout */}
        <div className={`${style.link} pb-4 pt-4 pl-5 pr-5`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </div>
      </div>
    </header>
  )
}

export default AppHeader;