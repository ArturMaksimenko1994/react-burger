import PropTypes from 'prop-types';
import BurgerIngridientItem from "./../burger-ingredients-item/burger-ingredients-item"

import style from './burger-ingredients-all.module.css';

const BurgerIngredientsAll = ({ type, items, openModal }) => {

  return (
    <div className={`${style['group-ingredients']}`}>
      <h2 className="text text_type_main-medium">{type}</h2>
      <ul className={`${style['list']}`}>
        {items.map((item) => (
          <BurgerIngridientItem key={item._id} data={item} openModal={openModal} />
        ))}
      </ul>
    </div>
  )
}

BurgerIngredientsAll.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default BurgerIngredientsAll;
