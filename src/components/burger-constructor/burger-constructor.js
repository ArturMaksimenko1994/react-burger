import React, {useEffect, useMemo, useState} from 'react';
import {useDrop} from 'react-dnd';
import {useDispatch, useSelector} from 'react-redux';
import {v4 as uuidv4} from 'uuid'; // Импортируем функцию для генерации уникальных идентификаторов

import style from './burger-constructor.module.css';
import BurgerConstructorItem from './burger-constructor-item/burger-constructor-item';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConatructorCounting from './burger-conatructor-counting/burger-conatructor-counting';
import {getOrderDetails} from "../../services/store/actions/order-details";
import {ADD_BUN, ADD_ITEM_CONSTRUCTOR} from "../../services/store/actions/burger-constructor";

const BurgerConstructor = () => {
  const {bun, items} = useSelector((state) => state.constructorReducer);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  const filling = useMemo(
    () => items.filter((item) => item.type !== 'bun'),
    [items]
  );

  useEffect(() => {
    const totalPrice = filling.reduce((sum, item) => sum + item.price, bun.length === 0 ? 0 : (bun.price * 2));
    setTotal(totalPrice);
  }, [bun, filling]);

  const itemsId = useMemo(
    () => items.map((item) => item._id),
    [items]
  );

  const orderDetailsModal = (productsId) => {
    dispatch(getOrderDetails(itemsId));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(item) {
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
            {items.map((elem, index) => {
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
      <BurgerConatructorCounting total={total} itemsId={itemsId} orderDetailsModal={orderDetailsModal}/>
    </div>
  );
};

export default BurgerConstructor;
