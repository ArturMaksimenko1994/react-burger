import styles from './page-reset-password.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation} from "react-router-dom";
import {resetPassword, setResetFormValue} from "../../services/store/actions/auth";
import { useSelector, useDispatch } from '../../services/hooks';
import {getCookie} from "../../utils/utils";
import {ChangeEvent, FC, FormEvent} from "react";
import { TLocation } from '../../services/types/data';

const PageResetPassword:FC = () => {

  const dispatch = useDispatch();
  const location = useLocation()
  // const location = useLocation<TLocation>()
  const cookie = getCookie('token');
  const { password, code } = useSelector((store) => store.auth.form);
  const { resetPassSuccess, forgetPassSuccess } = useSelector((store) => store.auth);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setResetFormValue(e.target.name, e.target.value));
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token: code }));
  }

  if (cookie) {
    return (<Navigate to={location.state?.from || '/'} />);
  }
  if (!forgetPassSuccess) {
    return <Navigate to={{ pathname: "/forgot-password" }} />;
  }

  return (
    <div className={`${styles['page-layout']}`}>
      <div className={styles.row}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <PasswordInput
            placeholder={'Введите новый пароль'}
            onChange={onChange}
            value={password}
            name={'password'}
            size="default"
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={onChange}
            value={code}
            name={'code'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button htmlType="submit" type="primary" size="medium">
            {!!resetPassSuccess
              ? (<Navigate to={location.state?.from || '/profile'} />)
              : ''
            }
            Сохранить
          </Button>
        </form>
      </div>
      <div className={`${styles.redirect} pt-20`}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
          <Link className={styles.link} to='/login'>Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default PageResetPassword;