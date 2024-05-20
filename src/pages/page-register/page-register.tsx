import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector, useDispatch} from 'react-redux';
import {Link, Navigate, useLocation} from 'react-router-dom';
import style from './page-register.module.css';
import {registerUser, setRegisterFormValue} from '../../services/store/actions/auth';
import {getCookie} from '../../utils/utils';
import {ChangeEvent, FC, FormEvent} from "react";

const PageRegister: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const cookie = getCookie('token');
  const { email, password, name } = useSelector((store: any) => store.authReducer.form);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    dispatch(setRegisterFormValue(e.target.name, e.target.value));
  }

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    dispatch(registerUser(email, password, name));
  }

  if (cookie) {
    return (<Navigate to={location.state?.from || '/'}/>);
  }

  return (
    <div className={`${style['page-layout']}`}>
      <div className={style.row}>
        <h1 className={`${style.title} text text_type_main-medium`}>Регистрация</h1>
        <form className={style.form} onSubmit={onFormSubmit} >
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={onChange}
            icon={'CurrencyIcon'}
            value={name}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <EmailInput
            onChange={onChange}
            value={email}
            name={'email'}
            isIcon={false}
          />
          <PasswordInput
            onChange={onChange}
            value={password}
            name={'password'}
            size="default"/>
          <Button htmlType="submit" type="primary" size="medium">
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