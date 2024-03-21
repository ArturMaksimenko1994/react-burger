import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';

import { useModal } from '../../hooks/useModal';
import OrderDetails from '../order-details/order-details';
import style from './burger-conatructor-counting.module.css';

const BurgerConatructorCounting = ({ totalPrice, onOrderButtonClick, orderNumber }) => {
  // Используем кастомный хук
  const { isModalOpen, openModal, closeModal } = useModal();

  // Обработчик нажатия кнопки "Оформить заказ"
  const handleOrderButtonClick = () => {
    onOrderButtonClick();
    openModal(); // Открываем модальное окно
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
      {/* Модальное окно будет показано, если isModalOpen === true */}
      {isModalOpen && (
        <Modal title="Оформление заказа" active={isModalOpen} setActive={closeModal}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </>
  );
}

export default BurgerConatructorCounting;
