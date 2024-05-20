import React, { FC } from "react";
import styles from './order-details.module.css';
import img from '../../images/done.png';

interface OrderDetailsProps {
  orderNumber: number;
}

const OrderDetails: FC<OrderDetailsProps> = ({ orderNumber }) => {
  return (
    <>
      <div className={styles.row}>
        <p className="text text_type_digits-large mb-8">{orderNumber}</p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <img src={img} className={`${styles.image} mb-15 mt-15`} alt="Заказ принят" />
        <p className="text text_type_main-default mb-2 ">Ваш заказ начали готовить</p>
        <p className={`${styles["last-p"]} text text_type_main-default text_color_inactive mb-20`}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </>
  )
}

export default OrderDetails;
