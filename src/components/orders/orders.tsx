import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';
import { Link, useLocation } from 'react-router-dom';
import { OrdersCard } from './orders-card/orders-card';
import styles from './orders.module.css';

export const Orders: FC = () => {
	const location = useLocation();
	const orders = useSelector(store => store.wsFeed.orders);

	return (
		<div className={styles.container}>
			{orders && orders?.map((order, index) => {
				return (
					<Link
						to = {`/feed/${order._id}`}
						state= {{ background: location} }
						className={`${styles.link}`} key={order._id}
					>

						<OrdersCard order={order} status={order.status} key={index} />
					</Link>
				)
			})}
		</div >
	)
}