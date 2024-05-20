import React, {FC, useEffect, useMemo, useState} from 'react';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid'; // Импортируем функцию для генерации уникальных идентификаторов

import style from './burger-constructor.module.css';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import {getOrderDetails} from "../../services/store/actions/order-details";
import {ADD_BUN, ADD_ITEM_CONSTRUCTOR} from "../../services/store/actions/burger-constructor";
import {getCookie} from "../../utils/utils";
import {useNavigate} from 'react-router-dom';
import {TIngredient} from '../../services/types/data';

interface DropItem {
  ingredient: TIngredient;
}

const BurgerConstructor: FC = () => {
  const {bun, items} = useSelector((store: any) => store.constructorReducer);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const cookie = getCookie('token');
  // const history = useNavigate();
  const history = useNavigate();
  const filling = useMemo(
    () => items.filter((item: TIngredient) => item.type !== 'bun'),
    [items]
  );

  useEffect(() => {
    const totalPrice = filling.reduce((sum: number, item: TIngredient) => sum + item.price, bun.length === 0 ? 0 : (bun.price * 2));
    setTotal(totalPrice);
  }, [bun, filling]);

  const itemsId = useMemo(
    () => items.map((item: TIngredient) => item._id),
    [items]
  );

  const orderDetailsModal = (itemsId: string[]) => {
    // @ts-ignore
    cookie && dispatch(getOrderDetails(itemsId));
    !cookie && history('/login');
  };

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item: DropItem) {
      if (item.ingredient.type === "bun") {
        dispatch({
          type: ADD_BUN,
          data: item.ingredient,
        });
      } else {
        const uniqueId = uuidv4(); // Генерируем уникальный идентификатор
        console.log('Уникальный id ингредиента:', uniqueId); // Выводим в консоль уникальный идентификатор
        dispatch({
          type: ADD_ITEM_CONSTRUCTOR,
          data: {...item.ingredient, id: uniqueId}, // Используем сгенерированный уникальный идентификатор
        });
      }
    },
  });

  return (
    <div className="mt-5">
      <div className={style.group} ref={dropTarget}>

        {bun.length === 0 ? (
          <p className={`${style.bun} ${style['bun-top']} text text_type_main-large pr-2`}>Выберите булочку</p>
        ) : (
          <div className={`${style['bun-constructor-element']}`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + '(верх)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        {items.length === 0 ? (
          <p className={`${style['empty-list']}  pr-2 text text_type_main-large`}>&#8592; Выберите начинку</p>
        ) : (
          <ul className={`${style.list}`}>
            {items.map((elem: TIngredient, index: number) => {
              if (elem.type === 'sauce' || elem.type === 'main') {
                return (
                  <BurgerConstructorItem
                    key={elem.id} // Заменяем id на уникальный uuid
                    items={elem}
                    index={index}
                  />
                );
              }
            })}
          </ul>
        )}

        {bun.length === 0 ? (
          <p className={`${style.bun} ${style['bun-bottom']} text text_type_main-large pr-2`}>Выберите булочку </p>
        ) : (
          <div className={`${style['bun-constructor-element']}`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + '(низ)'}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

      </div>
      <div className={`${style.row} mt-10`}>
        <div className={style.price}>
          <span className="text text_type_digits-medium">{total}</span>
          <CurrencyIcon type="primary"/>
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
            onClick={() => {
              orderDetailsModal(itemsId)
            }}
          >
            Оформить заказ
          </Button>)}
      </div>
      {/*<BurgerConatructorCounting items={items} total={total} itemsId={itemsId} orderDetailsModal={orderDetailsModal}/>*/}
    </div>
  );
};

export default BurgerConstructor;
