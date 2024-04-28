import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';

import style from './page-login.module.css';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const PageLogin = () => {
  return (
    <div className={`${style['page-layout']}`}>
      <div className={style.row}>
        <h1 className={`${style.title} text text_type_main-medium`}>Вход</h1>
        <form className={style.form}>
          <EmailInput
            // onChange={onChange}
            // value={value}
            name={'email'}
            isIcon={false}
          />
          <PasswordInput
            // onChange={onChange}
            // value={value}
            name={'password'}
            extraClass="mb-2"
          />
          <Button htmlType="button" type="primary" size="medium">
            Войти
          </Button>
        </form>
      </div>
      <div className={`${style.redirect} pt-20`}>
        <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?
          <Link className={style.link} to='/register'>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль?
          <Link className={style.link} to='/forgot-password'>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  )
}

export default PageLogin;