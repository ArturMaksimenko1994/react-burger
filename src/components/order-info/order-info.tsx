import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect, useMemo } from 'react';

import { useParams, useResolvedPath } from 'react-router-dom';

import { OrdersInfoDetails } from './order-info-details/order-info-details';
import {v4 as uuidv4} from 'uuid'; // Импортируем функцию для генерации уникальных идентификаторов
import { useDispatch, useSelector } from '../../services/hooks';
import { wsConnectionClosed, wsConnectionOpen } from '../../services/store/actions/wsActions';
import { wsAuthConnectionClosed, wsAuthConnectionOpen } from '../../services/store/actions/wsAuthActions';
import { formatDate } from '../../utils/utils';
import { TIngredient } from '../../services/types/data';

import styles from './order-info.module.css';
export const OrdersInfo: FC = () => {
	const dispatch = useDispatch();

	let { id } = useParams<{id: string}>();
	const match = useResolvedPath("").pathname;

	const allOrders = useSelector(store => store.wsFeed.orders);
	const authOrders = useSelector(store => store.wsAuthFeed.orders);
	const ingredients = useSelector(store => store.burgerIngredients.ingredients);

	const isProfile = '/profile/orders/';
	const isFeed = '/feed/';

	let orders = match.includes(isProfile) ? authOrders : allOrders;
	let order = orders?.find((order) => order._id === id);

	const orderIngredientsData = useMemo(() => {
		return order?.ingredients.map((id) => {
			return ingredients?.find((item) => {
				return id === item._id
			})
		})
	}, [order?.ingredients, ingredients])

	const orderTotalPrice = useMemo(() => {
		return orderIngredientsData?.reduce((sum, item) => {
			if (item?.type === 'bun') {
				return sum += item.price * 2
			}
			return sum += (item ? item.price : 0);
		}, 0);
	}, [orderIngredientsData])

	useEffect(() => {
		if (!order) {

			if (match.includes(isProfile)) {
				dispatch(wsAuthConnectionOpen());
			}
			if (match.includes(isFeed)) {
				dispatch(wsConnectionOpen());
			}
		}
		return () => {
			if (match === isProfile) {
				dispatch(wsAuthConnectionClosed());
			}
			if (match === isFeed) {
				dispatch(wsConnectionClosed());
			}
		}
	}, [dispatch, order, match, match]);

	return (
		<>
			{
				order && (
					<div className={styles.container}>
						<p className='text text_type_digits-default'>#{order.number}</p>
						<h2 className={`${styles.name} text text_type_main-medium pt-10`}>{order.name}</h2>
						{!!order.status &&
							<p className={`${styles.status} text text_type_main-default pt-3`}>
								{order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : 'Выполнен'}
							</p>}
						<h3 className={`${styles.order} text text_type_main-medium pt-15`}>Состав:</h3>
						<ul className={`${styles.list}`}>
							<OrdersInfoDetails details={orderIngredientsData as TIngredient[]} key={id} />
						</ul>
						<div className={`${styles.total} pb-10`}>
							<p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
							<div className={styles.price}>
								<p className='text text_type_digits-default pr-2'>{orderTotalPrice}</p>
								<CurrencyIcon type="primary" key={uuidv4()} />
							</div>
						</div>
					</div >
				)}
		</>
	)
}