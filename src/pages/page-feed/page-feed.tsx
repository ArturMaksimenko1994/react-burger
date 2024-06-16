import React, { FC, useEffect } from 'react';
import { useDispatch } from '../../services/hooks';
import { OrdersStats } from '../../components/orders-stats/orders-stats';
import { Orders } from '../../components/orders/orders';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/store/actions/wsActions';
import styles from './page-feed.module.css';
import {useLocation} from "react-router-dom";

export const  PageFeed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionOpen());
    return () => {
      dispatch(wsConnectionClosed());
    }
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={`${styles.text} text text_type_main-large pt-10 pb-5`}>Лента заказов</h2>
      <div className={styles.feedOrder}>
        <Orders />
        <OrdersStats />
      </div>
    </div >)
}

export default PageFeed;