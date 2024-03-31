import PropTypes from 'prop-types';

import style from "./burger-constructor-item.module.css"
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {DELETE_ITEM, MOVE_ITEM} from "../../services/store/actions/burger-constructor";
import {useDispatch} from "react-redux";
import {useRef} from "react";
import {useDrag, useDrop} from "react-dnd";

const BurgerConstructorItem = ({index, items}) => {
  const dispatch = useDispatch();
  const {image, id, price, name} = items;
  const ref = useRef(null);

  const onDelete = (id) => {
    dispatch({
      type: DELETE_ITEM,
      id: id,
    });
  };

  const [, drop] = useDrop({
    accept: "item",
    hover(items) {
      if (!ref.current) {
        return;
      }
      const dragIndex = items.index;
      const hoverIndex = index;
      dispatch({
        type: MOVE_ITEM,
        data: {dragIndex, hoverIndex},
      });
      items.index = hoverIndex;
    },
  });

  const [{opacity}, drag] = useDrag({
    type: "item",
    item: {id, index},
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
  });

  drag(drop(ref));
  return (
    <li className={`${style['list-item']}`}
        style={{ opacity }} ref={ref}
    >
      <DragIcon type="primary"/>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={(() => onDelete(id))}
      />
    </li>
  )
}

BurgerConstructorItem.propTypes = {
  items: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
};
export default BurgerConstructorItem;