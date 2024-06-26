import { ingredientReducer } from './ingredient-details';
import {
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL
} from '../action-types';

const initialState = {
  openModal: null
};

const ingredient = {
  _id: '12345',
  name: 'Test Ingredient',
  type: 'main',
  calories: 100,
  fat: 5,
  carbohydrates: 10,
  proteins: 15,
  price: 50,
  image: 'https://example.com/ingredient.png'
};

describe('ingredientReducer', () => {
  it('should return the initial state', () => {
    expect(ingredientReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle OPEN_INGREDIENT_MODAL', () => {
    const action = {
      type: OPEN_INGREDIENT_MODAL,
      ingredient: ingredient
    };
    expect(ingredientReducer(initialState, action)).toEqual({
      ...initialState,
      openModal: ingredient
    });
  });

  it('should handle CLOSE_INGREDIENT_MODAL', () => {
    const action = {
      type: CLOSE_INGREDIENT_MODAL
    };
    expect(ingredientReducer(initialState, action)).toEqual({
      ...initialState,
      openModal: null
    });
  });

  it('should return the current state for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    expect(ingredientReducer(initialState, unknownAction)).toEqual(initialState);
  });
});
