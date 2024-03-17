import { useState } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import style from './burger-conatructor-counting.module.css';

const BurgerConatructorCounting = () => {
  const [modalOrderDetails, setModalOrderDetails] = useState(false);
  return (
    <>
      <div className={`${style.row} mt-10`}>
        <div className={style.price}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => setModalOrderDetails(true)} >
          Оформить заказ
        </Button>
      </div>
      <Modal active={modalOrderDetails} setActive={setModalOrderDetails}>
        <OrderDetails />
      </Modal>
    </>
  )
}

export default BurgerConatructorCounting;