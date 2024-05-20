import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch} from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { setLoginFormValue, singIn } from '../../services/store/actions/auth';
import { getCookie } from '../../utils/utils';

import styles from './page-login.module.css';
import {ChangeEvent, FC, FormEvent} from "react";

const PageLogin: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cookie = getCookie('token');
  const { email, password } = useSelector((store: any) => store.authReducer.form);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    dispatch(setLoginFormValue(e.target.name, e.target.value));
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(singIn(email, password));
  }

  if (cookie) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  return (
    <div className={`${styles['page-layout']}`}>
      <div className={styles.row}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
        <form className={styles.form} onSubmit={onFormSubmit}>
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
      <div className={`${styles.redirect} pt-20`}>
        <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?
          <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль?
          <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  )
}

export default PageLogin;