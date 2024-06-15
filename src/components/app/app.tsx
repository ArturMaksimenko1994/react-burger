import React, {useEffect, useCallback, FC} from 'react';
import {Routes, Route, useLocation, useNavigate, Router, useMatch} from 'react-router-dom';
import {useDispatch, useSelector} from '../../services/hooks';
import style from './app.module.css';

import AppHeader from '../app-header/app-header';
import PageBurger from '../../pages/page-burger/page-burger';
import PageLogin from '../../pages/page-login/page-login';
import PageRegister from '../../pages/page-register/page-register';
import PageForgotPassword from '../../pages/page-forgot-password/page-forgot-password';
import PageResetPassword from '../../pages/page-reset-password/page-reset-password';
import PageProfile from '../../pages/page-profile/page-profile';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import PageFeed from '../../pages/page-feed/page-feed';

import Modal from "../modal/modal";

import {closeIngredientModal} from "../../services/store/actions/ingredient-details";
import {closeOrderInfoModal} from '../../services/store/actions/order-info-details';
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";
import {OrdersInfo} from '../order-info/order-info';
import {closeOrderModal} from "../../services/store/actions/order-details";
import {RESET_ITEM} from "../../services/store/action-types";

import {getUser, updateToken} from '../../services/store/actions/auth';
import {getCookie} from '../../utils/utils';
import {ProtectedRoute} from '../protected-route/protected-route';
import {getBurgerIngredients} from "../../services/store/actions/burger-ingredients";

const App: FC = () => {
  const dispatch = useDispatch();


  const location = useLocation();
  const background = location.state && location.state.background;

  const matchProfileOrder = useMatch('/profile/orders/:id');
  const matchFeed = useMatch('/feed/:id');
  const idOrderInfo = matchFeed?.params.id;
  const idOrderInfoProfill = matchProfileOrder?.params.id;

  const orderNumber = useSelector((store) => store.order.number);

  const token = localStorage.getItem('refreshToken');
  const cookie = getCookie('token');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  useEffect(() => {
    if (!cookie && token) {
      dispatch(updateToken());
    }
    if (cookie && token) {
      dispatch(getUser());
    }
  }, [dispatch, token, cookie]);

  const handleCloseIngredientDetailsModal = useCallback(() => {
    dispatch(closeIngredientModal());
    navigate(-1);
  }, [dispatch]);

  const handleCloseOrderInfoDetailsModal = useCallback(() => {
    dispatch(closeOrderInfoModal());
    navigate(-1);
  }, [dispatch]);

  const handleCloseOrderDetailsModal = useCallback(() => {
    dispatch(closeOrderModal());
    dispatch({type: RESET_ITEM});
  }, [dispatch]);

  return (
    <div className={style.app}>
      <AppHeader/>
      <main className={`${style.main} pt-10`}>
        <Routes location={background || location}>
          <Route path="/" element={<PageBurger/>}/>
          <Route path="/login" element={<PageLogin/>}/>
          <Route path="/register" element={<PageRegister/>}/>

          <Route path="/feed" element={<PageFeed/>}/>
          <Route path="/feed/:id" element={<OrdersInfo/>}/>

          <Route path="/ingredients/:id" element={<IngredientDetails/>}/>

          <Route path="/forgot-password" element={<PageForgotPassword/>}/>
          <Route path="/reset-password" element={<PageResetPassword/>}/>
          <Route path="/profile/*" element={
            <ProtectedRoute>
              <PageProfile/>
            </ProtectedRoute>
          }/>

          <Route path="/profile/orders/:id" element={
            <ProtectedRoute>
              <OrdersInfo/>
            </ProtectedRoute>
          }/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>

        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal title="Детали ингредиента" onClickClose={handleCloseIngredientDetailsModal}>
                  <IngredientDetails/>
                </Modal>
              }
            />
          </Routes>
        )}

        {(background && idOrderInfo) && (
          <Routes>
            <Route
              path="/feed/:id"
              element={
                <Modal title="" onClickClose={handleCloseOrderInfoDetailsModal}>
                  <OrdersInfo/>
                </Modal>
              }
            />
          </Routes>
        )}

        {background && idOrderInfoProfill && (
          <Routes>
            <Route
              path="/profile/orders/:id"
              element={
                <Modal title="" onClickClose={handleCloseIngredientDetailsModal}>
                  <OrdersInfo/>
                </Modal>
              }
            />
          </Routes>
        )}

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
