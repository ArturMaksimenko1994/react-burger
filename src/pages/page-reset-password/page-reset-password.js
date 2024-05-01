import style from './page-reset-password.module.css';
import PropTypes from 'prop-types';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation} from "react-router-dom";
import {resetPassword, setResetFormValue} from "../../services/store/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../../utils/utils";

const PageResetPassword = () => {

  const dispatch = useDispatch();
  const location = useLocation()
  const cookie = getCookie('token');
  const { password, code } = useSelector(store => store.authReducer.form);
  const { resetPassSuccess, forgetPassSuccess } = useSelector(store => store.authReducer);

  const onChange = e => {
    dispatch(setResetFormValue(e.target.name, e.target.value));
  }

  const onFormSubmit = e => {
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
    <div className={`${style['page-layout']}`}>
      <div className={style.row}>
        <h1 className={`${style.title} text text_type_main-medium`}>Восстановление пароля</h1>
        <form className={style.form} onSubmit={onFormSubmit}>
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
      <div className={`${style.redirect} pt-20`}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
          <Link className={style.link} to='/login'>Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default PageResetPassword;