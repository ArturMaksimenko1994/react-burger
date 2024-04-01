import {useDrag} from "react-dnd";
import {useDispatch, useSelector} from 'react-redux';

import PropTypes from 'prop-types';
import style from './burger-ingredients-item.module.css';

import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {openIngredientModal} from "../../../services/store/actions/ingredient-details";
import {useMemo} from "react";

const BurgerIngridientItem = ({ingredient}) => {

  const {bun, items} = useSelector((state) => state.constructorReducer);
  const dispatch = useDispatch();
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
        for (let { _id } of items)
          if (_id === ingredient._id) count++;

        if (bun && bun._id === ingredient._id) return 2;
        return count;
      },
    [bun, items, ingredient._id]
  );

  const handleOpenIngredientDetailsModal = (item) => {
    dispatch(openIngredientModal(item));
  };

  return (
    <>
      <li className={`${style['list-item']}`}
          onClick={() => handleOpenIngredientDetailsModal(ingredient)}
          style={{opacity}}
          ref={ref}
      >
        {counter() > 0 && <Counter count={counter()} size="default" />}
        <img className={style.img} src={ingredient.image} alt={ingredient.name}/>
        <span className={style.price}>
          <span className="text text_type_digits-default">{ingredient.price}</span>
          <CurrencyIcon type="primary"/>
        </span>
        <p className="text text_type_main-default">{ingredient.name}</p>
      </li>
    </>
  )
}

BurgerIngridientItem.propTypes = {
  ingredient: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number
  }).isRequired
};

export default BurgerIngridientItem;


