import { constructorReducer } from './burger-constructor';
import {
  ADD_BUN,
  ADD_ITEM_CONSTRUCTOR,
  MOVE_ITEM,
  RESET_ITEM,
} from '../action-types';

const initialState = {
  items: [],
  bun: {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    name: '',
    price: 0,
    proteins: 0,
    type: 'bun',
    __v: 0,
    _id: '',
    id: '',
    count: 0,
  },
  bunRequestSuccess: false,
  itemsId: [],
};

const mockIngredient = {
  _id: 'ingredient_id',
  name: 'Cheese',
  type: 'main',
  calories: 100,
  carbohydrates: 5,
  fat: 7,
  image: '',
  image_large: '',
  image_mobile: '',
  price: 1.5,
  proteins: 5,
  count: 0,
};

describe('constructorReducer', () => {
  it('should handle RESET_ITEM', () => {
    const stateWithItems = {
      ...initialState,
      items: [mockIngredient],
      itemsId: ['ingredient_id'],
    };
    const action = {
      type: RESET_ITEM,
    };
    const newState = constructorReducer(stateWithItems, action);
    expect(newState.items.length).toBe(0);
    expect(newState.itemsId.length).toBe(0); // Ensure itemsId is also emptied
    expect(newState.bun).toEqual(initialState.bun);
    expect(newState.bunRequestSuccess).toBe(false);
  });

  it('should handle ADD_BUN', () => {
    const action = {
      type: ADD_BUN,
      data: mockIngredient,
    };
    const newState = constructorReducer(initialState, action);
    expect(newState.bun).toEqual(mockIngredient);
    expect(newState.itemsId.includes(mockIngredient._id)).toBe(true);
    expect(newState.bunRequestSuccess).toBe(true);
  });

  it('should handle ADD_ITEM_CONSTRUCTOR', () => {
    const action = {
      type: ADD_ITEM_CONSTRUCTOR,
      data: mockIngredient,
    };
    const newState = constructorReducer(initialState, action);
    expect(newState.items.length).toBe(1);
    expect(newState.itemsId.includes(mockIngredient._id)).toBe(true);
  });

  it('should handle MOVE_ITEM', () => {
    const stateWithItems = {
      ...initialState,
      items: [
        { ...mockIngredient, _id: 'ingredient_id_1', name: 'Cheese' },
        { ...mockIngredient, _id: 'ingredient_id_2', name: 'Tomato' },
      ],
      itemsId: ['ingredient_id_1', 'ingredient_id_2'],
    };
    const action = {
      type: MOVE_ITEM,
      data: {
        dragIndex: 0,
        hoverIndex: 1,
      },
    };
    const newState = constructorReducer(stateWithItems, action);
    expect(newState.items[0].name).toBe('Tomato');
    expect(newState.items[1].name).toBe('Cheese');
    expect(newState.itemsId).toEqual(['ingredient_id_1', 'ingredient_id_2']);
  });

  it('should return default state for unknown action', () => {
    const action = {
      type: 'UNKNOWN_ACTION',
    };
    const newState = constructorReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
