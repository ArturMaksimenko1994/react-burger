import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-conatructor-counting.module.css';

const BurgerConatructorCounting = ({total, itemsId, orderDetailsModal}) => {

  return (
    <>
      <div className={`${style.row} mt-10`}>
        <div className={style.price}>
          <span className="text text_type_digits-medium">{total}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={() => { orderDetailsModal(itemsId) }}
          htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>

    </>
  );
}

export default BurgerConatructorCounting;
