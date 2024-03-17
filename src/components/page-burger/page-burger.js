import { useState, useEffect } from 'react';
import { BASE_URL } from './../../utils/api'

import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


import style from './page-burger.module.css';


const PageBurger = () => {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(BASE_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error('Проблема с fetch запросом');
        }
        return res.json();
      })
      .then(data => {
        setState({ ...state, data: data.data, isLoading: false });
        // console.log('Данные с API:', data.data); // Вывод данных API в консоль
      })
      .catch(error => {
        setState({ ...state, hasError: true, isLoading: false });
        console.error('Произошла проблема при выполнении запроса:', error);
      });
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <section className={style.burger}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={style.row}>
        <BurgerIngredients data={state.data} />
        <BurgerConstructor data={state.data} />
      </div>
    </section>
  )
}

export default PageBurger;