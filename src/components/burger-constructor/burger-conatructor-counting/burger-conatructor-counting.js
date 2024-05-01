import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './burger-conatructor-counting.module.css';

const BurgerConatructorCounting = ({items, total, itemsId, orderDetailsModal}) => {

  return (
    <>
      <div className={`${style.row} mt-10`}>
        <div className={style.price}>
          <span className="text text_type_digits-medium">{total}</span>
          <CurrencyIcon type="primary" />
        </div>
        {items.length === 0
          ? (<Button
            htmlType="button"
            type="primary"
            size="large"
            disabled
          >
            Оформить заказ
          </Button>)
          : (<Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={() => { orderDetailsModal(itemsId) }}
          >
            Оформить заказ
          </Button>)}
      </div>

    </>
  );
}

// Определяем propTypes для компонента
BurgerConatructorCounting.propTypes = {
  total: PropTypes.number.isRequired,
  itemsId: PropTypes.array.isRequired,
  orderDetailsModal: PropTypes.func.isRequired,
};

export default BurgerConatructorCounting;
