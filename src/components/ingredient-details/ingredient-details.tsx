import style from './ingredient-details.module.css';

import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {FC} from "react";
import {TIngredient} from '../../services/types/data';

const IngredientDetails: FC = () => {

  const {id} = useParams();
  const ingredients = useSelector((store: any) => store.burgerIngredientsReducer.ingredients);
  const ingredient = ingredients.find((ingredient: TIngredient) => ingredient._id === id);

  return (
    <>
      {
        ingredient && (
          <div className={style.row}>
            <img src={ingredient.image_large} className={`${style.image}`} alt="Заказ принят"/>
            <p className="text text_type_main-medium">{ingredient.name}</p>
            <ul className={`${style.list}`}>
              <li className={style.item}>
                <div className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</div>
                <div className="text-center text text_type_digits-default text_color_inactive">{ingredient.calories}</div>
              </li>
              <li className={style.item}>
                <div className="text text_type_main-default text_color_inactive mb-2">Белки, г</div>
                <div className="text-center text text_type_digits-default text_color_inactive">{ingredient.proteins}</div>
              </li>
              <li className={style.item}>
                <div className="text text_type_main-default text_color_inactive mb-2">Жиры, г</div>
                <div className="text-center text text_type_digits-default text_color_inactive">{ingredient.fat}</div>
              </li>
              <li className={style.item}>
                <div className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</div>
                <div
                  className="text-center text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</div>
              </li>
            </ul>
          </div>
        )
      }
    </>
  )
}

export default IngredientDetails;