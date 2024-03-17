
import PropTypes from 'prop-types';

import style from './burger-constructor.module.css';

import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item"

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerConatructorCounting from '../burger-conatructor-counting/burger-conatructor-counting'

const BurgerConstructor = ({ data }) => {

  return (
    <div className='mt-5'>
      <div className={style.group}>
        <div className='ml-7'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </div>

        <ul className={style.list}>
          {data.map((item, index) => <BurgerConstructorItem key={index} data={item} />)}
        </ul>

        <div className='ml-7'>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
        </div>
      </div>
      <BurgerConatructorCounting />
    </div>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerConstructor;