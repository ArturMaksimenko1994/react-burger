import React, {FC} from 'react';
import {useSelector} from '../../../services/hooks';
import {Link, useLocation} from 'react-router-dom';
import {OrdersCard} from '../../../components/orders/orders-card/orders-card';
import styles from './orders.module.css';

export const Orders: FC = () => {
  const location = useLocation();
  const orders = useSelector(store => store.wsAuthFeed.orders).slice();
  orders.reverse();

  return (
    <div className={styles.container}>
      {orders &&
        (orders?.map((order) => {
          return (
            <Link
              to={`/profile/orders/${order._id}`}
              state={{background: location}}
              className={`${styles.link}`} key={order._id}
            >
              <OrdersCard order={order} status={order.status}/>
            </Link>
          )
        }))
      }
    </div>
  )
}