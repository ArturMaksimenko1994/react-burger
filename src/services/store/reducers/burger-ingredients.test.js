import { ingredientsReducer } from './burger-ingredients';
import {
  BURGER_INGREDIENTS_REQUEST,
  BURGER_INGREDIENTS_FAILED,
  BURGER_INGREDIENTS_SUCCESS
} from '../action-types';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

const errorMessage = 'fail message';

const data = [
  {
    "_id": "60666c42cc7b410027a1a9b6",
    "name": "Биокотлета из марсианской Магнолии",
    "type": "main",
    "proteins": 420,
    "fat": 142,
    "carbohydrates": 242,
    "calories": 4242,
    "price": 424,
    "image": "https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v": 0
  },
  {
    "_id": "60666c42cc7b410027a1a9b7",
    "name": "Соус Spicy-X",
    "type": "sauce",
    "proteins": 30,
    "fat": 20,
    "carbohydrates": 40,
    "calories": 30,
    "price": 90,
    "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
    "__v": 0
  }
];

describe('ingredientsReducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle BURGER_INGREDIENTS_REQUEST', () => {
    expect(ingredientsReducer(initialState, { type: BURGER_INGREDIENTS_REQUEST })).toEqual({
      ...initialState,
      ingredientsRequest: true,
      ingredientsFailed: false
    });
  });

  it('should handle BURGER_INGREDIENTS_SUCCESS', () => {
    expect(ingredientsReducer(initialState, { type: BURGER_INGREDIENTS_SUCCESS, ingredients: data })).toEqual({
      ...initialState,
      ingredients: data,
      ingredientsRequest: false,
      ingredientsFailed: false
    });
  });

  it('should handle BURGER_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer(initialState, { type: BURGER_INGREDIENTS_FAILED, message: errorMessage })).toEqual({
      ...initialState,
      ingredients: [],
      ingredientsRequest: false,
      ingredientsFailed: true
    });
  });

  it('should return the initial state for unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    expect(ingredientsReducer(initialState, unknownAction)).toEqual(initialState);
  });
});