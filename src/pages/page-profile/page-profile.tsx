import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {ChangeEvent, FC, FormEvent, useEffect, useState} from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import {NavLink, Route, Routes} from 'react-router-dom';
import {getUser, singOut, updateUser} from '../../services/store/actions/auth';
import { wsAuthConnectionClosed, wsAuthConnectionOpen } from '../../services/store/actions/wsAuthActions';
import {Orders} from './orders/orders';
import { TLocation } from '../../services/types/data';
import styles from './page-profile.module.css';

const PageProfile: FC = () => {

  const dispatch = useDispatch();
  const { email, name } = useSelector((store) => store.auth.user) || {};
  const [form, setForm] = useState({
    email: email,
    name: name,
    password: '',
  });

  useEffect(() => {
    dispatch(getUser());
    dispatch(wsAuthConnectionOpen());
    return () => {
      dispatch(wsAuthConnectionClosed())
    }
  }, [dispatch]);

  useEffect(()=>{
    if (email && name){
      setForm({
        email: email,
        name: name,
        password: '',
      })
    }
  },[email,name])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(form.email, form.name, form.password));
  };

  function handleSingOut() {
    dispatch(singOut());
  };

  const onResetForm = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setForm({
      email: email,
      name: name,
      password: '',
    })
  }

  return (
    <div className={`${styles['page-layout-full']}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.row}`}>
          <ul className={`${styles.list}`}>
            <li className={`${styles.item}`}>
              <NavLink
                to='/profile'
                end={true}
                className={({isActive}) => isActive ? `${styles.link} ${styles.linkActive} text text_type_main-medium` : `${styles.link} text text_type_main-medium`}
              >
                Профиль
              </NavLink>
            </li>
            <li className={`${styles.item}`}>
              <NavLink
                to='/profile/orders'
                className={({isActive}) => isActive ? `${styles.link} ${styles.linkActive} text text_type_main-medium` : `${styles.link} text text_type_main-medium`}
              >
                История заказов
              </NavLink>
            </li>
            <li className={`${styles.item}`}>
              <NavLink
                to='/login'
                className={`${styles.link} text text_type_main-medium`}
                onClick={handleSingOut}
              >
                Выход
              </NavLink>
            </li>
            <li className={`${styles.item}`}>
              <p className={`${styles.text} text text_type_main-default text_color_inactive pt-20 pb-4`}>
                В этом разделе вы можете изменить свои персональные данные
              </p>
            </li>
          </ul>
          <Routes>
              <Route path="/orders" element={<Orders/>}/>
              <Route path="/" element={
                <form className={styles.form} onSubmit={onSubmit}>
                  <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={form.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                  />
                  <Input
                    type={'email'}
                    placeholder={'Логин'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={form.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                  />
                  <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    onChange={onChange}
                    icon={'EditIcon'}
                    value={form.password}
                    name={'password'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                  />
                  <div className={styles.btn}>
                    <Button htmlType="submit" type="secondary" size="medium" onClick={() => onResetForm}>
                      Oтмена
                    </Button>
                    <Button htmlType="submit"  disabled={!form.password} type="primary" size="medium">
                      Сохранить
                    </Button>
                  </div>
                </form>
              }/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default PageProfile;
