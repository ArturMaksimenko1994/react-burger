import PropTypes from 'prop-types';

import style from "./burger-constructor-item.module.css"
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const BurgerConstructorItem = ({data}) => {
  return (
    <li className={`${style['list-item']}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
      />
    </li>
  )
}

BurgerConstructorItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
};
export default BurgerConstructorItem;