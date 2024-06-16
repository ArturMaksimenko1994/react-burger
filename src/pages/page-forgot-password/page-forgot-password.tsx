import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation} from "react-router-dom";
import {forgotPassword} from "../../services/store/actions/auth";
import { useDispatch, useSelector } from '../../services/hooks';
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {getCookie} from "../../utils/utils";
import { TLocation } from '../../services/types/data';
import styles from './page-forgot-password.module.css';

const PageForgotPassword:FC = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  // const location = useLocation<TLocation>();
  const cookie = getCookie('token');

  const { forgetPassSuccess } = useSelector((store) => store.auth);
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  }

  if (cookie) {
    return (<Navigate to={location.state?.from || '/'} />);
  }

  return (
    <div className={`${styles['page-layout']}`}>
      <div className={styles.row}>
        <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={onChangeEmail}
            value={email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
          <Button htmlType="submit" type="primary" size="medium">
            {!!forgetPassSuccess
              ? (<Navigate to='/reset-password' />)
              : ''
            }
            Восстановить
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

export default PageForgotPassword;