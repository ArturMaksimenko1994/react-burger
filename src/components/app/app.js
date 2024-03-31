import React, {useCallback, useState} from 'react';
import AppHeader from '../app-header/app-header';
import PageBurger from '../page-burger/page-burger';

import style from './app.module.css';
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
        <PageBurger/>
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
