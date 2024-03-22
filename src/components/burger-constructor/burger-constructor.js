import React, { useContext, useState, useMemo } from "react";

import PropTypes from "prop-types";
import style from "./burger-constructor.module.css";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConatructorCounting from "../burger-conatructor-counting/burger-conatructor-counting";
import { DataIngredientsContext } from "../../services/appContext";

import {createOrder} from "../../services/api"

const BurgerConstructor = () => {
  const { products } = useContext(DataIngredientsContext);
  const [orderNumber, setOrderNumber] = useState(null); // Номер заказа

  // Фильтруем булки и остальные ингредиенты
  const buns = products?.items.filter((item) => item.type === "bun");
  const otherIngredients = products?.items.filter((item) => item.type !== "bun");

  // Рассчитываем стоимость булок и остальных ингредиентов
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (buns && buns.length > 0) {
      totalPrice += buns[0].price * 2; // Учитываем две булки (верх и низ)
    }
    if (otherIngredients) {
      otherIngredients.forEach((item) => {
        totalPrice += item.price;
      });
    }
    return totalPrice;
  };

  // Мемоизируем результат для оптимизации производительности
  const totalPrice = useMemo(calculateTotalPrice, [buns, otherIngredients]);

  // Обработчик нажатия кнопки "Оформить заказ"
  const handleOrderButtonClick = () => {
    // Получаем список ингредиентов из компонента BurgerConstructor
    const ingredients = products?.items.map((item) => item._id);
    // Вызываем функцию для создания заказа
    if (ingredients && ingredients.length > 0) {
      createOrder(ingredients, setOrderNumber);
    } else {
      console.error("Невозможно создать заказ: отсутствуют ингредиенты");
    }
  };

  return (
    <div className="mt-5">
      <div className={style.group}>
        {buns && buns.length > 0 && (
          <React.Fragment>
            <div className="ml-7">
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${buns[0].name} (верх)`}
                price={buns[0].price}
                thumbnail={buns[0].image}
              />
            </div>
            <ul className={style.list}>
              {otherIngredients.map((item, index) => (
                <BurgerConstructorItem key={index} data={item} />
              ))}
            </ul>
            <div className="ml-7">
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${buns[0].name} (низ)`}
                price={buns[0].price}
                thumbnail={buns[0].image}
              />
            </div>
          </React.Fragment>
        )}
      </div>
      <BurgerConatructorCounting
        totalPrice={totalPrice}
        onOrderButtonClick={handleOrderButtonClick}
        orderNumber={orderNumber}
      />
    </div>
  );
};

BurgerConstructor.propTypes = {
  products: PropTypes.object,
};

export default BurgerConstructor;
