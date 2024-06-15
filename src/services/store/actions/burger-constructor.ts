import { ADD_BUN, ADD_ITEM_CONSTRUCTOR, DELETE_ITEM, MOVE_ITEM, RESET_ITEM } from "../action-types";
import { TIngredient } from "../../types/data";



export interface IAddBun {
  readonly type: typeof ADD_BUN;
  data: TIngredient;
  itemsId: string[];
  bun: TIngredient;
}

export interface IAddItems {
  readonly type: typeof ADD_ITEM_CONSTRUCTOR;
  data: TIngredient;
}

export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM;
  data: TIngredient;
  id: string;
}

export interface IMoveItem {
  data: {
    dragIndex: number;
    hoverIndex: number;
  };
  readonly type: typeof MOVE_ITEM;
}

export interface IResetItem {
  readonly type: typeof RESET_ITEM;
  data: TIngredient[];
}

export type TBurgerConstructorActions =
  | IAddBun
  | IAddItems
  | IDeleteItem
  | IMoveItem
  | IResetItem;