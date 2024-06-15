import {
  CLOSE_INGREDIENT_MODAL,
  OPEN_INGREDIENT_MODAL
} from "../action-types";
import {TIngredient} from "../../types/data";

export interface IIngredientCloseModal {
  readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

export interface IIngredientOpenModal {
  readonly type: typeof OPEN_INGREDIENT_MODAL;
  readonly ingredient: TIngredient;
}

export type TIngredientModalActions =
  | IIngredientCloseModal
  | IIngredientOpenModal;

export const closeIngredientModal = (): IIngredientCloseModal => {
  return {
    type: CLOSE_INGREDIENT_MODAL,
  };
}

export const openIngredientModal = (ingredient: TIngredient): IIngredientOpenModal => {
  return {
    type: OPEN_INGREDIENT_MODAL,
    ingredient: ingredient
  };
};