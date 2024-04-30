import style from './page-forgot-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation} from "react-router-dom";
import {forgotPassword} from "../../services/store/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {getCookie} from "../../utils/utils";

const PageForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const location = useLocation();
  const cookie = getCookie('token');

  const { forgetPassSuccess } = useSelector(store => store.authReducer);

  const onChangeEmail = e => {
    setEmail(e.target.value);
  }

  const onFormSubmit = e => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  }

  if (cookie) {
    return (<Navigate to={location.state?.from || '/'} />);
  }
  return (
    <div className={`${style['page-layout']}`}>
      <div className={style.row}>
        <h1 className={`${style.title} text text_type_main-medium`}>Восстановление пароля</h1>
        <form className={style.form} onSubmit={onFormSubmit}>
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
      <div className={`${style.redirect} pt-20`}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
          <Link className={style.link} to='/login'>Войти</Link>
        </p>
      </div>
    </div>
  )
}

export default PageForgotPassword;