import {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import BurgerIngredientsTabs from '../burger-ingredients-tabs/burger-ingredients-tabs';
import BurgerIngredientsAll from "./../burger-ingredients-all/burger-ingredients-all"
import style from './burger-ingredients.module.css';
import {getIngredients} from "../../services/api";
import {DataIngredientsContext} from "../../services/appContext";

const BurgerIngredients = () => {

  const {products} = useContext(DataIngredientsContext);

  const [current, setCurrent] = useState('one');

  const filteredBuns = products?.items.filter(item => item.type === "bun");
  const filteredSauces = products?.items.filter(item => item.type === "sauce");
  const filteredFillings = products?.items.filter(item => item.type === "main");

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [modalIngredientDetails, setModalIngredientDetails] = useState(false);

  const openModal = (data) => {
    setSelectedIngredient(data);
    setModalIngredientDetails(true);
  };

  return (
    <div className="mt-5">
      <BurgerIngredientsTabs current={current} setCurrent={setCurrent} />
      <div className="mt-5">
        <div className={`${style['all-ingredients']} mt-10`}>
          <BurgerIngredientsAll type="Булки" items={filteredBuns} openModal={openModal} />
          <BurgerIngredientsAll type="Соусы" items={filteredSauces} openModal={openModal} />
          <BurgerIngredientsAll type="Начинки" items={filteredFillings} openModal={openModal} />
        </div>
      </div>

      <Modal active={modalIngredientDetails} setActive={setModalIngredientDetails} title="Детали ингредиента">
        {selectedIngredient && (
          <IngredientDetails data={selectedIngredient} />
        )}
      </Modal>
    </div>
  )
}

export default BurgerIngredients;