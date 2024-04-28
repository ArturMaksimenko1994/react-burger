import React, {useCallback, useState} from 'react';
import {Routes, Route} from 'react-router-dom';

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

import {useDispatch, useSelector} from "react-redux";
import {closeIngredientModal} from "../../services/store/actions/ingredient-details";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {closeOrderModal} from "../../services/store/actions/order-details";
import {RESET_ITEM} from "../../services/store/actions/burger-constructor";

function App() {
  const dispatch = useDispatch();
  const openIngredientDetailsModal = useSelector(store => store.ingredientReducer.openModal);
  const orderNumber = useSelector(store => store.orderReducer.number);

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
  }, [dispatch]);

  const handleCloseOrderDetailsModal = useCallback(() => {
    dispatch(closeOrderModal())
    dispatch({ type: RESET_ITEM });
  }, [dispatch]);

  return (
    <div className={style.app}>
      <AppHeader/>
      <main className={`${style.main} pt-10`}>
        <Routes>
          <Route path="/" element={<PageBurger/>} />
          <Route path="/login" element={<PageLogin/>} />
          <Route path="/register" element={<PageRegister/>} />
          <Route path="/forgot-password" element={<PageForgotPassword/>} />
          <Route path="/reset-password" element={<PageResetPassword/>} />
          <Route path="/profile" element={<PageProfile/>} />
          <Route path="*" element={<PageNotFound/>} />
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

      {!!openIngredientDetailsModal &&
        <Modal
          title="Детали ингредиента"
          onClickClose={handleCloseIngredientDetailsModal}
        >
          <IngredientDetails data={openIngredientDetailsModal}/>
        </Modal>
      }

    </div>
  );
}

export default App;
