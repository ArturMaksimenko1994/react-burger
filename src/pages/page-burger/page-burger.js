import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import style from './page-burger.module.css';

const PageBurger = () => {
  return (
    <section className={style.burger}>
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <div className={style.row}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor/>
        </DndProvider>
      </div>
    </section>
  )
}

export default PageBurger;