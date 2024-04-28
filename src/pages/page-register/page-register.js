import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './page-register.module.css';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const PageRegister = () => {
  return (
    <div className={`${style['page-layout']}`}>
      <div className={style.row}>
        <h1 className={`${style.title} text text_type_main-medium`}>Регистрация</h1>
        <form className={style.form}>
          <EmailInput
            // onChange={onChange}
            // value={value}
            name={'email'}
            placeholder="Логин"
            isIcon={false}
          />
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
          />
          <Button htmlType="button" type="primary" size="medium">
            Зарегистрироваться
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

export default PageRegister;