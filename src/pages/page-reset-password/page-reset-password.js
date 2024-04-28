import style from './page-reset-password.module.css';
import PropTypes from 'prop-types';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";

const PageResetPassword = () => {
  return (
    <div className={`${style['page-layout']}`}>
      <div className={style.row}>
        <h1 className={`${style.title} text text_type_main-medium`}>Восстановление пароля</h1>
        <form className={style.form}>
          <PasswordInput
            // onChange={onChange}
            // value={value}
            name={'password'}
            placeholder="Введите новый пароль"
          />
          <EmailInput
            // onChange={onChange}
            // value={value}
            name={'email'}
            isIcon={false}
            placeholder="Введите код из письма"
          />
          <Button htmlType="button" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
      </div>
      <div className={`${style.redirect} pt-20`}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
          <Link className={style.link} to='/login'>Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default PageResetPassword;