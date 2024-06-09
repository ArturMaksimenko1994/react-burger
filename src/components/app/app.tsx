import React, {useEffect, useCallback, FC} from 'react';
import {Routes, Route, useLocation, useNavigate, Router} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import PageBurger from '../../pages/page-burger/page-burger';
import PageLogin from '../../pages/page-login/page-login';
import PageRegister from '../../pages/page-register/page-register';
import PageForgotPassword from '../../pages/page-forgot-password/page-forgot-password';
import PageResetPassword from '../../pages/page-reset-password/page-reset-password';
import PageProfile from '../../pages/page-profile/page-profile';
import PageNotFound from '../../pages/page-not-found/page-not-found';

import Modal from "../modal/modal";

import {closeIngredientModal} from "../../services/store/actions/ingredient-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {closeOrderModal} from "../../services/store/actions/order-details";
import {RESET_ITEM} from "../../services/store/actions/burger-constructor";

import {getUser, updateToken} from '../../services/store/actions/auth';
import {getCookie} from '../../utils/utils';
import {ProtectedRoute} from '../protected-route/protected-route';
import {getBurgerIngredients} from "../../services/store/actions/burger-ingredients";

const App: FC = () => {
  const dispatch = useDispatch();
  const orderNumber = useSelector((store: any) => store.orderReducer.number);

  const token = localStorage.getItem('refreshToken');
  const cookie = getCookie('token');

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background

  useEffect(() => {
    // @ts-ignore
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  useEffect(() => {
    // @ts-ignore
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (!cookie && token) {
      // @ts-ignore
      dispatch(updateToken());
    }
  }, [dispatch, token, cookie]);

  const handleCloseOrderDetailsModal = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch({type: RESET_ITEM});
  }, [dispatch]);

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
    navigate('/');
  }, [dispatch]);

  return (
    <div className={style.app}>
      <AppHeader/>
      <main className={`${style.main} pt-10`}>
          <Routes>
            <Route path="/" element={<PageBurger/>}/>
            <Route path="/login" element={<PageLogin/>}/>
            <Route path="/register" element={<PageRegister/>}/>

            {background
              ? (
                <Route path='/ingredients/:id' element={
                  <Modal
                    title='Детали ингредиента'
                    onClickClose={handleCloseIngredientDetailsModal}>
                    <IngredientDetails/>
                  </Modal>
                }/>
              ):(
                <Route path="/ingredients/:id" element={
                  <IngredientDetails/>
                }/>
              )
            }

            <Route path="/forgot-password" element={<PageForgotPassword/>}/>
            <Route path="/reset-password" element={<PageResetPassword/>}/>
            <Route path="/profile/*" element={
              <ProtectedRoute>
                <PageProfile />
              </ProtectedRoute>
            }/>
            <Route path="*" element={<PageNotFound/>}/>]
          </Routes>
      </main>

      {!!orderNumber &&
        <Modal
          title="Оформление заказа"
          onClickClose={handleCloseOrderDetailsModal}
        >
          <OrderDetails orderNumber={orderNumber}/>
        </Modal>
      }

    </div>
  );
}

export default App;
