import style from './page-not-found.module.css';
import {Link} from "react-router-dom";
import {FC} from "react";

const PageNotFound: FC = () => {
  return (
    <div className={`${style['page-layout']}`}>
      <div className={style.row}>
        <p className="text text_type_main-large">404</p>
        <h1 className={`${style.title} text text_type_main-medium`}>Такой страницы нет</h1>
      </div>
      <div className={`${style.redirect} pt-20`}>
        <p className="text text_type_main-default text_color_inactive">Ссылка, по которой вы перешли, никуда не ведет. Возможно, в ней была опечатка, или эта страница была удалена.</p>
        <Link className={style.link} to='/'>Перейти на главную</Link>
      </div>
    </div>
  )
}

export default PageNotFound;