import {FC, useMemo} from "react";
import {Link} from "react-router-dom";

import {useDrag} from "react-dnd";
import {useDispatch, useSelector} from 'react-redux';

import styles from './burger-ingredients-item.module.css';

import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {openIngredientModal} from "../../../services/store/actions/ingredient-details";

import { TIngredient } from '../../../services/types/data';

type TBurgerIngridientItem = {
  ingredient: TIngredient;
}

const BurgerIngridientItem: FC<TBurgerIngridientItem> = ({ingredient}) => {
  const dispatch = useDispatch();

  const {bun, items} = useSelector((state: any) => state.constructorReducer);
  const {image, name, price} = ingredient;

  const [{opacity}, ref] = useDrag({
    type: "ingredients",
    item: {ingredient},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const counter = useMemo(
    () =>
      (count = 0) => {
        for (let {_id} of items)
          if (_id === ingredient._id) count++;

        if (bun && bun._id === ingredient._id) return 2;
        return count;
      },
    [bun, items, ingredient._id]
  );

  // Обработчик открытия модального окна с деталями ингредиента
  const handleOpenIngredientDetailsModal = (item: TIngredient) => {
    dispatch(openIngredientModal(item));
  };

  return (
    <>
      <li className={`${styles['list-item']}`} style={{opacity}} ref={ref}>
        <Link to={`/ingredients/${ingredient._id}`} state={{background: true}}
              onClick={() => handleOpenIngredientDetailsModal(ingredient)}
              className={`${styles['list-item-link']}`}
        >
          {counter() > 0 && <Counter count={counter()} size="default"/>}
          <img className={styles.img} src={ingredient.image} alt={ingredient.name}/>
          <span className={styles.price}>
          <span className="text text_type_digits-default">{ingredient.price}</span>
          <CurrencyIcon type="primary"/>
        </span>
          <p className="text text_type_main-default">{ingredient.name}</p>
        </Link>
      </li>
    </>
  )
}

export default BurgerIngridientItem;


