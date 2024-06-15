import { getIngredientData } from "../../../api/api";
import { TIngredient } from "../../types/data";

import {
  BURGER_INGREDIENTS_FAILED,
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_SUCCESS
} from "../action-types";
import { AppDispatch, AppThunk } from "../../types";

export interface IBurgerIngredientsFailed {
  readonly type: typeof BURGER_INGREDIENTS_FAILED;
}

export interface IBurgerIngredientsRequest {
  readonly type: typeof BURGER_INGREDIENTS_REQUEST;
}

export interface IBurgerIngredientsSuccess {
  readonly type: typeof BURGER_INGREDIENTS_SUCCESS;
  ingredients: Array<TIngredient>;
}

export type TBurgerIngredientsActions =
| IBurgerIngredientsFailed
| IBurgerIngredientsRequest
| IBurgerIngredientsSuccess;


export const getBurgerIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: BURGER_INGREDIENTS_REQUEST
    });
    getIngredientData()
      .then((res) => {
        dispatch({
          type: BURGER_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch(() => {
        dispatch({
          type: BURGER_INGREDIENTS_FAILED,
        });
      })
  };
}