import img from '../../images/done.png';
import style from './order-details.module.css';

const OrderDetails = () => {
  return (
    <>
      <div className={style.row}>
        <p className="text text_type_digits-large mb-8">034536</p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <img src={img} className={`${style.image} mb-15 mt-15`} alt="Заказ принят" />
        <p className="text text_type_main-default mb-2 ">Ваш заказ начали готовить</p>
        <p className={`${style["last-p"]} text text_type_main-default text_color_inactive mb-20`}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </>
  )
}

export default OrderDetails;