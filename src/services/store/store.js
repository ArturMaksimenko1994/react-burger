import {combineReducers} from "redux";
import {thunk} from 'redux-thunk';
import {compose, legacy_createStore as createStore, applyMiddleware} from 'redux';
import {burgerIngredientsReducer} from "./reducers/burger-ingredients";
import {ingredientReducer} from "./reducers/ingredient-details";
import {constructorReducer} from "./reducers/burger-constructor";
import {orderReducer} from "./reducers/order-details";

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const enhancer = composeEnhancers(applyMiddleware(thunk));
// const enhancer = applyMiddleware(thunk);

const rootReducer = combineReducers({
  burgerIngredientsReducer,
  ingredientReducer,
  constructorReducer,
  orderReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store