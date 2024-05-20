import BurgerIngridientItem from "../burger-ingredients-item/burger-ingredients-item"

import styles from './burger-ingredients-all.module.css';
import {FC} from "react";
import { TIngredient } from '../../../services/types/data';

type TBurgerIngredientsAll = {
  ingredients: TIngredient[];
  type: string;
}

type TCategories = {
  [key: string]: string;
}

const BurgerIngredientsAll: FC<TBurgerIngredientsAll>= ({ type, ingredients }) => {
  const category = ingredients.filter((elem) => elem.type === type);
  const categories: TCategories = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки'
  }

  return (
    <div className={`${styles['group-ingredients']}`} id={type}>
      <h2 className="text text_type_main-medium">{categories[type]}</h2>
      <ul className={`${styles['list']}`}>
        {category?.map((elem) => (
          <BurgerIngridientItem key={elem._id} ingredient={elem} />
        ))}
      </ul>
    </div>
  )
}

export default BurgerIngredientsAll;
