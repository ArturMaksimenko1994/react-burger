import React, { useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import style from './burger-conatructor-counting.module.css';

const BurgerConatructorCounting = ({ totalPrice, onOrderButtonClick, orderNumber }) => {
  const [modalOrderDetails, setModalOrderDetails] = useState(false);

  // Обработчик нажатия кнопки "Оформить заказ"
  const handleOrderButtonClick = () => {
    onOrderButtonClick();
    setModalOrderDetails(true);
  };

  return (
    <>
      <div className={`${style.row} mt-10`}>
        <div className={style.price}>
          <span className="text text_type_digits-medium">{totalPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderButtonClick}>
          Оформить заказ
        </Button>
      </div>
      <Modal active={modalOrderDetails} setActive={setModalOrderDetails}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>
    </>
  )
}

export default BurgerConatructorCounting;
