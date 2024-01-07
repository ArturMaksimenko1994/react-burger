import style from './ingredient-details.module.css';
import PropTypes from 'prop-types';

const IngredientDetails = ({ data }) => {

  return (
    <div className={style.row}>
      <img src={data.image_large} className={`${style.image}`} alt="Заказ принят" />
      <p className="text text_type_main-medium">{data.name}</p>
      <ul className={`${style.list}`}>
        <li className={style.item}>
          <div className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</div>
          <div className="text-center text text_type_digits-default text_color_inactive">{data.calories}</div>
        </li>
        <li className={style.item}>
          <div className="text text_type_main-default text_color_inactive mb-2">Белки, г</div>
          <div className="text-center text text_type_digits-default text_color_inactive">{data.proteins}</div>
        </li>
        <li className={style.item}>
          <div className="text text_type_main-default text_color_inactive mb-2">Жиры, г</div>
          <div className="text-center text text_type_digits-default text_color_inactive">{data.fat}</div>
        </li>
        <li className={style.item}>
          <div className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</div>
          <div className="text-center text text_type_digits-default text_color_inactive">{data.carbohydrates}</div>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    image_large: PropTypes.string
  }).isRequired
};

export default IngredientDetails;