import PropTypes from 'prop-types';
import style from './burger-ingredients-item.module.css';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerIngridientItem = ({ data, openModal }) => {

  return (
    <>
      <li className={`${style['list-item']}`} onClick={() => openModal(data)} >
        <Counter count={1} size="default" extraClass="m-1" />
        <img className={style.img} src={data.image} alt={data.name} />
        <span className={style.price}>
          <span className="text text_type_digits-default">{data.price}</span>
          <CurrencyIcon type="primary" />
        </span>
        <p className="text text_type_main-default">{data.name}</p>
      </li>
    </>
  )
}

BurgerIngridientItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number
  }).isRequired
};

export default BurgerIngridientItem;