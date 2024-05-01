import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch} from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { setLoginFormValue, singIn } from '../../services/store/actions/auth';
import { getCookie } from '../../utils/utils';

import style from './page-login.module.css';

const PageLogin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cookie = getCookie('token');
  const { email, password } = useSelector(store => store.authReducer.form);

  const onChange = e => {
    dispatch(setLoginFormValue(e.target.name, e.target.value));
  }

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(singIn(email, password));
  }

  if (cookie) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  return (
    <div className={`${style['page-layout']}`}>
      <div className={style.row}>
        <h1 className={`${style.title} text text_type_main-medium`}>Вход</h1>
        <form className={style.form} onSubmit={onFormSubmit}>
          <EmailInput
            onChange={onChange}
            value={email}
            name={'email'}
            size="default"
          />
          <PasswordInput
            onChange={onChange}
            value={password}
            name={'password'}
            size="default" />
          <Button htmlType="submit" type="primary" size="medium">
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