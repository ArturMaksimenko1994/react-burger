import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useInView} from 'react-intersection-observer';

import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsAll from "./burger-ingredients-all/burger-ingredients-all";
import {getBurgerIngredients} from '../../services/store/actions/burger-ingredients';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector((store: any) => store.burgerIngredientsReducer.ingredients);

  useEffect(() => {
    // @ts-ignore
    dispatch(getBurgerIngredients());
  }, [dispatch]);

  const [current, setCurrent] = useState('one');

  //Доработка интерфейса навигации по ингредиентам плагин react-intersection-observer
  const [bunRef, bunInView] = useInView({
    threshold: 0.1
  });

  const [sauceRef, sauceInView] = useInView({
    threshold: 0.1
  });

  const [mainRef, mainInView] = useInView({
    threshold: 0.1
  });

  const handleIngredientScroll = () => {
    switch (true) {
      case bunInView:
        setCurrent('bun');
        break;
      case sauceInView:
        setCurrent('sauce');
        break;
      case mainInView:
        setCurrent('main');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleIngredientScroll();
  }, [bunInView, sauceInView, mainInView]);

  return (
    <div className="mt-5">

      <div className={`${styles.tab} pt-5`}>
        <a href='#bun' className={styles.link}>
          <Tab
            value="bun"
            active={current === "bun"}
            onClick={() => setCurrent('bun')}
          >
            Булки
          </Tab>
        </a>
        <a href='#sauce' className={styles.link}>
          <Tab
            value="sauce"
            active={current === "sauce"}
            onClick={() => setCurrent('sauce')}
          >
            Соусы
          </Tab>
        </a>
        <a href='#main' className={styles.link}>
          <Tab
            value="main"
            active={current === "main"}
            onClick={() => setCurrent('main')}
          >
            Начинки
          </Tab>
        </a>
      </div>

      <div className="mt-10">
        <div className={`${styles['all-ingredients']}`}>
          <div ref={bunRef}>
            <BurgerIngredientsAll
              type="bun"
              ingredients={ingredients}
            />
          </div>
          <div ref={sauceRef}>
            <BurgerIngredientsAll
              type="sauce"
              ingredients={ingredients}
            />
          </div>
          <div ref={mainRef}>
            <BurgerIngredientsAll
              type="main"
              ingredients={ingredients}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;
