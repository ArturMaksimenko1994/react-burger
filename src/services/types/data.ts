import { ReactNode } from "react";

//Описывает структуру данных для ингредиентов бургера TIngredient
export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: "bun" | "main" | "sauce";
  __v: number;
  _id: string;
  id?: string;
  count?: number;
}

//Описывает структуру данных для местоположения TLocation
export type TLocation = {
  background: {
    pathname: string;
    search: string;
    hash: string;
    state: null;
    key: string;
  }
  from: string;
  state?: object;
};

//Описывает структуру POPUP
export type TModal = {
  title: string;
  children: ReactNode;
  onClickClose: () => void;
}

//Описывает структуру OVERLAY POPUP
export type TModalOverlay = {
  onClickClose: () => void;
}

export type TIngredientResponse = {
  data: Array<TIngredient>;
  success: boolean;
}

export type TUser = {
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export type TOrder = {
  createdAt: string;
  ingredients: TIngredient[];
  name: string;
  number: number;
  owner: TUser;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export type TOrderDetailsResponse = {
  name: string
  order: TOrder;
  success: boolean;
}

export type TUserLogoutResponse = {
  message: string;
  success: boolean;
  refreshToken: string;
}

export type TUserResponce = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
  message: string;
}