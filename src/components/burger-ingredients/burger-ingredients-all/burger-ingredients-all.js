import PropTypes from 'prop-types';
import BurgerIngridientItem from "../burger-ingredients-item/burger-ingredients-item"

import style from './burger-ingredients-all.module.css';

const BurgerIngredientsAll = ({ type, ingredients }) => {

  const category = ingredients.filter((elem) => elem.type === type);
  const categories = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки'
  };

  return (
    <div className={`${style['group-ingredients']}`} id={type}>
      <h2 className="text text_type_main-medium">{categories[type]}</h2>
      <ul className={`${style['list']}`}>
        {category?.map((elem) => (
          <BurgerIngridientItem key={elem._id} ingredient={elem} />
        ))}
      </ul>
    </div>
  )
}

BurgerIngredientsAll.propTypes = {
  type: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
};

export default BurgerIngredientsAll;
