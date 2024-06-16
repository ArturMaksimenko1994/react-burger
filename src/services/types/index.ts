import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import  store  from '../store/store';
import { TBurgerIngredientsActions } from '../store/actions/burger-ingredients';
import { TOrderDetailsActions } from '../store/actions/order-details';
import { TIngredientModalActions } from '../store/actions/ingredient-details';
import { TOrderInfoDetailsModalActions } from '../store/actions/order-info-details';
import { TAuthActions } from '../store/actions/auth';
import { TBurgerConstructorActions } from '../store/actions/burger-constructor';
import { TWsActions } from '../store/actions/wsActions';
import { TWsAuthActions } from '../store/actions/wsAuthActions';
import { rootReducer } from '../store/reducers';


type TApplicationActions =
  | TBurgerIngredientsActions
  | TBurgerConstructorActions
  | TOrderDetailsActions
  | TIngredientModalActions
  | TOrderInfoDetailsModalActions
  | TAuthActions
  | TWsActions
  | TWsAuthActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
