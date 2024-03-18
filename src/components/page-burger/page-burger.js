import {useState, useEffect, useContext} from 'react';

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import style from './page-burger.module.css';

import {DataIngredientsContext} from "../../services/appContext";
import {getIngredients} from "../../services/api";

const PageBurger = () => {

  const {products, setProducts} = useContext(DataIngredientsContext);

  console.log("ДАННЫЕ ИЗ CONTEXT", products)

  useEffect(() => {
    getIngredients(setProducts)
  }, []);

  return (
    <section className={style.burger}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={style.row}>
        {products && (
          <>
            <BurgerIngredients />
            <BurgerConstructor />
          </>
        )}
        {/*<BurgerConstructor data={products?.items} />*/}
      </div>
    </section>
  )
}

export default PageBurger;