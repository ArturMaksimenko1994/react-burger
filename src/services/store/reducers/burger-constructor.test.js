import {
  ADD_BUN,
  ADD_ITEM_CONSTRUCTOR,
  DELETE_ITEM,
  MOVE_ITEM,
  RESET_ITEM
} from "../action-types";
import { constructorReducer, TInitialState, TBurgerConstructorActions } from "./burger-constructor";
import { TIngredient } from "../../types/data";

// Mock initial state
const initialState: TInitialState = {
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
    type: "bun",
    __v: 0,
    _id: '',
    id: '',
    count: 0,
  },
  bunRequestSuccess: false,
  itemsId: [],
};

// Mock ingredients
const mockIngredient: TIngredient = {
  _id: "ingredient_id",
  name: "Cheese",
  type: "main",
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
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, {} as TBurgerConstructorActions))
      .toEqual(initialState);
  });

  it('should handle DELETE_ITEM', () => {
    const stateWithItem: TInitialState = {
      ...initialState,
      items: [mockIngredient],
      itemsId: [mockIngredient._id],
    };
    const action: TBurgerConstructorActions = {
      type: DELETE_ITEM,
      id: mockIngredient._id,
    };
    const newState = constructorReducer(stateWithItem, action);
    expect(newState.items).toHaveLength(0);
    expect(newState.itemsId).not.toContain(mockIngredient._id);
    expect(newState.bun).toEqual(initialState.bun);
    expect(newState.bunRequestSuccess).toBe(initialState.bunRequestSuccess);
  });

  it('should handle ADD_BUN', () => {
    const action: TBurgerConstructorActions = {
      type: ADD_BUN,
      data: mockIngredient,
      itemsId: [mockIngredient._id],
      bun: mockIngredient,
    };
    const newState = constructorReducer(initialState, action);
    expect(newState.bun).toEqual(mockIngredient);
    expect(newState.itemsId).toContain(mockIngredient._id);
    expect(newState.bunRequestSuccess).toBe(true);
  });

  it('should handle ADD_ITEM_CONSTRUCTOR', () => {
    const action: TBurgerConstructorActions = {
      type: ADD_ITEM_CONSTRUCTOR,
      data: mockIngredient,
    };
    const newState = constructorReducer(initialState, action);
    expect(newState.items).toContain(mockIngredient);
    expect(newState.itemsId).toContain(mockIngredient._id);
  });

  it('should handle RESET_ITEM', () => {
    const stateWithItems: TInitialState = {
      ...initialState,
      items: [mockIngredient],
      itemsId: [mockIngredient._id],
    };
    const action: TBurgerConstructorActions = {
      type: RESET_ITEM,
      data: [],
    };
    const newState = constructorReducer(stateWithItems, action);
    expect(newState.items).toHaveLength(0);
    expect(newState.itemsId).toHaveLength(0);
    expect(newState.bun).toEqual(initialState.bun);
    expect(newState.bunRequestSuccess).toBe(false);
  });

  it('should handle MOVE_ITEM', () => {
    const initialStateWithItems: TInitialState = {
      ...initialState,
      items: [mockIngredient, { ...mockIngredient, _id: "ingredient_id_2", name: "Tomato" }],
      itemsId: [mockIngredient._id, "ingredient_id_2"],
    };
    const action: TBurgerConstructorActions = {
      type: MOVE_ITEM,
      data: {
        dragIndex: 0,
        hoverIndex: 1,
      },
    };
    const newState = constructorReducer(initialStateWithItems, action);
    expect(newState.items[0].name).toBe("Tomato");
    expect(newState.items[1].name).toBe("Cheese");
    expect(newState.itemsId).toEqual([initialStateWithItems.items[1]._id, initialStateWithItems.items[0]._id]);
  });
});
