import React, { FC } from 'react';
import { useSelector } from '../../services/hooks';
import styles from './orders-stats.module.css';
import {v4 as uuidv4} from 'uuid'; // Импортируем функцию для генерации уникальных идентификаторов

export const OrdersStats: FC = () => {
	const { total, totalToday, orders } = useSelector(store => store.wsFeed);

	const doneStatusOrder = orders.filter(order => order.status === 'done').filter((order, index) => index < 15);
	const pendingStatusOrder = orders.filter(order => order.status !== 'done').filter((order, index) => index >= 10)

	return (
		<div className={styles.container}>
			<div className={`${styles.orderBoard} pb-15`}>
				<div className={styles.column}>
					<p className='text text_type_main-medium pb-6'>Готовы:</p>
					<ul className={styles.orderList}>
						{doneStatusOrder.map(order => (
							<li
								className={`${styles.item} ${styles.done} text text_type_digits-default`}
								key={uuidv4()}
							>
								{order.number}
							</li>
						))}
					</ul>
				</div>
				<div className={styles.column}>
					<p className='text text_type_main-medium pb-6'>В работе:</p>
					<ul className={styles.orderList}>
						{pendingStatusOrder.map(order => (
							<li
								className={`${styles.item} text text_type_digits-default`}
								key={uuidv4()}
							>
								{order.number}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className={`${styles.completed} pb-15`}>
				<p className='text text_type_main-medium'>Выполнено за все время:</p>
				<h2 className={`${styles.totalItems} text text_type_digits-large`}>{total}</h2>
			</div>
			<div className={styles.completed}>
				<p className='text text_type_main-medium'>Выполнено за сегодня:</p>
				<h2 className={`${styles.totalItems} text text_type_digits-large`}>{totalToday}</h2>
			</div>
		</div >)
}