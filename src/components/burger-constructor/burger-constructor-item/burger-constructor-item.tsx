import style from "./burger-constructor-item.module.css"
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import {DELETE_ITEM, MOVE_ITEM} from "../../../services/store/action-types";
import { useDispatch } from '../../../services/hooks';
import {FC, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import { TIngredient } from '../../../services/types/data'

type TConstructorItems = {
  index: number;
  items: TIngredient;
}

type TDragItem = {
  index: number;
  type: string;
  id?: string;
};

const BurgerConstructorItem: FC<TConstructorItems> = ({index, items}) => {
  const dispatch = useDispatch();
  const {image, id, price, name} = items;
  const ref = useRef(null);

  const onDelete = (id: string | undefined) => {
    dispatch({
      type: DELETE_ITEM,
      id: id,
    });
  };

  const [, drop] = useDrop<TDragItem>({
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

export default BurgerConstructorItem;